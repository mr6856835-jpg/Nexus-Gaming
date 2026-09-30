import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { formatPlayers, type Game } from '../data/games'

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link
      to={`/games/${game.slug}`}
      className="glass card-hover group relative flex overflow-hidden">
      <div className="relative w-32 shrink-0 overflow-hidden sm:w-36">
        <img
          src={game.cover}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-void-900/70" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="truncate font-display text-base font-semibold text-white">{game.title}</h3>
          <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-300">
            <Star className="h-3.5 w-3.5 fill-amber-300" />
            {game.rating.toFixed(1)}
          </span>
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">{game.tagline}</p>

        <div className="flex flex-wrap gap-1.5">
          {game.genres.slice(0, 2).map((genre) => (
            <span key={genre} className="chip !px-2.5 !py-0.5 !text-[11px]">
              {genre}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-1 text-[11px] text-slate-400">
          <span>{formatPlayers(game.activePlayers)} playing</span>
          <span className="font-semibold text-aqua-400">
            {game.price === 0 ? 'Free to play' : `$${game.price.toFixed(2)}`}
          </span>
        </div>
      </div>
    </Link>
  )
}
