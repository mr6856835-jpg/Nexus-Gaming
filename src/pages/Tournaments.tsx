import { useMemo, useState } from 'react'
import { CheckCircle2, CreditCard, Trophy, Users } from 'lucide-react'
import TournamentCard from '../components/TournamentCard'
import { statusStyles, tournaments, type TournamentStatus } from '../data/tournaments'

const filters: { key: TournamentStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All events' },
  { key: 'live', label: 'Live' },
  { key: 'registering', label: 'Open registration' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
]

const steps = [
  {
    icon: Users,
    title: 'Create your squad',
    body: 'Register solo or with a team. Nexus verifies ranks so brackets stay fair across every tier.',
  },
  {
    icon: CreditCard,
    title: 'Pay the entry (or don’t)',
    body: 'Most events are free for members. Paid brackets collect a single fee with no hidden cuts.',
  },
  {
    icon: Trophy,
    title: 'Play the bracket',
    body: 'Automated seeding, live scores, and dispute tooling so you can focus on the game.',
  },
  {
    icon: CheckCircle2,
    title: 'Get paid in 48 hours',
    body: 'Prize pools are distributed within two days of the final whistle — region-local payouts.',
  },
]

export default function Tournaments() {
  const [filter, setFilter] = useState<TournamentStatus | 'all'>('all')

  const filtered = useMemo(
    () => (filter === 'all' ? tournaments : tournaments.filter((t) => t.status === filter)),
    [filter],
  )

  const totalPrize = tournaments.reduce((sum, t) => sum + t.prizePool, 0)
  const openSlots = tournaments.reduce((sum, t) => sum + (t.status === 'registering' ? t.slotsTotal - t.slotsTaken : 0), 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aqua-400">Esports</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Tournaments with real prize pools
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
          From free nightly ladders to six-figure majors. Every bracket is run on Nexus tooling with
          live scoring, anti-cheat verification, and guaranteed payouts.
        </p>
      </header>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total prize money this season', value: `$${(totalPrize / 1000).toFixed(0)}K` },
          { label: 'Open registration slots', value: openSlots.toLocaleString() },
          { label: 'Events on the calendar', value: String(tournaments.length) },
        ].map((stat) => (
          <div key={stat.label} className="glass p-5">
            <dt className="text-xs uppercase tracking-wider text-slate-500">{stat.label}</dt>
            <dd className="mt-2 font-display text-2xl font-bold text-white">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((item) => {
          const count =
            item.key === 'all'
              ? tournaments.length
              : tournaments.filter((t) => t.status === item.key).length
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={`chip transition ${
                filter === item.key
                  ? '!border-aqua-400/50 !bg-aqua-400/15 !text-aqua-200'
                  : 'hover:!border-white/25'
              }`}
            >
              {item.label}
              <span className="ml-0.5 text-slate-500">{count}</span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="glass mt-6 p-12 text-center">
          <h2 className="font-display text-lg font-semibold">Nothing on the calendar here</h2>
          <p className="mt-2 text-sm text-slate-400">Try another status filter to see more events.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      )}

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">How competing on Nexus works</h2>
        <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="glass p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-neon-600/30 to-aqua-500/30 text-aqua-300">
                <step.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Step {i + 1}
              </p>
              <h3 className="mt-1 font-display text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="glass mt-14 flex flex-wrap items-center justify-between gap-6 p-8">
        <div>
          <h2 className="font-display text-xl font-bold">Want to host your own event?</h2>
          <p className="mt-2 max-w-xl text-sm text-slate-400">
            Nexus organizers get bracket tooling, custom overlays, and payout handling for free. We
            take 0% of your prize pool.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          disabled={tournaments.every((t) => t.status === 'completed')}
        >
          <Trophy className="h-4 w-4" />
          Apply to host
        </button>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        {(Object.keys(statusStyles) as TournamentStatus[]).map((status) => (
          <span key={status} className={`chip ${statusStyles[status].className}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${statusStyles[status].dot}`} />
            {statusStyles[status].label}
          </span>
        ))}
      </div>
    </div>
  )
}
