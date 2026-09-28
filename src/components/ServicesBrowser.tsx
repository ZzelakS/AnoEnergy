'use client'

import { useMemo, useState } from 'react'
import Magnetic from './Magnetic'
import Media from './Media'
import { useAurora } from './AuroraContext'
import { SERVICES, SERVICES_PAGE as P } from '@/config/content'
import { mailtoHref } from '@/config/site'

/**
 * Every published service, filterable by category and sector with a live count.
 * Selecting a filter surges the aurora, so the sky acknowledges the change the
 * same way the count does.
 */
export default function ServicesBrowser() {
  const [category, setCategory] = useState<string>('All')
  const [sector, setSector] = useState<string>('All')
  const { surge, setCharge } = useAurora()

  const visible = useMemo(
    () =>
      SERVICES.filter(
        (s) =>
          (category === 'All' || s.category === category) &&
          (sector === 'All' || s.sector === sector),
      ),
    [category, sector],
  )

  const dirty = category !== 'All' || sector !== 'All'

  const pill = (active: boolean) =>
    `border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-[background-color,border-color,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      active
        ? 'border-flare bg-flare text-ink'
        : 'border-paper/20 text-haze hover:border-paper/50 hover:text-paper'
    }`

  const pick = (fn: () => void) => {
    fn()
    surge(0.35)
  }


  return (
    <>
      <div className="pad-card-tight grid gap-5 border-y border-paper/10 bg-ink/70 backdrop-blur-md">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-flare">
            {P.filterLabel}
          </p>
          <p
            aria-live="polite"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-haze"
          >
            {visible.length} {visible.length === 1 ? 'service' : 'services'}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[100px_minmax(0,1fr)] sm:items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-haze/55">
            {P.categoryLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {P.categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => pick(() => setCategory(c))}
                className={pill(category === c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[100px_minmax(0,1fr)] sm:items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-haze/55">
            {P.sectorLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {P.sectors.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={sector === s}
                onClick={() => pick(() => setSector(s))}
                className={pill(sector === s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {dirty ? (
          <button
            type="button"
            onClick={() =>
              pick(() => {
                setCategory('All')
                setSector('All')
              })
            }
            className="underline-grow justify-self-start border-b border-paper/25 pb-1 text-[13px] text-paper transition-colors duration-500 hover:text-flare"
          >
            {P.clearCta}
          </button>
        ) : null}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-haze">{P.emptyBody}</p>
      ) : (
        <div className="mt-px grid gap-px bg-paper/10 lg:grid-cols-2">
          {visible.map((item) => (
            <article
              key={item.title}
              onMouseEnter={() => setCharge(0.2)}
              onMouseLeave={() => setCharge(0)}
              className="card pad-card group grid h-full content-start gap-4"
            >
              <Media
                media={item.image}
                ratio="16/9"
                sizes="(min-width: 1024px) 560px, 100vw"
                className="mb-2"
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="border border-flare/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-flare">
                  {item.category}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-haze/55">
                  {item.sector}
                </span>
              </div>

              <h3 className="display text-[18px] font-semibold tracking-[-0.01em] text-paper">
                {item.title}
              </h3>
              <p className="text-[15px] leading-[1.7] text-haze">{item.body}</p>

              <div className="mt-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-haze/55">
                  {P.featuresLabel}
                </p>
                <ul className="mt-3 grid gap-2">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[14px] text-haze">
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-[2px] w-4 flex-none origin-left bg-flare/80 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-x-150"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <Magnetic href={mailtoHref(`Quote request: ${item.title}`)} variant="ghost">
                  {P.quoteCta}
                </Magnetic>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
