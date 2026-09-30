import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  Building2,
  Gamepad2,
  Heart,
  Play,
  Star,
  Trophy,
  Users,
} from 'lucide-react'
import { formatPlayers, games, getGame } from '../data/games'
import { statusStyles, tournaments } from '../data/tournaments'

const TABS = ['Overview', 'Modes', 'Tournaments'] as const
type Tab = (typeof TABS)[number]

export default function GameDetail() {
  const { slug = '' } = useParams()
  const game = getGame(slug)
  const [tab, setTab] = useState<Tab>('Overview')
  const [liked, setLiked] = useState(false)

  if (!game) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold">Game not found</h1>
        <p className="mt-3 text-sm text-slate-400">
          We couldn&apos;t find a game with the slug “{slug}” in the catalog.
        </p>
        <Link to="/games" className="btn-primary mt-6">
          <ArrowLeft className="h-4 w-4" />
          Back to catalog
        </Link>
      </div>
    )
  }

  const related = games.filter((g) => g.slug !== game.slug && g.genres.some((x) => game.genres.includes(x))).slice(0, 3)
  const gameTournaments = tournaments.filter((t) => t.gameSlug === game.slug)

  return (
    <div>
      <div className="relative">
        <img src={game.cover} alt="" className="absolute inset-0 h-full w-full object-cover object-top opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-void-950/60 via-void-950/90 to-void-950" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link to="/games" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-aqua-400">
            <ArrowLeft className="h-4 w-4" />
            Catalog
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
            <img
              src={game.cover}
              alt={game.title}
              className="hidden aspect-[3/4] w-full rounded-2xl object-cover ring-1 ring-white/10 lg:block"
            />

            <div>
              <div className="flex flex-wrap gap-2">
                {game.genres.map((genre) => (
                  <span key={genre} className="chip !text-[11px] text-aqua-300">
                    {genre}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold sm:text-5xl">{game.title}</h1>
              <p className="mt-3 max-w-2xl text-base text-slate-300">{game.tagline}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
                  <strong className="text-white">{game.rating.toFixed(1)}</strong>
                  <span className="text-slate-500">({game.reviews.toLocaleString()} reviews)</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4 text-neon-400" />
                  {formatPlayers(game.activePlayers)} playing
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-slate-500" />
                  {new Date(game.releaseDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    timeZone: 'UTC',
                  })}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button type="button" className="btn-primary">
                  <Play className="h-4 w-4 fill-white" />
                  {game.price === 0 ? 'Play free' : `Buy for $${game.price.toFixed(2)}`}
                </button>
                <button
                  type="button"
                  onClick={() => setLiked((v) => !v)}
                  aria-pressed={liked}
                  className="btn-ghost"
                >
                  <Heart className={`h-4 w-4 ${liked ? 'fill-rose-400 text-rose-400' : ''}`} />
                  {liked ? 'In your library' : 'Add to library'}
                </button>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: 'Developer', value: game.developer, icon: Building2 },
                  { label: 'Platforms', value: `${game.platforms.length} supported`, icon: Gamepad2 },
                  { label: 'Tournaments', value: `${gameTournaments.length} active`, icon: Trophy },
                  { label: 'Reviews', value: game.reviews.toLocaleString(), icon: Star },
                ].map((item) => (
                  <div key={item.label} className="glass p-4">
                    <dt className="flex items-center gap-1.5 text-xs text-slate-500">
                      <item.icon className="h-3.5 w-3.5" />
                      {item.label}
                    </dt>
                    <dd className="mt-1.5 truncate text-sm font-semibold text-white">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex gap-1 border-b border-white/10" role="tablist">
          {TABS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              onClick={() => setTab(item)}
              className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition ${
                tab === item
                  ? 'border-aqua-400 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            {tab === 'Overview' && (
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-slate-300">{game.description}</p>
                <div>
                  <h2 className="font-display text-lg font-semibold">Supported platforms</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {game.platforms.map((p) => (
                      <span key={p} className="chip">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: 'Review score', value: `${game.rating.toFixed(1)} / 5` },
                    { label: 'Active now', value: formatPlayers(game.activePlayers) },
                    { label: 'Release', value: new Date(game.releaseDate).getUTCFullYear().toString() },
                  ].map((stat) => (
                    <div key={stat.label} className="glass p-5">
                      <p className="text-xs uppercase tracking-wider text-slate-500">{stat.label}</p>
                      <p className="mt-2 font-display text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'Modes' && (
              <ul className="space-y-3">
                {game.modes.map((mode) => (
                  <li key={mode} className="glass flex items-center justify-between gap-4 p-5">
                    <div>
                      <p className="font-semibold text-white">{mode}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        Matchmaking enabled · Nexus ranked points apply
                      </p>
                    </div>
                    <button type="button" className="btn-ghost !px-4 !py-2 !text-xs">
                      Queue up
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {tab === 'Tournaments' && (
              <div className="space-y-3">
                {gameTournaments.length === 0 ? (
                  <p className="glass p-6 text-sm text-slate-400">
                    No tournaments scheduled for {game.title} right now. Follow the game to get
                    notified when brackets open.
                  </p>
                ) : (
                  gameTournaments.map((t) => (
                    <div key={t.id} className="glass flex flex-wrap items-center justify-between gap-4 p-5">
                      <div>
                        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${statusStyles[t.status].className}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${statusStyles[t.status].dot}`} />
                          {statusStyles[t.status].label}
                        </span>
                        <p className="mt-2 font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-slate-400">
                          {t.format} · ${t.prizePool.toLocaleString()} prize pool · {t.region}
                        </p>
                      </div>
                      <Link to="/tournaments" className="btn-ghost !px-4 !py-2 !text-xs">
                        View bracket
                      </Link>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="glass p-5">
              <h2 className="font-display text-base font-semibold">More like this</h2>
              <ul className="mt-4 space-y-3">
                {related.map((g) => (
                  <li key={g.slug}>
                    <Link to={`/games/${g.slug}`} className="group flex items-center gap-3">
                      <img src={g.cover} alt="" loading="lazy" className="h-14 w-11 rounded-lg object-cover ring-1 ring-white/10" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-white group-hover:text-aqua-400">
                          {g.title}
                        </span>
                        <span className="block truncate text-xs text-slate-500">{g.genres[0]}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass p-5">
              <h2 className="font-display text-base font-semibold">Nexus rank</h2>
              <p className="mt-2 text-xs text-slate-400">
                Community rank based on this season&apos;s activity.
              </p>
              <p className="mt-3 font-display text-4xl font-bold text-gradient">
                #{Math.max(1, Math.round(game.rating * 3))}
              </p>
              <p className="text-xs text-slate-500">of 6,800 catalogued games</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
