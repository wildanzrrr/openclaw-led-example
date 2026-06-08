import type { LedState } from '../store/ledStore'

interface StatusPanelProps {
  state: LedState
  lastUpdated: string
}

const STATE_COLORS: Record<LedState, string> = {
  OFF: '#888',
  RED: '#ff4444',
  GREEN: '#44ff88',
  BLUE: '#4488ff',
}

export function StatusPanel({ state, lastUpdated }: StatusPanelProps) {
  return (
    <div className="status-panel">
      <div className="status-row">
        <span className="status-label">Current State:</span>
        <span className="status-value" style={{ color: STATE_COLORS[state] }}>
          {state}
        </span>
      </div>
      <div className="status-row">
        <span className="status-label">Last Updated:</span>
        <span className="status-time">{new Date(lastUpdated).toLocaleTimeString()}</span>
      </div>
    </div>
  )
}
