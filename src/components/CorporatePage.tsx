import Link from 'next/link'
import BrandSeal from './BrandSeal'

type Block = { title: string; body: string }
type Section = { heading: string; body?: string[]; blocks?: Block[] }
type Props = {
  eyebrow: string
  title: string
  intro?: string[]
  sections: Section[]
  pullout?: { heading: string; body: string[] }
  list?: { heading: string; items: string[] }
  links?: { label: string; href: string }[]
  impact?: string
}

export default function CorporatePage({ eyebrow, title, intro, sections, pullout, list, links, impact }: Props) {
  return (
    <main className="impact-surface">
      <section className="section-dark relative overflow-hidden pb-24 pt-40 text-white md:pb-32 md:pt-48">
        <div className="shell relative z-10 grid items-end gap-12 lg:grid-cols-[1fr_300px]">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display mt-7 max-w-[18ch] text-[clamp(2.7rem,6vw,5.6rem)] font-semibold leading-[.96] tracking-[-.035em]">
              {title}
            </h1>
            {intro?.map((x) => (
              <p key={x} className="mt-7 max-w-[70ch] text-[17px] leading-[1.8] text-white/74">{x}</p>
            ))}
          </div>

          <aside className="hidden lg:block">
            <div className="institutional-panel energy-line relative aspect-[1/1.05] p-8">
              <BrandSeal className="absolute right-6 top-5 h-28 w-40 opacity-95" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="micro-label text-flare">Design · Supply · Sustain</p>
                <div className="mt-5 h-px bg-white/15" />
                <p className="mt-5 max-w-[24ch] text-sm leading-6 text-white/62">
                  Infrastructure designed for the site, supplied through a controlled corridor, and supported after handover.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="quiet-grid">
        <div className="shell py-20 md:py-28">
          {sections.map((s, i) => (
            <section key={s.heading} className={i ? 'impact-divider mt-20 border-t pt-16' : ''}>
              <div className="grid gap-8 lg:grid-cols-[230px_1fr] lg:gap-16">
                <div>
                  <p className="micro-label impact-kicker">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="display impact-heading mt-3 text-[clamp(1.75rem,3.5vw,3rem)] font-semibold leading-[1.04]">
                    {s.heading}
                  </h2>
                  <div className="gold-rule" />
                </div>

                <div>
                  {s.body?.map((x) => (
                    <p key={x} className="corporate-copy mb-6 max-w-[78ch] text-[16px] last:mb-0">{x}</p>
                  ))}

                  {s.blocks ? (
                    <div className="impact-gridline grid gap-px sm:grid-cols-2">
                      {s.blocks.map((b, j) => (
                        <article key={b.title} className="impact-card energy-line p-7 md:p-9">
                          <span className="micro-label impact-kicker">{String(j + 1).padStart(2, '0')}</span>
                          <h3 className="impact-card-title mt-4 text-[19px] font-semibold">{b.title}</h3>
                          <p className="corporate-copy mt-3 text-[15px]">{b.body}</p>
                        </article>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          ))}

          {pullout ? (
            <aside className="impact-surface-soft my-20 border-l-2 border-[rgb(var(--gold-line))] p-8 md:p-12">
              <p className="micro-label impact-kicker">Operational principle</p>
              <h2 className="display impact-heading mt-4 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold">{pullout.heading}</h2>
              {pullout.body.map((x) => <p key={x} className="corporate-copy mt-5 max-w-[78ch]">{x}</p>)}
            </aside>
          ) : null}

          {list ? (
            <section className="mt-20">
              <h2 className="display impact-heading text-3xl font-semibold">{list.heading}</h2>
              <div className="gold-rule" />
              <ul className="impact-gridline mt-8 grid gap-px md:grid-cols-2">
                {list.items.map((x, i) => (
                  <li key={x} className="impact-card p-6 leading-7">
                    <span className="micro-label impact-kicker mr-3">{String(i + 1).padStart(2, '0')}</span>
                    {x}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {(links || impact) ? (
            <section className="impact-divider mt-20 border-t pt-10">
              <div className="flex flex-wrap gap-3">
                {links?.map((x) => (
                  <Link key={x.label} href={x.href} className="impact-button px-5 py-3 text-sm font-medium">
                    {x.label} →
                  </Link>
                ))}
              </div>
              {impact ? <p className="micro-label impact-kicker mt-7">{impact}</p> : null}
            </section>
          ) : null}
        </div>
      </div>
    </main>
  )
}
