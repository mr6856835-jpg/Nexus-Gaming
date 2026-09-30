import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, Crown, Minus, Zap } from 'lucide-react'
import { games } from '../data/games'
import { leaderboardSeasons, players } from '../data/players'

const regions = ['All regions', 'NA', 'EU', 'APAC', 'SA']

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'flat' }) {
  if (trend === 'up') return <ArrowUp className="h-3.5 w-3.5 text-emerald-400" />
  if (trend === 'down') return <ArrowDown className="h-3.5 w-3.5 text-rose-400" />
  return <Minus className="h-3.5 w-3.5 text-slate-500" />
}

export default function Leaderboard() {
  const [region, setRegion] = useState('All regions')
  const [season, setSeason] = useState(leaderboardSeasons[0])
  const [gameFilter, setGameFilter] = useState('all')

  const rows = useMemo(() => {
    return players
      .filter((p) => region === 'All regions' || p.region === region)
      .filter((p) => gameFilter === 'all' || p.gameSlug === gameFilter)
      .sort((a, b) => b.points - a.points)
      .map((p, i) => ({ ...p, rank: i + 1 }))
  }, [region, gameFilter])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aqua-400">Ranked play</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Global leaderboard</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
          Points are earned from ranked matches, tournament placements, and seasonal challenges.
          Finish in the top 100 to qualify for the Nexus Invitational.
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-3">
        <label className="relative">
          <span className="sr-only">Season</span>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 pr-9 text-sm text-white focus:border-aqua-400/60 focus:outline-none"
          >
            {leaderboardSeasons.map((s) => (
              <option key={s} value={s} className="bg-void-800">
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="relative">
          <span className="sr-only">Region</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 pr-9 text-sm text-white focus:border-aqua-400/60 focus:outline-none"
          >
            {regions.map((r) => (
              <option key={r} value={r} className="bg-void-800">
                {r}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setGameFilter('all')}
            className={`chip transition ${gameFilter === 'all' ? '!border-neon-400/50 !bg-neon-500/15 !text-neon-400' : 'hover:!border-white/25'}`}
          >
            All games
          </button>
          {games.map((g) => (
            <button
              key={g.slug}
              type="button"
              onClick={() => setGameFilter(g.slug)}
              className={`chip transition ${gameFilter === g.slug ? '!border-neon-400/50 !bg-neon-500/15 !text-neon-400' : 'hover:!border-white/25'}`}
            >
              {g.title}
            </button>
          ))}
        </div>
      </div>

      {rows.length >= 3 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[rows[1], rows[0], rows[2]].map((player, i) => {
            const place = i === 1 ? 1 : i === 0 ? 2 : 3
            return (
              <article
                key={player.handle}
                className={`glass relative flex flex-col items-center p-6 text-center ${
                  place === 1 ? 'sm:-mt-4 border-amber-300/30 bg-amber-300/[0.05]' : ''
                }`}
              >
                {place === 1 && (
                  <Crown className="absolute -top-3.5 h-7 w-7 rotate-0 text-amber-300" />
                )}
                <span
                  className={`grid h-14 w-14 place-items-center rounded-2xl font-display text-lg font-bold ${
                    place === 1
                      ? 'bg-gradient-to-br from-amber-300 to-amber-500 text-void-950'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  {player.handle.slice(0, 2).toUpperCase()}
                </span>
                <h2 className="mt-4 font-display text-lg font-bold text-white">{player.handle}</h2>
                <p className="text-xs text-slate-400">
                  {games.find((g) => g.slug === player.gameSlug)?.title} · {player.region}
                </p>
                <p className="mt-4 font-display text-3xl font-bold text-gradient">
                  {player.points.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">Nexus points</p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400">
                  <Zap className="h-3.5 w-3.5 text-aqua-400" />
                  {player.streak > 0 ? `${player.streak} win streak` : `${Math.abs(player.streak)} loss streak`}
                </p>
              </article>
            )
          })}
        </div>
      )}

      <div className="glass mt-8 overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <caption className="sr-only">Nexus Gaming ranked leaderboard for {season}</caption>
            <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-medium">Rank</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Player</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Main game</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Points</th>
                <th scope="col" className="px-5 py-3.5 font-medium">W / L</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Win rate</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Region</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((player) => (
                <tr key={player.handle} className="transition hover:bg-white/[0.04]">
                  <td className="px-5 py-4">
                    <span
                      className={`inline-grid h-8 w-8 place-items-center rounded-lg font-display text-sm font-bold ${
                        player.rank === 1
                          ? 'bg-gradient-to-br from-amber-300 to-amber-500 text-void-950'
                          : player.rank <= 3
                            ? 'bg-white/10 text-white'
                            : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      {player.rank}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium text-white">{player.handle}</td>
                  <td className="px-5 py-4 text-slate-400">
                    {games.find((g) => g.slug === player.gameSlug)?.title}
                  </td>
                  <td className="px-5 py-4 font-semibold text-white">{player.points.toLocaleString()}</td>
                  <td className="px-5 py-4 text-slate-400">
                    {player.wins} / {player.losses}
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                        <span
                          className="block h-full rounded-full bg-gradient-to-r from-neon-500 to-aqua-400"
                          style={{ width: `${player.winRate}%` }}
                        />
                      </span>
                      <span className="text-xs text-slate-400">{player.winRate}%</span>
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{player.region}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                      <TrendIcon trend={player.trend} />
                      {player.streak > 0 ? `+${player.streak}` : player.streak}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && (
          <p className="px-6 py-12 text-center text-sm text-slate-400">
            No ranked players match those filters yet.
          </p>
        )}
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Points are normalized across games so cross-title rankings stay comparable. Region filters
        show {region === 'All regions' ? 'every region' : region} for {season}.
      </p>
    </div>
  )
}
