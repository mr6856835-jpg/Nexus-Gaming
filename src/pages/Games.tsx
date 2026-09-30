import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter, Search, SlidersHorizontal, Star, X } from 'lucide-react'
import { formatPlayers, games, genres, platforms, type Game } from '../data/games'

type SortKey = 'popular' | 'rating' | 'newest' | 'price'

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'popular', label: 'Most played' },
  { key: 'rating', label: 'Top rated' },
  { key: 'newest', label: 'Newest' },
  { key: 'price', label: 'Price: low to high' },
]

function GridCard({ game }: { game: Game }) {
  return (
    <Link to={`/games/${game.slug}`} className="glass card-hover group overflow-hidden !p-0">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={game.cover}
          alt={game.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${game.accent} opacity-0 transition group-hover:opacity-20`} />
        <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/25 to-transparent" />

        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-void-950/75 px-2.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur">
          <Star className="h-3 w-3 fill-amber-300" />
          {game.rating.toFixed(1)}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-display text-lg font-bold text-white">{game.title}</h3>
          <p className="mt-1 line-clamp-2 text-xs text-slate-300">{game.tagline}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 p-4 text-xs text-slate-400">
        <span className="flex flex-wrap gap-1.5">
          {game.genres.slice(0, 2).map((genre) => (
            <span key={genre} className="chip !px-2 !py-0.5 !text-[11px]">
              {genre}
            </span>
          ))}
        </span>
        <span className="shrink-0 font-semibold text-aqua-400">
          {game.price === 0 ? 'Free' : `$${game.price.toFixed(2)}`}
        </span>
      </div>
    </Link>
  )
}

export default function Games() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState<string | null>(null)
  const [platform, setPlatform] = useState<string | null>(null)
  const [sort, setSort] = useState<SortKey>('popular')
  const [showFilters, setShowFilters] = useState(false)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = games.filter((game) => {
      const matchesQuery =
        q.length === 0 ||
        game.title.toLowerCase().includes(q) ||
        game.tagline.toLowerCase().includes(q) ||
        game.developer.toLowerCase().includes(q) ||
        game.genres.some((g) => g.toLowerCase().includes(q))
      const matchesGenre = !genre || game.genres.includes(genre)
      const matchesPlatform = !platform || game.platforms.includes(platform as Game['platforms'][number])
      return matchesQuery && matchesGenre && matchesPlatform
    })

    return filtered.sort((a, b) => {
      switch (sort) {
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        case 'price':
          return a.price - b.price
        default:
          return b.activePlayers - a.activePlayers
      }
    })
  }, [query, genre, platform, sort])

  const activeFilters = [genre, platform].filter(Boolean) as string[]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aqua-400">Catalog</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Discover your next world</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
          Search the Nexus catalog across PC, console, cloud, and mobile. Filter by genre and
          platform, then jump straight into a ranked queue or an open tournament.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games, studios, or genres…"
            aria-label="Search games"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-aqua-400/60 focus:outline-none focus:ring-2 focus:ring-aqua-400/25"
          />
        </div>

        <div className="flex gap-3">
          <label className="relative flex-1 lg:flex-none">
            <span className="sr-only">Sort games</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-8 text-sm text-white focus:border-aqua-400/60 focus:outline-none lg:w-56"
            >
              {sortOptions.map((option) => (
                <option key={option.key} value={option.key} className="bg-void-800">
                  {option.label}
                </option>
              ))}
            </select>
            <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </label>

          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className="btn-ghost !px-4 lg:hidden"
            aria-expanded={showFilters}
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFilters.length > 0 && (
              <span className="ml-1 grid h-5 w-5 place-items-center rounded-full bg-aqua-500 text-[11px] font-bold text-void-950">
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className={`mt-4 gap-4 lg:flex ${showFilters ? 'flex flex-col' : 'hidden'}`}>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Genre</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setGenre(null)}
              className={`chip transition ${!genre ? '!border-aqua-400/50 !bg-aqua-400/15 !text-aqua-200' : 'hover:!border-white/25'}`}
            >
              All genres
            </button>
            {genres.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGenre(g === genre ? null : g)}
                className={`chip transition ${genre === g ? '!border-aqua-400/50 !bg-aqua-400/15 !text-aqua-200' : 'hover:!border-white/25'}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Platform</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPlatform(null)}
              className={`chip transition ${!platform ? '!border-neon-400/50 !bg-neon-500/15 !text-neon-400' : 'hover:!border-white/25'}`}
            >
              Any platform
            </button>
            {platforms.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p === platform ? null : p)}
                className={`chip transition ${platform === p ? '!border-neon-400/50 !bg-neon-500/15 !text-neon-400' : 'hover:!border-white/25'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-slate-400">
          <span className="font-semibold text-white">{results.length}</span> of {games.length} games
          shown
        </p>
        {activeFilters.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setGenre(null)
              setPlatform(null)
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-aqua-400"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="glass mt-6 p-12 text-center">
          <h2 className="font-display text-lg font-semibold">No games match those filters</h2>
          <p className="mt-2 text-sm text-slate-400">
            Try a different genre, or clear the search to see the full catalog.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((game) => (
            <GridCard key={game.slug} game={game} />
          ))}
        </div>
      )}

      <p className="mt-10 text-center text-xs text-slate-500">
        Showing a demo catalog of {games.length} titles. Total active players across the catalog:{' '}
        {formatPlayers(games.reduce((sum, g) => sum + g.activePlayers, 0))}.
      </p>
    </div>
  )
}
