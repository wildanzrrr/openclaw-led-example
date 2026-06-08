import { useLedStore } from './store/ledStore'
import { useApiSync } from './hooks/useApiSync'
import { LED } from './components/LED'
import { StatusPanel } from './components/StatusPanel'
import { Controls } from './components/Controls'

function App() {
  const state = useLedStore((s) => s.state)
  const lastUpdated = useLedStore((s) => s.lastUpdated)
  const setState = useLedStore((s) => s.setState)

  useApiSync()

  return (
    <div className="app">
      <header className="header">
        <h1>Virtual RGB LED</h1>
        <p>Controlled via HTTP API</p>
      </header>

      <main className="main">
        <LED state={state} />
        <StatusPanel state={state} lastUpdated={lastUpdated} />
        <Controls current={state} onSet={setState} />
      </main>

      <footer className="footer">
        <code>GET /api/state &nbsp;·&nbsp; POST /api/state</code>
      </footer>
    </div>
  )
}

export default App
