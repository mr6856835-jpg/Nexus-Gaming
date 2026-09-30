export type Platform = 'PC' | 'PlayStation' | 'Xbox' | 'Switch' | 'Mobile' | 'Cloud'

export interface Game {
  slug: string
  title: string
  tagline: string
  description: string
  cover: string
  genres: string[]
  platforms: Platform[]
  modes: string[]
  developer: string
  releaseDate: string
  rating: number
  reviews: number
  activePlayers: number
  price: number
  featured?: boolean
  accent: string
}

export const games: Game[] = [
  {
    slug: 'neon-drift',
    title: 'Neon Drift',
    tagline: 'Outrun the grid. Own the night.',
    description:
      'A gravity-defying arcade racer set in a rain-slicked megacity. Chain drift boosts, hack rival engines mid-race, and climb the global time-trial ladder every season.',
    cover: '/art/game-neon-drift.jpg',
    genres: ['Racing', 'Arcade', 'Multiplayer'],
    platforms: ['PC', 'PlayStation', 'Xbox', 'Cloud'],
    modes: ['Ranked Time Trial', 'Crew vs Crew', 'Solo Campaign'],
    developer: 'Skyline Interactive',
    releaseDate: '2026-03-14',
    rating: 4.8,
    reviews: 128420,
    activePlayers: 412000,
    price: 39.99,
    featured: true,
    accent: 'from-fuchsia-500/70 to-cyan-400/70',
  },
  {
    slug: 'starfall-odyssey',
    title: 'Starfall Odyssey',
    tagline: 'Ten thousand worlds. One last jump.',
    description:
      'An open-galaxy RPG where every star you chart changes the story. Build a crew, upgrade your hull, and decide which empires survive the Starfall.',
    cover: '/art/game-starfall.jpg',
    genres: ['RPG', 'Open World', 'Sci-Fi'],
    platforms: ['PC', 'PlayStation', 'Xbox'],
    modes: ['Story Campaign', 'Co-op Expeditions', 'Exploration'],
    developer: 'Longitude Nine',
    releaseDate: '2025-11-07',
    rating: 4.9,
    reviews: 214980,
    activePlayers: 688000,
    price: 59.99,
    featured: true,
    accent: 'from-indigo-500/70 to-sky-400/70',
  },
  {
    slug: 'shadow-run',
    title: 'Shadow Run',
    tagline: 'Never seen. Never heard. Never caught.',
    description:
      'Tactical stealth through a fog-drowned gothic city. Study patrol patterns, spend your gadgets wisely, and ghost every contract without raising a single alarm.',
    cover: '/art/game-shadow-run.jpg',
    genres: ['Stealth', 'Action', 'Single Player'],
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    modes: ['Solo Campaign', 'Contract Mode', 'Ghost Challenge'],
    developer: 'Nocturne Works',
    releaseDate: '2026-01-23',
    rating: 4.7,
    reviews: 96240,
    activePlayers: 205000,
    price: 49.99,
    featured: true,
    accent: 'from-teal-500/70 to-amber-400/70',
  },
  {
    slug: 'verdant-hollow',
    title: 'Verdant Hollow',
    tagline: 'A tiny lantern against a very big forest.',
    description:
      'A cozy exploration adventure about a small knight, a glowing lantern, and a forest that rearranges itself every night. Gather, craft, and befriend the hollow.',
    cover: '/art/game-verdant.jpg',
    genres: ['Adventure', 'Cozy', 'Exploration'],
    platforms: ['PC', 'Switch', 'Mobile'],
    modes: ['Story Campaign', 'Local Co-op', 'Free Roam'],
    developer: 'Mosslight Studio',
    releaseDate: '2026-06-02',
    rating: 4.9,
    reviews: 74310,
    activePlayers: 318000,
    price: 24.99,
    accent: 'from-emerald-500/70 to-lime-400/70',
  },
  {
    slug: 'iron-legion',
    title: 'Iron Legion',
    tagline: 'Hold the line. Break the machine.',
    description:
      'Squad-based tactical shooter with 64-player combined-arms battles. Pilot walkers, coordinate voice comms, and grind out a persistent galactic war map.',
    cover: '/art/game-iron-legion.jpg',
    genres: ['Shooter', 'Tactical', 'Esports'],
    platforms: ['PC', 'PlayStation', 'Xbox'],
    modes: ['Ranked 5v5', 'Combined Arms 64', 'Campaign'],
    developer: 'Redline Foundry',
    releaseDate: '2025-09-19',
    rating: 4.6,
    reviews: 302640,
    activePlayers: 1240000,
    price: 0,
    accent: 'from-orange-500/70 to-slate-300/70',
  },
  {
    slug: 'hollow-crown',
    title: 'Hollow Crown',
    tagline: 'The throne remembers everyone who kneels.',
    description:
      'A punishing dark-fantasy action RPG. Learn boss tells frame by frame, build your own fighting style, and decide whether the crown is worth the ash.',
    cover: '/art/game-hollow-crown.jpg',
    genres: ['Action RPG', 'Soulslike', 'Dark Fantasy'],
    platforms: ['PC', 'PlayStation', 'Xbox'],
    modes: ['Solo Campaign', 'Invasion PvP', 'Boss Rush'],
    developer: 'Ashen Court',
    releaseDate: '2025-06-11',
    rating: 4.8,
    reviews: 187530,
    activePlayers: 536000,
    price: 49.99,
    accent: 'from-rose-600/70 to-amber-500/70',
  },
]

export const genres = [...new Set(games.flatMap((g) => g.genres))].sort()
export const platforms = [...new Set(games.flatMap((g) => g.platforms))]

export function getGame(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug)
}

export function formatPlayers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`
  return String(n)
}
