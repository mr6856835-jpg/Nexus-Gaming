import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <p className="font-display text-7xl font-bold text-gradient">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold sm:text-3xl">This lobby is empty</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        The page you were looking for has been moved, renamed, or never existed. Let&apos;s get you
        back to the games.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          <Home className="h-4 w-4" />
          Back home
        </Link>
        <Link to="/games" className="btn-ghost">
          <Search className="h-4 w-4" />
          Browse catalog
        </Link>
      </div>
    </div>
  )
}
