import React from 'react'
import {
  Film,
  Sparkles,
  AlertCircle,
  RefreshCw,
  SearchX,
  Clapperboard,
} from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { RecommendationForm } from '../components/RecommendationForm'
import { MovieCard } from '../components/MovieCard'
import { SkeletonCard } from '../components/SkeletonCard'
import { fetchMovieRecommendations } from '../services/recommendationApi'
import type { RecommendationRequest } from '../types/recommendation'

export function CinemaApp() {
  const {
    mutate: getRecommendations,
    data,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: (req: RecommendationRequest) => fetchMovieRecommendations(req),
  })

  const movies = data?.data.recommendations ?? []
  const hasTriggered = Boolean(data || error || isPending)

  const handleFormSubmit = (values: RecommendationRequest) => {
    getRecommendations(values)
  }

  const handleResetForm = () => {
    reset()
  }

  return (
    <div className="min-h-screen bg-[#070b10] text-zinc-100 antialiased selection:bg-amber-400 selection:text-zinc-950 font-sans">
      {/* Ambient backdrop */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <header className="flex items-center justify-between pb-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/20 text-zinc-950">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  CineMind AI
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  LangChain
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                AI Movie Recommendation Engine
              </p>
            </div>
          </div>
        </header>

        {/* Hero Section & Search Form */}
        <section className="mt-8 md:mt-10 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Discover cinema through natural language</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Find the perfect film for{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              any weekend.
            </span>
          </h1>

          <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
            Input your mood, genre, language, or era to get tailored movie recommendations.
          </p>

          <div className="pt-4 text-left">
            <RecommendationForm
              isLoading={isPending}
              onSubmit={handleFormSubmit}
              onReset={handleResetForm}
            />
          </div>
        </section>

        {/* Results Area */}
        <section className="mt-12 md:mt-16">
          {/* Initial State (No API called yet) */}
          {!hasTriggered && (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <Clapperboard className="w-7 h-7" />
              </div>
              <h3 className="text-base font-semibold text-zinc-200">
                Ready for recommendations
              </h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1">
                Enter your movie preferences and click &ldquo;Get Recommendations&rdquo; to query the LangChain backend.
              </p>
            </div>
          )}

          {/* Loading Skeleton */}
          {isPending && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <h2 className="text-lg font-bold text-zinc-200">
                  Curating Recommendations...
                </h2>
              </div>
              <div
                aria-busy="true"
                aria-live="polite"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                <SkeletonCard count={6} />
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div
              role="alert"
              className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6 md:p-8 text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-rose-200">
                Failed to fetch recommendations
              </h3>
              <p className="text-xs md:text-sm text-rose-300/80 max-w-lg mx-auto">
                {error instanceof Error
                  ? error.message
                  : 'Unable to communicate with the recommendation backend at localhost:8000.'}
              </p>
            </div>
          )}

          {/* Empty Result after Trigger */}
          {hasTriggered && !isPending && !error && movies.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-zinc-400 flex items-center justify-center mx-auto">
                <SearchX className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-zinc-200">
                No recommendations found
              </h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                The engine did not return any titles for this prompt. Try adjusting the query parameters.
              </p>
            </div>
          )}

          {/* Recommendations Grid */}
          {hasTriggered && !isPending && !error && movies.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg md:text-xl font-bold text-zinc-100">
                    Recommended Movies
                  </h2>
                  <span className="text-xs font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                    {movies.length} results
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {movies.map((movie, index) => (
                  <MovieCard
                    key={`${movie.title}-${movie.year}-${index}`}
                    movie={movie}
                    rank={index + 1}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div className="flex items-center gap-2">
            <span>Cinema Recommendation LangChain Client</span>
            <span>•</span>
            <span>FastAPI Backend on :8000</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
