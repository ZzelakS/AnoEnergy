'use client'

import Link from 'next/link'
import { useCallback, useRef } from 'react'
import { useAurora } from './AuroraContext'

/**
 * A button that leans toward the cursor and charges the aurora while hovered.
 * Pressing it fires a surge from the button's own position, so the sky reacts to
 * where you actually clicked rather than to the middle of the screen.
 */
export default function Magnetic({
  href,
  children,
  variant = 'solid',
  external = false,
  className = '',
}: {
  href: string
  children: React.ReactNode
  variant?: 'solid' | 'ghost'
  external?: boolean
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement | null>(null)
  const { setCharge, surge } = useAurora()

  const move = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height
    el.style.transform = `translate(${dx * 5}px, ${dy * 3}px)`
  }, [])

  const reset = useCallback(() => {
    const el = ref.current
    if (el) el.style.transform = ''
    setCharge(0)
  }, [setCharge])

  const onDown = useCallback(() => {
    const r = ref.current?.getBoundingClientRect()
    surge(r ? (r.left + r.width / 2) / window.innerWidth : 0.5)
  }, [surge])

  // the lean is deliberately small; the sky acknowledges the hover, it doesn't perform

  const base =
    'group relative isolate inline-flex items-center gap-3 overflow-hidden px-7 py-4 text-[14px] font-medium transition-[color,border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform'
  const look =
    variant === 'solid'
      ? 'bg-flare text-ink hover:text-ink'
      : 'border border-paper/25 text-paper hover:border-flare/60 hover:text-flare'

  const inner = (
    <>
      {/* the fill wipes up from the floor rather than snapping between colours */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 ${
          variant === 'solid' ? 'bg-paper' : 'bg-flare/10'
        }`}
      />
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
      >
        →
      </span>
    </>
  )

  const shared = {
    ref,
    className: `${base} ${look} ${className}`,
    onMouseMove: move,
    onMouseEnter: () => setCharge(0.35),
    onMouseLeave: reset,
    onPointerDown: onDown,
  }

  if (external || href.startsWith('mailto:') || href.startsWith('http') || href.includes('#')) {
    return (
      <a href={href} {...shared} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} {...shared}>
      {inner}
    </Link>
  )
}
