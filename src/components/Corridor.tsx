'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useAurora } from './AuroraContext'
import { CORRIDOR } from '@/config/content'

const STAGES = CORRIDOR.stages
const DWELL = 8000

/**
 * Corridor
 * --------
 * The site's signature. A consignment moves through six stages between the
 * factory floor and the site, and AnoEnergy holds something specific at each.
 *
 * It plays itself until you touch it, then hands over: hover, click, arrow keys
 * or drag the rail. Each stage change leans the aurora a little further across
 * the sky and fires a surge, so the background walks the corridor with you.
 *
 * Numbering is used because the stages genuinely are a sequence.
 */
export default function Corridor() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const [inView, setInView] = useState(false)
  const [tick, setTick] = useState(0)

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const railRef = useRef<HTMLDivElement | null>(null)
  const { setLean } = useAurora()

  const go = useCallback(
    (i: number, manual = true) => {
      const next = ((i % STAGES.length) + STAGES.length) % STAGES.length
      setActive(next)
      if (manual) setAuto(false)
      // the sky leans with the corridor, slowly. No surge per stage, that was noise.
      setLean(((next / (STAGES.length - 1)) * 2 - 1) * 0.6)
    },
    [setLean],
  )

  /* pause the autoplay while the corridor is off screen */
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 })
    io.observe(node)
    return () => io.disconnect()
  }, [])

  /* autoplay */
  useEffect(() => {
    if (!auto || !inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % STAGES.length
        setLean(((next / (STAGES.length - 1)) * 2 - 1) * 0.6)
        return next
      })
      setTick((t) => t + 1)
    }, DWELL)
    return () => window.clearInterval(id)
  }, [auto, inView, setLean])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      go(active + 1)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      go(active - 1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      go(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      go(STAGES.length - 1)
    }
  }

  /*
    Drag along the rail to scrub. Only while the rail is horizontal — below md it
    is a vertical list, where a horizontal drag means nothing and would fight the
    page scroll.
  */
  const scrub = useCallback(
    (clientX: number) => {
      const el = railRef.current
      if (!el) return
      if (!window.matchMedia('(min-width: 768px)').matches) return
      const r = el.getBoundingClientRect()
      const f = Math.max(0, Math.min(1, (clientX - r.left) / r.width))
      go(Math.round(f * (STAGES.length - 1)))
    },
    [go],
  )

  const dragging = useRef(false)

  const stage = STAGES[active]
  const progress = (active / (STAGES.length - 1)) * 100

  return (
    <div ref={sectionRef} className="mt-14">
      <div
        ref={railRef}
        role="tablist"
        aria-label="Sourcing corridor stages"
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={(e) => {
          dragging.current = true
          scrub(e.clientX)
        }}
        onPointerMove={(e) => dragging.current && scrub(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerLeave={() => (dragging.current = false)}
        className="touch-pan-y pb-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-flare md:-mx-10 md:cursor-ew-resize md:overflow-x-auto md:px-10 md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden"
      >
        {/* vertical list on a phone, horizontal rail from md up */}
        <div className="relative flex flex-col md:min-w-[720px] md:flex-row md:select-none">
          {/* the horizontal track only exists once the rail is horizontal */}
          <div className="absolute left-0 right-0 top-[13px] hidden h-px bg-paper/12 md:block" />
          <div
            className="absolute left-0 top-[13px] hidden h-px bg-flare transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:block"
            style={{ width: `${progress}%` }}
          />

          {STAGES.map((s, i) => {
            const on = i === active
            const past = i < active
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                onClick={() => go(i)}
                onPointerEnter={(e) => e.pointerType === 'mouse' && go(i)}
                onFocus={() => go(i)}
                className="group relative grid grid-cols-[27px_minmax(0,1fr)] items-start gap-x-4 py-2.5 pr-4 text-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none md:block md:flex-1 md:py-0 md:pr-6"
              >
                {/*
                  On a phone the stages connect down the page, so each node draws
                  its own segment to the next one. Exact, and no percentage maths
                  against a list whose rows can wrap.
                */}
                {i < STAGES.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-2.5 left-[13px] top-[34px] w-px transition-colors duration-500 md:hidden ${
                      past ? 'bg-flare/45' : 'bg-paper/12'
                    }`}
                  />
                ) : null}

                <span
                  className={`relative block h-[27px] w-[27px] shrink-0 rounded-full border transition-colors duration-300 ${
                    on
                      ? 'border-flare bg-flare/15'
                      : past
                        ? 'border-flare/45 bg-ink'
                        : 'border-paper/20 bg-ink group-hover:border-paper/50'
                  }`}
                >
                  {on && auto ? (
                    <span
                      key={`${active}-${tick}`}
                      aria-hidden="true"
                      className="absolute inset-[-5px] rounded-full border border-flare/40 motion-safe:animate-[ping_8s_linear_1]"
                    />
                  ) : null}
                  <span
                    className={`mx-auto mt-[9px] block h-[7px] w-[7px] rounded-full transition-colors duration-300 ${
                      on
                        ? 'bg-flare'
                        : past
                          ? 'bg-flare/50'
                          : 'bg-paper/25 group-hover:bg-paper/55'
                    }`}
                  />
                </span>

                {/*
                  `md:contents` drops this wrapper on desktop so the three lines
                  stack under the dot exactly as before. On mobile it is the
                  second column of the row.
                */}
                <span className="block min-w-0 md:contents">
                  <span className="flex items-baseline gap-3 md:mt-4 md:block">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-flare/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-[15px] transition-colors duration-300 md:mt-1 md:block ${
                        on ? 'text-paper' : 'text-haze group-hover:text-paper/80'
                      }`}
                    >
                      {s.short}
                    </span>
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] tracking-[0.1em] text-haze/45">
                    {s.place}
                  </span>
                </span>
                <span className="sr-only">{s.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      <p className="mt-7 font-mono text-[10px] uppercase leading-[1.7] tracking-[0.16em] text-haze/45">
        {auto ? (
          <>
            <span className="md:hidden">{CORRIDOR.autoHint}</span>
            <span className="hidden md:inline">{CORRIDOR.autoHintWide}</span>
          </>
        ) : (
          `Stage ${active + 1} of ${STAGES.length}`
        )}
      </p>

      <div
        role="tabpanel"
        aria-live="polite"
        className="mt-7 grid gap-8 border-t border-paper/10 pt-8 md:mt-6 md:grid-cols-[1.35fr_1fr] md:gap-16 md:pt-10"
      >
        <div key={stage.id} className="motion-safe:animate-riseIn">
          <h3 className="max-w-[22ch] text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.15] tracking-[-0.01em] text-paper">
            {stage.title}
          </h3>
          <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.75] text-haze">{stage.body}</p>
        </div>

        <dl key={`${stage.id}-specs`} className="self-start border-l border-flare/30 pl-6 motion-safe:animate-riseIn">
          {stage.rows.map(([k, v]) => (
            <div key={k} className="border-b border-paper/10 py-3 last:border-b-0">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-haze/55">{k}</dt>
              <dd className="mt-1.5 font-mono text-[13px] text-paper/90">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
