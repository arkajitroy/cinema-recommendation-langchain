import React from 'react'

interface SkeletonCardProps {
  count?: number
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="rounded-2xl bg-zinc-900/40 border border-white/5 p-5 md:p-6 animate-pulse space-y-4"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-white/10" />
              <div className="w-16 h-5 rounded-full bg-white/10" />
            </div>
            <div className="w-12 h-6 rounded-full bg-white/10" />
          </div>

          {/* Title */}
          <div className="space-y-1.5 pt-2">
            <div className="w-3/4 h-5 rounded bg-white/15" />
            <div className="w-1/4 h-3.5 rounded bg-white/10" />
          </div>

          {/* Reason Block */}
          <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3 space-y-2">
            <div className="w-full h-3 rounded bg-white/10" />
            <div className="w-5/6 h-3 rounded bg-white/10" />
          </div>

          {/* Cast */}
          <div className="pt-2 border-t border-white/5">
            <div className="w-4/5 h-3.5 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </>
  )
}
