import { useEffect } from 'react'
import { useLedStore } from '../store/ledStore'
import type { LedState } from '../store/ledStore'

export function useApiSync(intervalMs = 1000) {
  const syncState = useLedStore((s) => s.syncState)

  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch('/api/state')
        if (res.ok) {
          const data = (await res.json()) as { state: LedState; lastUpdated: string }
          syncState(data.state, data.lastUpdated)
        }
      } catch {
        // silently ignore fetch errors during dev reload
      }
    }

    void poll()
    const id = setInterval(() => void poll(), intervalMs)
    return () => clearInterval(id)
  }, [syncState, intervalMs])
}
