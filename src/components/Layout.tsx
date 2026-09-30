import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Gamepad2, Menu, Search, X } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/games', label: 'Games' },
  { to: '/tournaments', label: 'Tournaments' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/community', label: 'Community' },
]

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Nexus Gaming home">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-neon-600 to-aqua-500 shadow-[0_8px_24px_-8px_rgba(139,92,246,0.9)] transition group-hover:brightness-110">
        <Gamepad2 className="h-5 w-5 text-white" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-white">
        Nexus<span className="text-aqua-400">Gaming</span>
      </span>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-void-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                [
                  'rounded-lg px-3.5 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-100',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/games"
            className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-slate-400 transition hover:border-white/20 hover:text-slate-100 sm:flex"
          >
            <Search className="h-4 w-4" />
            <span>Search 6,800 games</span>
          </Link>
          <Link
            to="/tournaments"
            className="hidden rounded-xl bg-gradient-to-r from-neon-600 to-aqua-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(139,92,246,0.9)] transition hover:brightness-110 sm:inline-flex"
          >
            Compete now
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-void-900/95 px-4 pb-4 pt-2 lg:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                [
                  'block rounded-lg px-3 py-2.5 text-sm font-medium',
                  isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-void-900/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Nexus Gaming is a community hub where players discover new worlds, compete in
            tournaments, and climb the global leaderboards together.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Demo project — all games, players, and tournaments shown are fictional.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition hover:text-aqua-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Platform</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            <li>Ranked matchmaking</li>
            <li>Tournament hosting</li>
            <li>Creator program</li>
            <li>Developer API</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Nexus Gaming. Play. Compete. Connect.
      </div>
    </footer>
  )
}

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-void-800 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
