import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { IncomingMessage, ServerResponse } from "node:http";

type LedState = "OFF" | "RED" | "GREEN" | "BLUE";
const VALID_STATES = new Set<string>(["OFF", "RED", "GREEN", "BLUE"]);

let currentState: LedState = "OFF";
let lastUpdated = new Date().toISOString();

export default defineConfig({
  plugins: [
    react(),
    {
      name: "led-api",
      configureServer(server) {
        server.middlewares.use(
          "/api/state",
          (req: IncomingMessage, res: ServerResponse) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.setHeader("Content-Type", "application/json");

            if (req.method === "OPTIONS") {
              res.writeHead(204);
              res.end();
              return;
            }

            if (req.method === "GET") {
              res.writeHead(200);
              res.end(JSON.stringify({ state: currentState, lastUpdated }));
              return;
            }

            if (req.method === "POST") {
              let body = "";
              req.on("data", (chunk: Buffer) => {
                body += chunk.toString();
              });
              req.on("end", () => {
                try {
                  const parsed = JSON.parse(body) as Record<string, unknown>;
                  const { state } = parsed;
                  if (typeof state === "string" && VALID_STATES.has(state)) {
                    currentState = state as LedState;
                    lastUpdated = new Date().toISOString();
                    res.writeHead(200);
                    res.end(
                      JSON.stringify({ success: true, state: currentState }),
                    );
                  } else {
                    res.writeHead(400);
                    res.end(
                      JSON.stringify({
                        error:
                          "Invalid state. Must be one of: OFF, RED, GREEN, BLUE",
                      }),
                    );
                  }
                } catch {
                  res.writeHead(400);
                  res.end(JSON.stringify({ error: "Invalid JSON" }));
                }
              });
              return;
            }

            res.writeHead(405);
            res.end(JSON.stringify({ error: "Method not allowed" }));
          },
        );
      },
    },
  ],
});
