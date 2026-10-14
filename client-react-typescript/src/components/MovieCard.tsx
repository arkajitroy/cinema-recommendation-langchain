import React from 'react'
import { Star, Users, Film, Sparkles } from 'lucide-react'
import type { MovieRecommendation } from '../types/recommendation'

interface MovieCardProps {
  movie: MovieRecommendation
  rank: number
}

function getRatingBadgeColor(rating: number): {
  bg: string
  text: string
  border: string
} {
  if (rating >= 7.5) {
    return {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
    }
  }
  if (rating >= 7.0) {
    return {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
    }
  }
  if (rating > 0) {
    return {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
    }
  }
  return {
    bg: 'bg-zinc-800/40',
    text: 'text-zinc-400',
    border: 'border-zinc-700/40',
  }
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, rank }) => {
  const ratingStyle = getRatingBadgeColor(movie.rating)

  return (
    <article
      tabIndex={0}
      aria-label={`${movie.title} (${movie.year}), Rating: ${movie.rating} out of 10`}
      className="group relative flex flex-col justify-between rounded-2xl bg-zinc-900/60 border border-white/10 p-5 md:p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:bg-zinc-900/90 hover:shadow-xl hover:shadow-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
    >
      {/* Top Header Section */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-400">
              #{rank}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase bg-white/5 text-zinc-300 border border-white/10">
              <Film className="w-3 h-3 text-amber-400/80" />
              {movie.genre}
            </span>
          </div>

          {/* Rating */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold font-mono ${ratingStyle.bg} ${ratingStyle.text} ${ratingStyle.border}`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{movie.rating > 0 ? movie.rating.toFixed(1) : 'NR'}</span>
          </div>
        </div>

        {/* Title & Year */}
        <div className="mt-3.5">
          <h3 className="text-lg md:text-xl font-bold text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">
            Release: {movie.year}
          </p>
        </div>

        {/* AI Recommendation Reason */}
        <div className="mt-3.5 rounded-xl bg-white/[0.03] border border-white/5 p-3">
          <p className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>{movie.reason}</span>
          </p>
        </div>
      </div>

      {/* Cast Footer */}
      <div className="mt-4 pt-3.5 border-t border-white/5">
        <div className="flex items-start gap-2">
          <Users className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-400 line-clamp-2">
            <span className="font-semibold text-zinc-300">Cast: </span>
            {movie.caste}
          </p>
        </div>
      </div>
    </article>
  )
}
