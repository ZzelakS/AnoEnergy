import Image from 'next/image'
import type { Media as MediaType } from '@/config/images'

/**
 * Every image slot on the site renders through this, so the treatment stays
 * consistent: fixed aspect ratio, a tint that sits the photograph inside the
 * palette instead of fighting it, and a hairline edge.
 *
 * Pass `alt=""` for decorative art and it is hidden from screen readers.
 * `priority` only on the one image above the fold.
 */
export default function Media({
  media,
  ratio = '4/3',
  sizes = '(min-width: 1280px) 300px, (min-width: 768px) 45vw, 100vw',
  priority = false,
  className = '',
  rounded = false,
}: {
  media: MediaType
  ratio?: '4/3' | '16/9' | '3/2' | '1/1'
  sizes?: string
  priority?: boolean
  className?: string
  rounded?: boolean
}) {
  const decorative = media.alt.trim() === ''

  return (
    <div
      aria-hidden={decorative || undefined}
      className={`relative overflow-hidden border border-paper/10 bg-deep ${
        rounded ? 'rounded-sm' : ''
      } ${className}`}
      style={{ aspectRatio: ratio.replace('/', ' / ') }}
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: 'cover', objectPosition: media.focus ?? 'center' }}
        className="transition-[transform,filter] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.035] motion-safe:group-hover:brightness-110"
      />
      {/* sits the photograph in the palette rather than letting it shout */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,31,23,0.16)_0%,rgba(9,31,23,0.04)_45%,rgba(9,31,23,0.58)_100%)]"
      />
    </div>
  )
}
