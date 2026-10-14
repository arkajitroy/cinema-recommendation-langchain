import React from 'react'
import {
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  X,
  Search,
  RotateCcw,
} from 'lucide-react'
import type { RecommendationRequest } from '../types/recommendation'

interface RecommendationFormProps {
  initialValues?: RecommendationRequest
  isLoading: boolean
  onSubmit: (values: RecommendationRequest) => void
  onReset?: () => void
}

const GENRE_OPTIONS = [
  'Action',
  'Sci-Fi',
  'Thriller',
  'Crime',
  'Comedy',
  'Drama',
  'Horror',
  'Romance',
  'Adventure',
  'Animation',
  'Mystery',
  'Fantasy',
  'Documentary',
]

const LANGUAGE_OPTIONS = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'korean', label: 'Korean' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'german', label: 'German' },
  { value: 'italian', label: 'Italian' },
]

const QUICK_PROMPTS = [
  'Mind-bending sci-fi thrillers with a plot twist',
  'Feel-good 90s action comedies with memorable duos',
  'Dark crime neo-noir dramas with intense acting',
  'Fast-paced high-octane heist adventures for a weekend',
]

export const RecommendationForm: React.FC<RecommendationFormProps> = ({
  initialValues = {
    userPrompt: 'Suggest me best action film for weekends',
    genre: 'action',
    language: 'english',
    year: '2015',
    count: 10,
  },
  isLoading,
  onSubmit,
  onReset,
}) => {
  const [prompt, setPrompt] = React.useState(initialValues.userPrompt)
  const [genre, setGenre] = React.useState(initialValues.genre)
  const [language, setLanguage] = React.useState(initialValues.language)
  const [year, setYear] = React.useState(initialValues.year)
  const [count, setCount] = React.useState<number>(initialValues.count)
  const [showFilters, setShowFilters] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) {
      setErrorMsg('Please describe what kind of movies you want to discover.')
      return
    }
    setErrorMsg(null)
    onSubmit({
      userPrompt: prompt.trim(),
      genre: genre.trim().toLowerCase(),
      language: language.trim().toLowerCase(),
      year: year.trim(),
      count: Math.min(Math.max(1, count || 10), 30),
    })
  }

  const handleReset = () => {
    setPrompt('')
    setGenre('action')
    setLanguage('english')
    setYear('')
    setCount(10)
    setErrorMsg(null)
    if (onReset) onReset()
  }

  const handleSelectQuickPrompt = (quickText: string) => {
    setPrompt(quickText)
    setErrorMsg(null)
  }

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 p-5 md:p-7 shadow-2xl backdrop-blur-xl transition-all">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Main Prompt Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="userPrompt"
              className="text-xs uppercase tracking-wider font-semibold text-zinc-400 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              What are you in the mood for?
            </label>
            <span className="text-[11px] text-zinc-500 font-mono">
              {prompt.length}/280
            </span>
          </div>

          <div className="relative group">
            <textarea
              id="userPrompt"
              name="userPrompt"
              rows={2}
              maxLength={280}
              placeholder="e.g. Suggest me best action film for weekends, or gritty neo-noir detectives..."
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value)
                if (errorMsg) setErrorMsg(null)
              }}
              className="w-full rounded-xl bg-zinc-950/70 border border-white/15 px-4 py-3 text-sm md:text-base text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400 transition-all resize-none shadow-inner"
              disabled={isLoading}
            />
            {prompt && !isLoading && (
              <button
                type="button"
                onClick={() => setPrompt('')}
                aria-label="Clear prompt"
                className="absolute right-3 top-3 p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-400 font-medium flex items-center gap-1">
              <span>●</span> {errorMsg}
            </p>
          )}
        </div>

        {/* Quick Inspiration Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-zinc-500 text-[11px] font-medium whitespace-nowrap">
            Try:
          </span>
          {QUICK_PROMPTS.map((qp, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => handleSelectQuickPrompt(qp)}
              className="px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-300 text-[11px] whitespace-nowrap transition-colors disabled:opacity-50"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Advanced Filters Toggle */}
        <div className="pt-1">
          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors py-1 focus:outline-none"
              aria-expanded={showFilters}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span>Fine-tune filters ({genre || 'All'}, {language}, {year || 'Any year'}, {count} picks)</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  showFilters ? 'rotate-180 text-amber-400' : ''
                }`}
              />
            </button>

            {onReset && (
              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Collapsible Filter Panel */}
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 mt-3 p-4 rounded-xl bg-zinc-950/60 border border-white/10 animate-in fade-in duration-200">
              {/* Genre */}
              <div className="space-y-1">
                <label
                  htmlFor="filter-genre"
                  className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
                >
                  Genre
                </label>
                <select
                  id="filter-genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-zinc-900 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="action">Action</option>
                  {GENRE_OPTIONS.filter((g) => g.toLowerCase() !== 'action').map(
                    (g) => (
                      <option key={g} value={g.toLowerCase()}>
                        {g}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Language */}
              <div className="space-y-1">
                <label
                  htmlFor="filter-language"
                  className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
                >
                  Language
                </label>
                <select
                  id="filter-language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-zinc-900 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div className="space-y-1">
                <label
                  htmlFor="filter-year"
                  className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
                >
                  Release Year
                </label>
                <input
                  id="filter-year"
                  type="text"
                  placeholder="e.g. 2015 or leave blank"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  disabled={isLoading}
                  maxLength={4}
                  className="w-full bg-zinc-900 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Count */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="filter-count"
                    className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
                  >
                    Count
                  </label>
                  <span className="text-[11px] font-mono text-amber-400">
                    {count} picks
                  </span>
                </div>
                <input
                  id="filter-count"
                  type="range"
                  min="3"
                  max="20"
                  step="1"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  disabled={isLoading}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Action */}
        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm text-zinc-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-zinc-950"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>Curating with LangChain...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Get Recommendations</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
