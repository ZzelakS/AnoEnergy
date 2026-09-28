import Link from 'next/link'
import BrandSeal from '@/components/BrandSeal'
import Corridor from '@/components/Corridor'
import Magnetic from '@/components/Magnetic'
import Media from '@/components/Media'
import Reveal from '@/components/Reveal'
import ScrollRail from '@/components/ScrollRail'
import { ABOUT, BRIEF, CORRIDOR, DERISK, HERO, REACH, SECTORS } from '@/config/content'
import { IMAGES } from '@/config/images'
import { BRAND } from '@/config/site'

const operatingModel = [
  ['Design', 'Load study, concept, site layout, distribution, and specification — before any equipment is quoted.'],
  ['Supply', 'Direct manufacturer relationships, sourcing, freight, customs, and deployment.'],
  ['Sustain', 'Parts held in-country, diagnostic capability, and local technicians trained to service what we install.'],
]

const capabilities = [
  {
    eyebrow: 'Solar & Storage',
    title: 'Generation, storage and distribution as one system.',
    body: 'On-grid and off-grid solar, battery storage, protection, monitoring and balance-of-system hardware specified around the site rather than sold as a catalogue bundle.',
    href: '/solar-and-storage',
    image: IMAGES.lines['on-grid'],
  },
  {
    eyebrow: 'E-Mobility',
    title: 'Vehicles, charging, parts and service planned together.',
    body: 'Electric vehicles and fleets, charging infrastructure, spare parts, diagnostics and service capability coordinated with the power system behind them.',
    href: '/e-mobility',
    image: IMAGES.lines['e-mobility'],
  },
]

export default function Home() {
  return (
    <main>
      <ScrollRail />

      <section id="top" className="section-dark relative min-h-[100svh] overflow-hidden text-white">
        <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-center pb-20 pt-32 md:pt-36">
          <div className="grid gap-14 lg:grid-cols-[1.55fr_.85fr] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow">{BRAND.base} · Energy systems · E-Mobility</p>
              <h1 className="display mt-7 max-w-[13ch] text-[clamp(3rem,7.4vw,6.5rem)] font-semibold leading-[.91] tracking-[-.045em] text-paper">
                Design. Supply. <span className="text-flare">Sustain.</span>
              </h1>
              <p className="mt-8 max-w-[61ch] text-[17px] leading-[1.8] text-white/74 md:text-[18px]">{HERO.live}</p>
              <div className="mt-11 flex flex-wrap items-center gap-5">
                <Magnetic href="/system-design">How we design systems</Magnetic>
                <Link href="/contact" className="underline-grow border-b border-paper/25 pb-1 text-[14px] font-medium text-paper transition-colors hover:text-flare">
                  Discuss a site
                </Link>
              </div>
            </div>

            <aside className="institutional-panel relative min-h-[360px] overflow-hidden p-8 md:p-10">
              <BrandSeal className="h-[132px] w-[210px]" />
              <div className="mt-12 border-t border-white/12 pt-7">
                <p className="micro-label text-flare">Operating thesis</p>
                <p className="mt-4 max-w-[30ch] text-[16px] leading-7 text-white/75">
                  We design the system for the site it will actually stand on.
                </p>
                <p className="mt-4 max-w-[32ch] text-[14px] leading-6 text-white/55">
                  Design is the front half of the same discipline that governs sourcing, deployment and aftermarket support.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="quiet-grid impact-surface py-24 md:py-32">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-20">
            <Reveal>
              <div>
                <p className="micro-label impact-kicker">About</p>
                <h2 className="display impact-heading mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.02]">{ABOUT.heading}</h2>
                <div className="gold-rule" />
              </div>
            </Reveal>
            <div className="max-w-[74ch]">
              <Reveal><p className="impact-heading mb-6 text-[20px] font-medium leading-[1.65]">We design the system for the site it will actually stand on.</p></Reveal>
              {ABOUT.paras.map((para, i) => (
                <Reveal key={para} delay={i * 60}>
                  <p className="corporate-copy mb-6 text-[16px] last:mb-0 md:text-[17px]">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="lines" className="impact-surface border-t impact-divider py-24 md:py-32">
        <div className="shell">
          <Reveal>
            <p className="micro-label impact-kicker">Core capabilities</p>
            <h2 className="display impact-heading mt-5 max-w-[18ch] text-[clamp(2.35rem,5vw,4.2rem)] font-semibold leading-[.98] tracking-[-.03em]">
              Separate disciplines. One operating standard.
            </h2>
            <div className="gold-rule" />
          </Reveal>

          <div className="impact-gridline mt-14 grid gap-px lg:grid-cols-2">
            {capabilities.map((c, i) => (
              <Reveal key={c.href} delay={i * 80}>
                <Link href={c.href} className="impact-card energy-line block h-full p-6 md:p-8">
                  <Media media={c.image} ratio="16/9" sizes="(min-width:1024px) 560px, 100vw" />
                  <div className="pt-7">
                    <p className="micro-label impact-kicker">{c.eyebrow}</p>
                    <h3 className="display impact-heading mt-4 max-w-[18ch] text-[clamp(1.7rem,3vw,2.5rem)] font-semibold leading-[1.04]">{c.title}</h3>
                    <p className="corporate-copy mt-5 max-w-[56ch] text-[15px]">{c.body}</p>
                    <span className="impact-heading mt-7 inline-block border-b border-[rgb(var(--gold-line))] pb-1 text-sm font-semibold">Explore capability →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="impact-surface-soft mt-px grid gap-8 border-l-2 border-[rgb(var(--gold-line))] p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
              <div>
                <p className="micro-label impact-kicker">System Design</p>
                <h3 className="display impact-heading mt-3 text-2xl font-semibold">The capability that wraps both.</h3>
                <p className="corporate-copy mt-3 max-w-[68ch]">Before equipment is quoted, we establish what the site actually does — which loads run and when, what cannot be allowed to stop, and how the site will grow.</p>
              </div>
              <Link href="/system-design" className="impact-button justify-self-start px-5 py-3 text-sm font-semibold">System Design →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="corridor" className="section-dark relative border-t border-paper/10 py-24 text-white md:py-32">
        <div className="shell relative z-10">
          <Reveal>
            <p className="eyebrow">{CORRIDOR.label}</p>
            <h2 className="display mt-6 max-w-[20ch] text-[clamp(2.25rem,4.8vw,4rem)] font-semibold leading-[1.0] tracking-[-0.03em] text-paper">{CORRIDOR.heading}</h2>
            <p className="mt-6 max-w-[64ch] text-[16px] leading-[1.8] text-haze">{CORRIDOR.lede}</p>
          </Reveal>
          <Corridor />
        </div>
      </section>

      <section className="quiet-grid impact-surface border-t impact-divider py-24 md:py-32">
        <div className="shell">
          <p className="micro-label impact-kicker">Operating model</p>
          <h2 className="display impact-heading mt-5 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1]">How we work</h2>
          <div className="gold-rule" />
          <div className="impact-gridline mt-12 grid gap-px md:grid-cols-3">
            {operatingModel.map(([title, body], i) => (
              <div key={title} className="impact-card p-8 md:p-10">
                <span className="micro-label impact-kicker">0{i + 1}</span>
                <h3 className="impact-card-title mt-4 text-[21px] font-semibold">{title}</h3>
                <p className="corporate-copy mt-4 text-[15px]">{body}</p>
              </div>
            ))}
          </div>
          <Link href="/system-design" className="impact-heading mt-8 inline-block border-b border-[rgb(var(--gold-line))] pb-1 text-sm font-semibold">How we design systems →</Link>
        </div>
      </section>

      <section id="sectors" className="impact-surface border-t impact-divider py-24 md:py-32">
        <div className="shell">
          <Reveal>
            <p className="micro-label impact-kicker">Sectors</p>
            <h2 className="display impact-heading mt-5 max-w-[20ch] text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[1]">{SECTORS.heading}</h2>
            <p className="corporate-copy mt-6 max-w-[64ch] text-[16px]">{SECTORS.lede}</p>
          </Reveal>
          <div className="impact-gridline mt-14 grid gap-px md:grid-cols-2">
            {SECTORS.items.map((s, i) => (
              <Reveal key={s.tag} delay={i * 45}>
                <Link href={s.href} className="impact-card energy-line grid h-full gap-6 p-7 sm:grid-cols-[140px_1fr] md:p-8">
                  <Media media={s.image} ratio="4/3" sizes="140px" />
                  <div>
                    <p className="micro-label impact-kicker">{s.tag}</p>
                    <h3 className="impact-card-title mt-3 text-[19px] font-semibold leading-[1.25]">{s.title}</h3>
                    <p className="corporate-copy mt-3 text-[14px]">{s.body}</p>
                    <span className="impact-heading mt-5 inline-block text-sm font-semibold">{s.live} →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="impact-surface-soft border-t impact-divider py-24 md:py-32">
        <div className="shell grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="micro-label impact-kicker">{DERISK.label}</p>
              <h2 className="display impact-heading mt-5 max-w-[15ch] text-[clamp(2.2rem,4.4vw,3.5rem)] font-semibold leading-[1]">{DERISK.heading}</h2>
              <p className="corporate-copy mt-6 max-w-[46ch] text-[15px]">{DERISK.lede}</p>
            </div>
          </Reveal>
          <div className="impact-divider border-b">
            {DERISK.items.map(([key, value], i) => (
              <Reveal key={key} delay={i * 50}>
                <div className="impact-divider grid grid-cols-[auto_1fr] gap-6 border-t py-7">
                  <span className="micro-label impact-kicker">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="impact-card-title text-[18px] font-semibold">{key}</h3>
                    <p className="corporate-copy mt-2.5 text-[15px]">{value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="partners" className="impact-surface border-t impact-divider py-24 md:py-32">
        <div className="shell">
          <Reveal>
            <p className="micro-label impact-kicker">{REACH.label}</p>
            <h2 className="display impact-heading mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[1]">{REACH.heading}</h2>
            <p className="corporate-copy mt-6 max-w-[60ch] text-[16px]">{REACH.lede}</p>
          </Reveal>
          <div className="impact-gridline mt-12 grid gap-px md:grid-cols-2">
            <div className="impact-card p-8 md:p-10"><h3 className="impact-card-title display text-[22px] font-semibold">{REACH.title}</h3><p className="corporate-copy mt-4 max-w-[48ch]">{REACH.body}</p></div>
            <div className="impact-card p-8 md:p-10"><h3 className="impact-card-title display text-[22px] font-semibold">{REACH.hubsTitle}</h3><p className="corporate-copy mt-4 max-w-[48ch]">{REACH.hubsBody}</p></div>
          </div>
        </div>
      </section>

      <section id="brief" className="section-dark relative border-t border-paper/10 py-24 text-white md:py-36">
        <div className="shell relative z-10">
          <Reveal>
            <p className="eyebrow">{BRIEF.label}</p>
            <h2 className="display mt-6 max-w-[17ch] text-[clamp(2.5rem,5.8vw,4.8rem)] font-semibold leading-[.96] tracking-[-.035em] text-paper">{BRIEF.heading}</h2>
            <p className="mt-7 max-w-[58ch] text-[16px] leading-[1.8] text-haze">{BRIEF.lede}</p>
            <p className="mt-6 max-w-[64ch] text-[15px] leading-7 text-haze/75">If you install, distribute, or service energy or mobility equipment — or you are developing an estate, a farm, or a processing facility that needs power designed and supplied — we want to hear from you.</p>
            <div className="mt-11 flex flex-wrap items-center gap-7">
              <Magnetic href="/contact">Build your brief</Magnetic>
              <a href={`mailto:${BRAND.email}`} className="underline-grow border-b border-paper/25 pb-1 text-sm font-medium text-paper hover:text-flare">{BRAND.email}</a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
