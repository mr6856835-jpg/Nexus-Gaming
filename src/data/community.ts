export const siteStats = [
  { label: 'Active players', value: '2.4M', hint: 'across 148 countries' },
  { label: 'Monthly tournaments', value: '320+', hint: '$1.2M in prizes' },
  { label: 'Games catalogued', value: '6,800', hint: 'PC, console & cloud' },
  { label: 'Avg. match queue', value: '14s', hint: 'ranked play' },
]

export interface NewsPost {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
}

export const news: NewsPost[] = [
  {
    id: 'n1',
    title: 'Nexus Major Spring Split enters playoffs',
    excerpt:
      'Thirty-two squads, one bracket. Fourteen days of Iron Legion action culminates in a $250,000 grand final live from the Chicago Annex.',
    category: 'Esports',
    date: '2026-09-28',
    readTime: '4 min',
  },
  {
    id: 'n2',
    title: 'Patch 2.4 reshapes the Neon Drift meta',
    excerpt:
      'Drift chaining gets a skill ceiling bump, three tracks are re-surfaced, and hack cooldowns are finally tuned down across the board.',
    category: 'Patch Notes',
    date: '2026-09-25',
    readTime: '6 min',
  },
  {
    id: 'n3',
    title: 'Community spotlight: the speedrunners of Shadow Run',
    excerpt:
      'Meet the crew that shaved eleven seconds off the Cathedral Vault route using nothing but a lantern and frame-perfect ledge grabs.',
    category: 'Community',
    date: '2026-09-21',
    readTime: '5 min',
  },
  {
    id: 'n4',
    title: 'Verdant Hollow gets co-op and photo mode',
    excerpt:
      'Play the forest with a friend, then pause the world to frame the perfect firefly shot. Free for everyone who owns the base game.',
    category: 'Announcement',
    date: '2026-09-18',
    readTime: '3 min',
  },
]

export const featuredClips = [
  { id: 'c1', title: '1v5 clutch on Overpass Relay', author: 'V0IDWALKER', game: 'Iron Legion', views: '842K', duration: '0:47' },
  { id: 'c2', title: 'World-record drift chain', author: 'KitsuneHex', game: 'Neon Drift', views: '512K', duration: '1:12' },
  { id: 'c3', title: 'No-hit Hollow Crown final boss', author: 'gravesong', game: 'Hollow Crown', views: '1.3M', duration: '3:58' },
  { id: 'c4', title: 'Perfect ghost run, zero alarms', author: 'quietstep', game: 'Shadow Run', views: '377K', duration: '2:21' },
]

export const discordPerks = [
  'Find squadmates with role-based matchmaking',
  'Scrim channels for every ranked tier',
  'Patch-day theorycrafting and builder tools',
  'Early access to tournament registration slots',
]
