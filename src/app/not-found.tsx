import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="section-dark grid min-h-[80svh] place-items-center py-32 text-white">
      <div className="shell relative z-10">
        <p className="eyebrow">404</p>
        <h1 className="display mt-6 max-w-[18ch] text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[1] tracking-[-0.03em] text-paper">That page is not on this manifest.</h1>
        <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.8] text-haze">Check the address, or head back and pick up the site from the top.</p>
        <Link href="/" className="mt-10 inline-flex items-center gap-3 border border-flare px-7 py-4 text-[14px] font-semibold text-paper transition-colors hover:bg-flare hover:text-ink">Back to the start <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  )
}
