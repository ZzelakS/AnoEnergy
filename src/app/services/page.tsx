import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Energy & Mobility Solutions | Ano Energy',
  description: 'Choose between Solar & Storage and E-Mobility. Each capability now has its own dedicated section.',
}

const capabilities = [
  {
    title: 'Solar & Storage',
    body: 'On-grid and off-grid generation, battery storage, distribution, protection, monitoring and aftermarket support.',
    href: '/solar-and-storage',
  },
  {
    title: 'E-Mobility',
    body: 'Vehicles and fleet, charging infrastructure, parts, diagnostics and service support.',
    href: '/e-mobility',
  },
]

export default function ServicesPage() {
  return (
    <main className="impact-surface min-h-screen pt-[78px]">
      <section className="section-dark pb-24 pt-28 text-white md:pb-32 md:pt-36">
        <div className="shell relative z-10">
          <p className="eyebrow">Capabilities</p>
          <h1 className="display mt-7 max-w-[16ch] text-[clamp(2.7rem,6vw,5.2rem)] font-semibold leading-[.96] tracking-[-.035em]">Two distinct systems. One operating model.</h1>
          <p className="mt-7 max-w-[64ch] text-[17px] leading-8 text-white/72">Solar & Storage and E-Mobility are now separated so each can be read as a complete capability. System Design wraps both.</p>
        </div>
      </section>
      <section className="quiet-grid py-20 md:py-28">
        <div className="shell grid gap-px md:grid-cols-2 impact-gridline">
          {capabilities.map((c, i) => (
            <Link key={c.href} href={c.href} className="impact-card energy-line p-8 md:p-12">
              <span className="micro-label impact-kicker">0{i + 1}</span>
              <h2 className="display impact-heading mt-4 text-3xl font-semibold">{c.title}</h2>
              <p className="corporate-copy mt-5 max-w-[48ch]">{c.body}</p>
              <span className="impact-heading mt-8 inline-block border-b border-[rgb(var(--gold-line))] pb-1 text-sm font-medium">Explore →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
