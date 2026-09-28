'use client'

import { useEffect, useState } from 'react'
import { RAIL } from '@/config/site'

/**
 * A fixed rail down the right edge that reads the page as a run of sections,
 * marks where you are, and takes you anywhere on the run. Hidden below lg and
 * hidden from assistive tech, since the same links exist in the header.
 */
export default function ScrollRail() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const ids = RAIL.map((r) => r.id)

    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)

      const mid = window.innerHeight * 0.42
      let next = 0
      ids.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= mid) next = i
      })
      setActive(next)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <aside
      aria-hidden="true"
      className="fixed right-7 top-1/2 z-30 hidden -translate-y-1/2 2xl:block"
    >
      <div className="relative flex flex-col items-end gap-5 border border-paper/10 bg-ink/82 px-3 py-4 shadow-lg backdrop-blur-md">
        <div className="absolute right-[3px] top-0 h-full w-px bg-paper/12" />
        <div
          className="absolute right-[3px] top-0 w-px bg-flare transition-[height] duration-300 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
        {RAIL.map((r, i) => (
          <a
            key={r.id}
            href={`#${r.id}`}
            tabIndex={-1}
            className="group relative flex items-center gap-3 pr-0"
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-300 ${
                i === active
                  ? 'translate-x-0 text-paper opacity-100'
                  : 'translate-x-2 text-haze opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
              }`}
            >
              {r.label}
            </span>
            <span
              className={`block h-[7px] w-[7px] rounded-full transition-colors duration-300 ${
                i === active ? 'bg-flare' : 'bg-paper/25 group-hover:bg-paper/60'
              }`}
            />
          </a>
        ))}
      </div>
    </aside>
  )
}
