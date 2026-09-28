'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAurora } from './AuroraContext'
import ThemeToggle from './ThemeToggle'
import { BRAND, NAV } from '@/config/site'

function isActive(pathname: string, href: string) {
  if (href.includes('#')) return false

  const base = href.split('#')[0]

  if (!base || base === '/') {
    return pathname === '/'
  }

  return pathname === base || pathname.startsWith(`${base}/`)
}

/**
 * Institutional primary navigation.
 * Desktop retains the dark/glass treatment.
 * Mobile navigation uses theme-aware surfaces,
 * while the hamburger / close icon remains white.
 */
export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  const { setCharge } = useAurora()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 28)
    }

    onScroll()

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
        solid || open
          ? 'border-paper/10 bg-[rgb(var(--nav-bg)/.94)] backdrop-blur-xl'
          : 'border-paper/10 bg-[rgb(var(--nav-bg)/.78)] backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex min-h-[78px] w-full max-w-[1360px] items-center justify-between gap-6 px-6 md:px-10">
        <Link
          href="/"
          className="group flex min-w-fit items-center gap-3"
          aria-label="Ano Energy home"
        >
          <span
            className="h-7 w-px bg-flare/80 transition-all duration-500 group-hover:h-9"
            aria-hidden="true"
          />

          <span className="display text-[20px] font-semibold tracking-[-0.015em] text-paper">
            {BRAND.name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-[clamp(1rem,1.5vw,1.7rem)] lg:flex"
          aria-label="Primary navigation"
        >
          {NAV.slice(1, -1).map((item) => {
            const active = isActive(pathname, item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                aria-current={active ? 'page' : undefined}
                onMouseEnter={() => setCharge(0.13)}
                onMouseLeave={() => setCharge(0)}
                className="nav-link underline-grow py-2 transition-colors duration-300"
              >
                {item.label}
              </Link>
            )
          })}

          <div className="ml-1 flex items-center gap-3 border-l border-paper/15 pl-4">
            <ThemeToggle />

            <Link
              href="/contact"
              className="display border border-paper/30 px-4 py-3 text-[12px] font-semibold tracking-[0.04em] text-paper transition-colors duration-300 hover:border-flare hover:text-flare"
            >
              Contact
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="
              grid
              h-[38px]
              w-[38px]
              place-items-center
              border
              border-paper/20
              text-white
              transition-colors
              duration-300
              hover:border-flare
              hover:text-flare
            "
          >
            <span className="grid gap-[6px]">
              <span
                className={`block h-px w-[18px] bg-current transition-transform duration-300 ${
                  open
                    ? 'translate-y-[3.5px] rotate-45'
                    : ''
                }`}
              />

              <span
                className={`block h-px w-[18px] bg-current transition-transform duration-300 ${
                  open
                    ? '-translate-y-[3.5px] -rotate-45'
                    : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`grid overflow-hidden border-t bg-[rgb(var(--surface-raised)/.985)] backdrop-blur-xl transition-[grid-template-rows,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open
            ? 'grid-rows-[1fr] border-[rgb(var(--surface-border)/.14)]'
            : 'grid-rows-[0fr] border-transparent'
        }`}
      >
        <nav
          className="overflow-hidden"
          aria-label="Mobile navigation"
        >
          <ul className="px-6 pb-8 pt-3">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href)

              return (
                <li
                  key={item.href}
                  className="border-b border-[rgb(var(--surface-border)/.12)] last:border-b-0"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    data-active={active}
                    aria-current={active ? 'page' : undefined}
                    className={`display flex items-center justify-between py-[16px] text-[18px] font-semibold tracking-[-0.015em] transition-colors duration-300 ${
                      active
                        ? 'text-flare'
                        : 'text-[rgb(var(--surface-text))] hover:text-flare'
                    }`}
                  >
                    <span>{item.label}</span>

                    <span
                      aria-hidden="true"
                      className={`font-mono text-[10px] transition-colors ${
                        active
                          ? 'text-flare/70'
                          : 'text-[rgb(var(--surface-muted)/.65)]'
                      }`}
                    >
                      ↗
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}