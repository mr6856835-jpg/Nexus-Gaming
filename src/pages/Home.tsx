import { Link } from 'react-router-dom'
import { ArrowRight, Flame, Play, Radio, Sparkles, TrendingUp, Trophy, Users } from 'lucide-react'
import GameCard from '../components/GameCard'
import TournamentCard from '../components/TournamentCard'
import { games, formatPlayers } from '../data/games'
import { tournaments } from '../data/tournaments'
import { players } from '../data/players'
import { discordPerks, featuredClips, news, siteStats } from '../data/community'

const tickerItems = [
  'Neon Drift · Patch 2.4 live',
  'Iron Legion Major · Playoffs',
  'Starfall Odyssey · 688K online',
  'Hollow Crown · Boss Rush finals',
  'Verdant Hollow · Co-op update',
  'Shadow Run · Ghost Challenge',
]

function Hero() {
  const featured = games.filter((g) => g.featured)
  const hero = featured[0]

  return (
    <section className="relative overflow-hidden">
      <img
        src="/art/hero.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void-950/70 via-void-950/85 to-void-950" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-aqua-400/30 bg-aqua-400/10 px-3.5 py-1.5 text-xs font-semibold text-aqua-300">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            Nexus Major Spring Split is live
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            <span className="text-gradient">Play. Compete.</span>
            <br />
            Connect.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Nexus Gaming is where 2.4 million players find their next favourite world, battle
            through ranked seasons, and win real prize pools — all in one hub.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/games" className="btn-primary">
              Browse games
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/tournaments" className="btn-ghost">
              <Trophy className="h-4 w-4" />
              Join a tournament
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {siteStats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs uppercase tracking-wider text-slate-500">{stat.label}</dt>
                <dd className="mt-1 font-display text-2xl font-bold text-white">{stat.value}</dd>
                <dd className="text-[11px] text-slate-500">{stat.hint}</dd>
              </div>
            ))}
          </dl>
        </div>

        {hero && (
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-neon-600/30 to-aqua-500/20 blur-2xl" />
            <Link
              to={`/games/${hero.slug}`}
              className="glass card-hover group block overflow-hidden !rounded-3xl !p-0"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={hero.cover}
                  alt={hero.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/40 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-void-950/70 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur">
                  <Flame className="h-3.5 w-3.5" />
                  Editor&apos;s pick
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h2 className="font-display text-2xl font-bold text-white">{hero.title}</h2>
                  <p className="mt-1 text-sm text-slate-300">{hero.tagline}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-slate-300">
                    <span className="inline-flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-aqua-400" />
                      {formatPlayers(hero.activePlayers)} online
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-neon-400" />
                      {hero.reviews.toLocaleString()} reviews
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {featured.slice(1).map((game) => (
                <Link
                  key={game.slug}
                  to={`/games/${game.slug}`}
                  className="group relative overflow-hidden rounded-xl ring-1 ring-white/10 transition hover:ring-aqua-400/50"
                  title={game.title}
                >
                  <img
                    src={game.cover}
                    alt={game.title}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void-950/90 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 truncate p-2 text-[11px] font-semibold text-white">
                    {game.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative border-y border-white/10 bg-void-900/60 py-3">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap pl-10">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
              <Sparkles className="h-3.5 w-3.5 text-neon-400" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHeader({
  eyebrow,
  title,
  description,
  to,
  cta,
}: {
  eyebrow: string
  title: string
  description: string
  to: string
  cta: string
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aqua-400">{eyebrow}</p>
        <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
      </div>
      <Link to={to} className="btn-ghost !px-4 !py-2.5">
        {cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

export default function Home() {
  const spotlight = games.slice(0, 4)
  const liveTournaments = tournaments.filter((t) => t.status !== 'completed').slice(0, 3)
  const topPlayers = players.slice(0, 5)

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Trending now"
          title="Games the community is grinding this week"
          description="Hand-picked from 6,800 titles based on live player counts, review velocity, and tournament activity."
          to="/games"
          cta="All games"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {spotlight.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-void-900/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Esports"
            title="Tournaments open right now"
            description="Free entry for Nexus members, automated brackets, and prize payouts within 48 hours of the final."
            to="/tournaments"
            cta="Full schedule"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {liveTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              eyebrow="Leaderboard"
              title="Season 7 top ranks"
              description="Points carry over between seasons. Finish top 100 to qualify for the Nexus Invitational."
              to="/leaderboard"
              cta="Full ladder"
            />
            <ul className="glass divide-y divide-white/5 overflow-hidden !p-0">
              {topPlayers.map((player) => (
                <li key={player.handle} className="flex items-center gap-4 px-4 py-3.5">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg font-display text-sm font-bold ${
                      player.rank === 1
                        ? 'bg-gradient-to-br from-amber-300 to-amber-500 text-void-950'
                        : player.rank <= 3
                          ? 'bg-white/10 text-white'
                          : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {player.rank}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{player.handle}</p>
                    <p className="truncate text-xs text-slate-500">
                      {games.find((g) => g.slug === player.gameSlug)?.title} · {player.region}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-sm font-bold text-white">
                      {player.points.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500">{player.winRate}% WR</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeader
              eyebrow="Clips"
              title="Plays of the week"
              description="Community-submitted highlights, upvoted by the Nexus feed."
              to="/community"
              cta="Watch feed"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {featuredClips.map((clip) => (
                <article key={clip.id} className="glass card-hover group overflow-hidden !p-0">
                  <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-neon-600/25 via-void-800 to-aqua-500/20">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur transition group-hover:scale-110 group-hover:bg-white/20">
                      <Play className="h-5 w-5 translate-x-0.5 fill-white text-white" />
                    </span>
                    <span className="absolute bottom-2 right-2 rounded-md bg-void-950/80 px-2 py-0.5 text-[11px] font-medium text-slate-200">
                      {clip.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2 text-sm font-semibold text-white">{clip.title}</h3>
                    <p className="mt-1.5 text-xs text-slate-400">
                      {clip.author} · {clip.game}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{clip.views} views</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-void-900/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Community"
            title="Fresh from the Nexus feed"
            description="Patch breakdowns, creator interviews, and everything happening across the network."
            to="/community"
            cta="Read the feed"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {news.map((post) => (
              <article key={post.id} className="glass card-hover flex flex-col p-5">
                <span className="chip w-fit !text-[11px] text-aqua-300">{post.category}</span>
                <h3 className="mt-3 font-display text-base font-semibold leading-snug text-white">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
                  {post.excerpt}
                </p>
                <p className="mt-auto pt-4 text-xs text-slate-500">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    timeZone: 'UTC',
                  })}{' '}
                  · {post.readTime} read
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="glass relative overflow-hidden !rounded-3xl p-8 sm:p-12">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-neon-600/25 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-aqua-500/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                Join 2.4 million players in the Nexus Discord
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Squad up, scrim, and get first access to tournament slots. Membership is free and
                takes about ten seconds.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/community" className="btn-primary">
                  Create free account
                </Link>
                <Link to="/leaderboard" className="btn-ghost">
                  See the ladder
                </Link>
              </div>
            </div>
            <ul className="space-y-3">
              {discordPerks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-aqua-400/15 text-aqua-300">
                    <Sparkles className="h-3 w-3" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
