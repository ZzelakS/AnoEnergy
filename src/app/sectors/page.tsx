import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sectors | Ano Energy',
  description: 'Energy system design, supply and long-term support for agriculture, estates, commercial and industrial sites, critical infrastructure, mobility and development programmes.',
}

const sectors = [
  ['Agriculture & Agribusiness','Irrigation, cold chain, processing and distributed farm loads designed around seasonal operating windows.','/sectors/agriculture','SDG 2 · SDG 7 · SDG 8'],
  ['Estates & Real Estate Development','Masterplan energy concepts, common-services power, reticulation, phased capacity and EV provision.','/sectors/estates','SDG 7 · SDG 13'],
  ['Commercial & Industrial','Solar generation, storage and distribution for facilities where power cost and uptime shape operating margin.','/solar-and-storage','SDG 7 · SDG 9 · SDG 13'],
  ['Critical Infrastructure','Resilient supply architectures for essential loads where service continuity is a design constraint, not an afterthought.','/solar-and-storage','SDG 7'],
  ['Transport & Logistics','Fleet electrification, charging infrastructure, depots and the power systems that support mobility operations.','/e-mobility','SDG 13'],
  ['Public & Development Programmes','Procurement, implementation support and systems designed for accountable deployment across distributed sites.','/contact','SDG 7 · SDG 8 · SDG 13'],
]

export default function Page() {
  return (
    <main className="impact-surface">
      <section className="section-dark pb-24 pt-40 text-white md:pb-28 md:pt-48">
        <div className="shell relative z-10">
          <p className="eyebrow">Sectors</p>
          <h1 className="display mt-7 max-w-[16ch] text-[clamp(2.7rem,6vw,5.4rem)] font-semibold leading-[.96] tracking-[-.035em]">One technical discipline. Different load profiles.</h1>
          <p className="mt-7 max-w-[68ch] text-[17px] leading-8 text-white/72">Agriculture and estate development are the strongest proof cases for the same operating model: design the site, supply what the design requires, then sustain the system after handover.</p>
        </div>
      </section>
      <section className="quiet-grid py-20 md:py-28">
        <div className="shell">
          <div className="impact-gridline grid gap-px md:grid-cols-2">
            {sectors.map(([name, body, href, impact], i) => (
              <Link key={name} href={href} className="impact-card energy-line p-8 md:p-10">
                <span className="micro-label impact-kicker">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="display impact-heading mt-4 text-2xl font-semibold">{name}</h2>
                <p className="corporate-copy mt-4 max-w-[54ch]">{body}</p>
                <p className="micro-label impact-kicker mt-7">{impact}</p>
                <span className="impact-heading mt-7 inline-block border-b border-[rgb(var(--gold-line))] pb-1 text-sm font-semibold">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
