'use client'

import { useRef, useState } from 'react'
import Media from './Media'
import { useAurora } from './AuroraContext'
import { LINES } from '@/config/content'

/**
 * The four supply lines. Hovering a card leans the aurora toward that card's
 * position in the row and pools a glow under the cursor, so the background reads
 * as responding to the specific thing you are looking at.
 */
export default function LineCards() {
  const { setLean, setCharge } = useAurora()
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="mt-16 grid gap-px bg-paper/10 md:grid-cols-2 xl:grid-cols-3">
      {LINES.items.map((line, i) => (
        <Card
          key={line.key}
          index={i}
          count={LINES.items.length}
          line={line}
          open={open === line.key}
          onOpen={() => setOpen((k) => (k === line.key ? null : line.key))}
          onEnter={() => {
            setLean((i / (LINES.items.length - 1)) * 2 - 1)
            setCharge(0.28)
          }}
          onLeave={() => setCharge(0)}
        />
      ))}
    </div>
  )
}

function Card({
  line,
  index,
  count,
  open,
  onOpen,
  onEnter,
  onLeave,
}: {
  line: (typeof LINES.items)[number]
  index: number
  count: number
  open: boolean
  onOpen: () => void
  onEnter: () => void
  onLeave: () => void
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  const move = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="card pad-card group relative flex h-full flex-col overflow-hidden"
    >
      {/* glow pools under the cursor rather than sitting in a corner */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgb(var(--flare) / 0.09), transparent 72%)',
        }}
      />

      <Media
        media={line.image}
        ratio="4/3"
        sizes="(min-width: 1280px) 380px, (min-width: 768px) 45vw, 100vw"
        className="relative mb-7"
      />

      <div className="relative flex flex-1 flex-col">
        {/* fixed row height so the badge on one card doesn't shunt its title down */}
        <div className="flex h-6 items-start justify-between gap-4">
          <span className="font-mono text-[10px] tracking-[0.18em] text-flare/70">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
          {line.isNew ? (
            <span className="border border-flare/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-flare">
              New
            </span>
          ) : null}
        </div>

        <h3 className="display mt-4 text-[22px] font-semibold tracking-[-0.01em] text-paper">
          {line.name}
        </h3>
        <p className="mb-8 mt-3 max-w-[36ch] text-[15px] leading-[1.7] text-haze">{line.live}</p>

        <button
          type="button"
          onClick={onOpen}
          aria-expanded={open}
          className="mt-auto flex w-full items-center justify-between border-t border-paper/10 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-haze transition-colors duration-500 hover:text-paper"
        >
          {open ? 'Hide what ships' : 'What ships'}
          <span
            aria-hidden="true"
            className={`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? 'rotate-[135deg]' : ''
            }`}
          >
            +
          </span>
        </button>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <ul className="overflow-hidden">
            {line.items.map((it) => (
              <li
                key={it}
                className="flex gap-3 border-t border-paper/10 pt-3 mt-3 font-mono text-[12px] leading-[1.6] text-haze/85 first:border-t-0"
              >
                <span aria-hidden="true" className="mt-[6px] h-[3px] w-[3px] shrink-0 bg-flare" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
