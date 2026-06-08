import type { LedState } from '../store/ledStore'

interface LEDProps {
  state: LedState
}

const LED_CONFIG: Record<LedState, { color: string; glow: string; highlight: string }> = {
  OFF: {
    color: '#3a3a3a',
    glow: 'none',
    highlight: '#555',
  },
  RED: {
    color: '#ff2020',
    glow: '0 0 20px 8px rgba(255,32,32,0.8), 0 0 60px 20px rgba(255,32,32,0.4)',
    highlight: '#ff6060',
  },
  GREEN: {
    color: '#00ee44',
    glow: '0 0 20px 8px rgba(0,238,68,0.8), 0 0 60px 20px rgba(0,238,68,0.4)',
    highlight: '#44ff88',
  },
  BLUE: {
    color: '#1060ff',
    glow: '0 0 20px 8px rgba(16,96,255,0.8), 0 0 60px 20px rgba(16,96,255,0.4)',
    highlight: '#4488ff',
  },
}

export function LED({ state }: LEDProps) {
  const { color, glow, highlight } = LED_CONFIG[state]
  return (
    <div className="led-wrapper">
      <div
        className="led-bulb"
        style={{
          background: `radial-gradient(circle at 35% 30%, ${highlight}, ${color})`,
          boxShadow: glow,
        }}
      >
        <div className="led-shine" />
      </div>
      <div className="led-base" />
      <div className="led-legs">
        <div className="led-leg" />
        <div className="led-leg" />
      </div>
    </div>
  )
}
