'use client'

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

/**
 * The aurora is not decoration sitting behind the page, it is something the page
 * drives. Any component can lean it, charge it, or fire a surge through it.
 *
 *   lean    -1 … 1   which way the curtains bend
 *   charge   0 … 1   brightness and ray speed
 *   surge()           sends a bright band travelling across the sky
 *
 * Values are held in refs and read by the render loop, so nudging the field
 * costs no React re-render. `pulseAt` is the timestamp of the last surge.
 */

export type AuroraState = {
  leanRef: React.MutableRefObject<number>
  chargeRef: React.MutableRefObject<number>
  pulseRef: React.MutableRefObject<number>
  pulseXRef: React.MutableRefObject<number>
  setLean: (v: number) => void
  setCharge: (v: number) => void
  surge: (from?: number) => void
  supported: boolean
  setSupported: (v: boolean) => void
}

const Ctx = createContext<AuroraState | null>(null)

export function AuroraProvider({ children }: { children: React.ReactNode }) {
  const leanRef = useRef(0)
  const chargeRef = useRef(0)
  const pulseRef = useRef(-999)
  const pulseXRef = useRef(0.5)
  const [supported, setSupported] = useState(true)

  const setLean = useCallback((v: number) => {
    leanRef.current = Math.max(-1, Math.min(1, v))
  }, [])

  const setCharge = useCallback((v: number) => {
    chargeRef.current = Math.max(0, Math.min(1, v))
  }, [])

  const surge = useCallback((from = 0.5) => {
    pulseXRef.current = Math.max(0, Math.min(1, from))
    pulseRef.current = performance.now() / 1000
  }, [])

  const value = useMemo<AuroraState>(
    () => ({
      leanRef,
      chargeRef,
      pulseRef,
      pulseXRef,
      setLean,
      setCharge,
      surge,
      supported,
      setSupported,
    }),
    [setLean, setCharge, surge, supported],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAurora(): AuroraState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAurora must be used inside <AuroraProvider>')
  return ctx
}
