import { create } from 'zustand'

export type LedState = 'OFF' | 'RED' | 'GREEN' | 'BLUE'

interface LedStore {
  state: LedState
  lastUpdated: string
  setState: (state: LedState) => Promise<void>
  syncState: (state: LedState, lastUpdated: string) => void
}

export const useLedStore = create<LedStore>((set) => ({
  state: 'OFF',
  lastUpdated: new Date().toISOString(),

  setState: async (state: LedState) => {
    const res = await fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state }),
    })
    if (res.ok) {
      const data = (await res.json()) as { state: LedState }
      set({ state: data.state, lastUpdated: new Date().toISOString() })
    }
  },

  syncState: (state: LedState, lastUpdated: string) => set({ state, lastUpdated }),
}))
