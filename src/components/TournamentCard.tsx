import { CalendarDays, Trophy, Users } from 'lucide-react'
import { getGame } from '../data/games'
import { statusStyles, type Tournament } from '../data/tournaments'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

export default function TournamentCard({ tournament }: { tournament: Tournament }) {
  const game = getGame(tournament.gameSlug)
  const status = statusStyles[tournament.status]
  const fillPct = Math.min(100, Math.round((tournament.slotsTaken / tournament.slotsTotal) * 100))

  return (
    <article className="glass card-hover flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${status.className}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
          <h3 className="mt-3 font-display text-lg font-semibold text-white">{tournament.name}</h3>
          <p className="mt-1 text-sm text-slate-400">
            {game?.title ?? 'Unknown game'} · {tournament.format}
          </p>
        </div>
        {game && (
          <img
            src={game.cover}
            alt=""
            loading="lazy"
            className="hidden h-20 w-16 shrink-0 rounded-lg object-cover ring-1 ring-white/10 sm:block"
          />
        )}
      </div>

      <dl className="grid grid-cols-3 gap-3 text-xs">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
          <dt className="flex items-center gap-1.5 text-slate-400">
            <Trophy className="h-3.5 w-3.5" /> Prize
          </dt>
          <dd className="mt-1 font-semibold text-white">${tournament.prizePool.toLocaleString()}</dd>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
          <dt className="flex items-center gap-1.5 text-slate-400">
            <CalendarDays className="h-3.5 w-3.5" /> Starts
          </dt>
          <dd className="mt-1 font-semibold text-white">
            {dateFormatter.format(new Date(tournament.startDate))}
          </dd>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
          <dt className="flex items-center gap-1.5 text-slate-400">
            <Users className="h-3.5 w-3.5" /> Entry
          </dt>
          <dd className="mt-1 font-semibold text-white">
            {tournament.entry === 0 ? 'Free' : `$${tournament.entry}`}
          </dd>
        </div>
      </dl>

      <div>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            {tournament.slotsTaken.toLocaleString()} / {tournament.slotsTotal.toLocaleString()} slots
          </span>
          <span>{tournament.region}</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-neon-500 to-aqua-400"
            style={{ width: `${fillPct}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        disabled={tournament.status === 'completed' || fillPct === 100}
        className="btn-ghost mt-auto w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        {tournament.status === 'completed'
          ? 'View results'
          : fillPct === 100
            ? 'Bracket full'
            : tournament.status === 'live'
              ? 'Watch live'
              : 'Register team'}
      </button>
    </article>
  )
}
