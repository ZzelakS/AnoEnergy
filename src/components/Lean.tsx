'use client'

import { useEffect, useRef } from 'react'
import { useAurora } from './AuroraContext'

/**
 * Drops into a section and tilts the aurora while that section is the one you
 * are reading. Sections lean in alternating directions so scrolling the page
 * sweeps the curtains across the sky rather than leaving them static.
 */
export default function Lean({ value, charge = 0 }: { value: number; charge?: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { setLean, setCharge } = useAurora()

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLean(value)
          setCharge(charge)
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [charge, setCharge, setLean, value])

  return <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0" />
}
