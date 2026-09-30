export interface Player {
  rank: number
  handle: string
  gameSlug: string
  points: number
  wins: number
  losses: number
  winRate: number
  region: string
  streak: number
  trend: 'up' | 'down' | 'flat'
}

export const players: Player[] = [
  { rank: 1, handle: 'V0IDWALKER', gameSlug: 'iron-legion', points: 18420, wins: 412, losses: 88, winRate: 82, region: 'NA', streak: 11, trend: 'up' },
  { rank: 2, handle: 'KitsuneHex', gameSlug: 'neon-drift', points: 17890, wins: 388, losses: 96, winRate: 80, region: 'APAC', streak: 6, trend: 'up' },
  { rank: 3, handle: 'gravesong', gameSlug: 'hollow-crown', points: 17310, wins: 501, losses: 142, winRate: 78, region: 'EU', streak: -2, trend: 'down' },
  { rank: 4, handle: 'NOVA_9', gameSlug: 'starfall-odyssey', points: 16980, wins: 274, losses: 71, winRate: 79, region: 'NA', streak: 4, trend: 'flat' },
  { rank: 5, handle: 'quietstep', gameSlug: 'shadow-run', points: 16340, wins: 233, losses: 69, winRate: 77, region: 'EU', streak: 9, trend: 'up' },
  { rank: 6, handle: 'emberlash', gameSlug: 'iron-legion', points: 15990, wins: 356, losses: 121, winRate: 75, region: 'SA', streak: -3, trend: 'down' },
  { rank: 7, handle: 'mossknight', gameSlug: 'verdant-hollow', points: 15220, wins: 198, losses: 74, winRate: 73, region: 'APAC', streak: 2, trend: 'flat' },
  { rank: 8, handle: 'Zephyr', gameSlug: 'neon-drift', points: 14870, wins: 289, losses: 114, winRate: 72, region: 'EU', streak: 5, trend: 'up' },
  { rank: 9, handle: 'RedAkiba', gameSlug: 'starfall-odyssey', points: 14310, wins: 165, losses: 63, winRate: 72, region: 'APAC', streak: 1, trend: 'up' },
  { rank: 10, handle: 'nullpointer', gameSlug: 'hollow-crown', points: 13880, wins: 242, losses: 103, winRate: 70, region: 'NA', streak: -1, trend: 'down' },
  { rank: 11, handle: 'sablefox', gameSlug: 'shadow-run', points: 13410, wins: 176, losses: 80, winRate: 69, region: 'EU', streak: 3, trend: 'up' },
  { rank: 12, handle: 'TeraByte', gameSlug: 'iron-legion', points: 12980, wins: 301, losses: 149, winRate: 67, region: 'NA', streak: -4, trend: 'down' },
]

export const leaderboardSeasons = ['Season 7 · Current', 'Season 6 · Final', 'Season 5 · Archive']
