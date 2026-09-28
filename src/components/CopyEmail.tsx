'use client'

import { useState } from 'react'
import { BRAND } from '@/config/site'

export default function CopyEmail() {
  const [state, setState] = useState<'idle' | 'done' | 'failed'>('idle')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(BRAND.email)
      setState('done')
    } catch {
      setState('failed')
    }
    window.setTimeout(() => setState('idle'), 2200)
  }

  return (
    <button type="button" onClick={copy} className="impact-button inline-flex items-center gap-3 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em]">
      <span aria-live="polite">{state === 'done' ? 'Copied' : state === 'failed' ? 'Select it manually' : 'Copy address'}</span>
    </button>
  )
}
