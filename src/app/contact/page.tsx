import type { Metadata } from 'next'
import BriefBuilder from '@/components/BriefBuilder'
import CopyEmail from '@/components/CopyEmail'
import { CONTACT_PAGE as P } from '@/config/content'
import { BRAND } from '@/config/site'

export const metadata: Metadata = {
  title: P.heading,
  description: P.lede,
}

export default function ContactPage() {
  return (
    <main className="impact-surface">
      <section className="section-dark pb-24 pt-40 text-white md:pb-32 md:pt-48">
        <div className="shell relative z-10">
          <p className="eyebrow">Contact</p>
          <h1 className="display mt-7 max-w-[16ch] text-[clamp(2.7rem,6vw,5.4rem)] font-semibold leading-[.96] tracking-[-.035em]">{P.heading}</h1>
          <p className="mt-7 max-w-[58ch] text-[17px] leading-8 text-white/72">{P.lede}</p>
          <a href={`mailto:${BRAND.email}`} className="mt-8 inline-block border-b border-flare/70 pb-1 text-[15px] font-semibold text-paper transition hover:text-flare">{BRAND.email}</a>
        </div>
      </section>

      <section className="quiet-grid py-20 md:py-28">
        <div className="shell">
          <div className="impact-gridline grid gap-px md:grid-cols-2">
            <div className="impact-card p-8 md:p-10">
              <p className="micro-label impact-kicker">Email</p>
              <a href={`mailto:${BRAND.email}`} className="impact-heading mt-4 block break-all text-[clamp(1rem,1rem+0.45vw,1.25rem)] font-semibold">{BRAND.email}</a>
              <p className="corporate-copy mt-3 text-[14px]">{BRAND.replyWindow}</p>
              <div className="mt-5"><CopyEmail /></div>
            </div>
            <div className="impact-card p-8 md:p-10">
              <p className="micro-label impact-kicker">Offices</p>
              <p className="corporate-copy mt-4 max-w-[46ch] text-[15px]">{P.body}</p>
              <p className="micro-label impact-kicker mt-5">{BRAND.address}</p>
            </div>
          </div>

          <section className="impact-divider mt-24 border-t pt-16">
            <p className="micro-label impact-kicker">{P.formHeading}</p>
            <h2 className="display impact-heading mt-5 max-w-[20ch] text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.02em]">Send us the load, the port and the deadline.</h2>
            <p className="corporate-copy mt-6 max-w-[58ch] text-[15px]">{P.formBody}</p>
            <div className="mt-12"><BriefBuilder /></div>
          </section>

          <section className="impact-divider mt-24 border-t pt-14">
            <p className="micro-label impact-kicker">{P.officesHeading}</p>
            <p className="corporate-copy mt-5 max-w-[56ch] text-[15px]">{P.officesLede}</p>
            <div className="impact-gridline mt-10 grid gap-px md:grid-cols-2">
              {P.offices.map((o) => (
                <div key={o.title} className="impact-card p-8 md:p-10">
                  <h3 className="display impact-heading text-[20px] font-semibold">{o.title}</h3>
                  <p className="corporate-copy mt-4 text-[15px]">{o.body}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
