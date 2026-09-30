export type TournamentStatus = 'live' | 'registering' | 'upcoming' | 'completed'

export interface Tournament {
  id: string
  name: string
  gameSlug: string
  status: TournamentStatus
  format: string
  region: string
  prizePool: number
  entry: number
  startDate: string
  slotsTaken: number
  slotsTotal: number
  organizer: string
}

export const tournaments: Tournament[] = [
  {
    id: 'nexus-major-spring',
    name: 'Nexus Major — Spring Split',
    gameSlug: 'iron-legion',
    status: 'live',
    format: '5v5 · Double Elim',
    region: 'Global',
    prizePool: 250000,
    entry: 0,
    startDate: '2026-09-26',
    slotsTaken: 32,
    slotsTotal: 32,
    organizer: 'Nexus Esports',
  },
  {
    id: 'midnight-circuit',
    name: 'Midnight Circuit',
    gameSlug: 'neon-drift',
    status: 'registering',
    format: 'Solo · Time Trial Ladder',
    region: 'NA / EU',
    prizePool: 45000,
    entry: 10,
    startDate: '2026-10-11',
    slotsTaken: 1184,
    slotsTotal: 2048,
    organizer: 'Skyline Interactive',
  },
  {
    id: 'galactic-expedition-cup',
    name: 'Galactic Expedition Cup',
    gameSlug: 'starfall-odyssey',
    status: 'registering',
    format: '3v3 Co-op · Points Race',
    region: 'Global',
    prizePool: 80000,
    entry: 15,
    startDate: '2026-10-24',
    slotsTaken: 366,
    slotsTotal: 512,
    organizer: 'Longitude Nine',
  },
  {
    id: 'ghost-protocol-open',
    name: 'Ghost Protocol Open',
    gameSlug: 'shadow-run',
    status: 'upcoming',
    format: 'Solo · Speedrun Bracket',
    region: 'EU',
    prizePool: 22000,
    entry: 5,
    startDate: '2026-11-08',
    slotsTaken: 92,
    slotsTotal: 256,
    organizer: 'Nocturne Works',
  },
  {
    id: 'ashen-invitational',
    name: 'Ashen Invitational',
    gameSlug: 'hollow-crown',
    status: 'upcoming',
    format: 'Solo · Boss Rush Gauntlet',
    region: 'APAC',
    prizePool: 60000,
    entry: 0,
    startDate: '2026-11-21',
    slotsTaken: 14,
    slotsTotal: 64,
    organizer: 'Ashen Court',
  },
  {
    id: 'hollow-lantern-festival',
    name: 'Hollow Lantern Festival',
    gameSlug: 'verdant-hollow',
    status: 'completed',
    format: 'Duo · Cozy Race',
    region: 'Global',
    prizePool: 12000,
    entry: 0,
    startDate: '2026-08-30',
    slotsTaken: 500,
    slotsTotal: 500,
    organizer: 'Mosslight Studio',
  },
]

export const statusStyles: Record<TournamentStatus, { label: string; className: string; dot: string }> = {
  live: {
    label: 'Live now',
    className: 'border-rose-400/30 bg-rose-500/15 text-rose-200',
    dot: 'bg-rose-400 animate-pulse',
  },
  registering: {
    label: 'Registration open',
    className: 'border-emerald-400/30 bg-emerald-500/15 text-emerald-200',
    dot: 'bg-emerald-400',
  },
  upcoming: {
    label: 'Upcoming',
    className: 'border-amber-400/30 bg-amber-500/15 text-amber-200',
    dot: 'bg-amber-400',
  },
  completed: {
    label: 'Completed',
    className: 'border-white/15 bg-white/5 text-slate-300',
    dot: 'bg-slate-400',
  },
}
