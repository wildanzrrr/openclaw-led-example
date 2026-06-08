import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

type LedState = 'OFF' | 'RED' | 'GREEN' | 'BLUE'
const VALID_STATES = new Set<string>(['OFF', 'RED', 'GREEN', 'BLUE'])

let currentState: LedState = 'OFF'
let lastUpdated = new Date().toISOString()

const app = express()
const port = Number(process.env.PORT ?? 3000)

app.use(cors())
app.use(express.json())

const distPath = path.join(__dirname, '..', 'dist')
app.use(express.static(distPath))

app.get('/api/state', (_req, res) => {
  res.json({ state: currentState, lastUpdated })
})

app.post('/api/state', (req, res) => {
  const { state } = req.body as { state?: unknown }
  if (typeof state === 'string' && VALID_STATES.has(state)) {
    currentState = state as LedState
    lastUpdated = new Date().toISOString()
    res.json({ success: true, state: currentState })
  } else {
    res.status(400).json({ error: 'Invalid state. Must be one of: OFF, RED, GREEN, BLUE' })
  }
})

// SPA fallback
app.use((_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(port, () => {
  console.log(`LED Control server running on http://localhost:${port}`)
})
