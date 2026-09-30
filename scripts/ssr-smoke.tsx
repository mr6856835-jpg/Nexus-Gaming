import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from '../src/App'

const routes = ['/', '/games', '/games/neon-drift', '/tournaments', '/leaderboard', '/community', '/nope']

let failed = 0
for (const route of routes) {
  try {
    const html = renderToString(
      <StaticRouter location={route}>
        <App />
      </StaticRouter>,
    )
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    console.log(`${route.padEnd(22)} OK  ${String(html.length).padStart(6)} bytes  "${text.slice(0, 72)}"`)
  } catch (error) {
    failed++
    console.log(`${route.padEnd(22)} FAIL ${(error as Error).message}`)
  }
}

console.log(failed === 0 ? '\nALL ROUTES RENDERED' : `\n${failed} ROUTE(S) FAILED`)
if (failed > 0) throw new Error(`${failed} route(s) failed to render`)
