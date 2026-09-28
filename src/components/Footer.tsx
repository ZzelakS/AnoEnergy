import Link from 'next/link'
import BrandSeal from './BrandSeal'
import { BRAND, BUILT_BY, FOUNDATION, NAV, PARENT, whatsappHref } from '@/config/site'

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-paper/10 bg-ink py-16 text-paper">
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-[1.25fr_.85fr_.85fr_.85fr]">
        <div>
          <BrandSeal className="h-[92px] w-[150px]" />
          <p className="mt-5 max-w-[38ch] text-[14px] leading-[1.8] text-haze/78">
            Energy systems designed for the site, supplied through controlled global procurement, and supported after handover.
          </p>
        </div>

        <div>
          <p className="micro-label text-flare">Contact</p>
          <ul className="mt-5 grid gap-3">
            <li>
              <a href={`mailto:${BRAND.email}`} className="underline-grow inline-block break-all text-[14px] font-medium text-paper/88 transition-colors hover:text-flare">
                {BRAND.email}
              </a>
            </li>
            <li className="max-w-[28ch] text-[14px] leading-6 text-haze/72">{BRAND.address}</li>
            <li className="text-[13px] text-haze/55">{BRAND.replyWindow}</li>
          </ul>
        </div>

        <div>
          <p className="micro-label text-flare">Pages</p>
          <ul className="mt-5 grid gap-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline-grow inline-block text-[14px] text-haze/78 transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="micro-label text-flare">Group</p>
          <ul className="mt-5 grid gap-3">
            <li><a href={PARENT.url} className="underline-grow inline-block text-[14px] text-haze/78 transition-colors hover:text-paper">{PARENT.name}</a></li>
            <li><a href={FOUNDATION.url} className="underline-grow inline-block text-[14px] text-haze/78 transition-colors hover:text-paper">{FOUNDATION.name}</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-4 border-t border-paper/10 px-6 pt-7 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-haze/52">
          © {new Date().getFullYear()} {BRAND.name}. An Ano Global Holdings company. All rights reserved.{' '}
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="font-bold text-flare transition-colors hover:underline">{BUILT_BY.name}</a>
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-haze/52">{BRAND.base}</p>
      </div>
    </footer>
  )
}
