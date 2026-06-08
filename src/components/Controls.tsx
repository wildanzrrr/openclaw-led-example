import type { LedState } from '../store/ledStore'

interface ControlsProps {
  onSet: (state: LedState) => void
  current: LedState
}

const BUTTONS: { state: LedState; label: string; cls: string }[] = [
  { state: 'OFF', label: 'Turn OFF', cls: 'btn btn-off' },
  { state: 'RED', label: 'Turn RED', cls: 'btn btn-red' },
  { state: 'GREEN', label: 'Turn GREEN', cls: 'btn btn-green' },
  { state: 'BLUE', label: 'Turn BLUE', cls: 'btn btn-blue' },
]

export function Controls({ onSet, current }: ControlsProps) {
  return (
    <div className="controls">
      {BUTTONS.map(({ state, label, cls }) => (
        <button
          key={state}
          className={`${cls}${current === state ? ' active' : ''}`}
          onClick={() => onSet(state)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
