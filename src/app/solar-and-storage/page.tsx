import type { Metadata } from 'next'
import CorporatePage from '@/components/CorporatePage'

export const metadata: Metadata = {
  title: 'Solar & Storage | Ano Energy',
  description: 'On-grid and off-grid solar generation, energy storage, distribution and service support designed around site loads and operating conditions.',
  openGraph: { images: ['/og/solar-storage.png'] },
}

const onGrid = [
  ['Generation', 'High-efficiency solar modules specified against the site, roof or ground conditions and required generation profile.'],
  ['Conversion', 'String or central inverter architecture selected around layout, operating range, maintainability and expansion.'],
  ['Distribution', 'Switchgear, protection, metering, transformers and cable routes treated as part of the system rather than accessories.'],
  ['Monitoring', 'System visibility and metering planned so operating performance can be checked against the design.'],
].map(([title, body]) => ({ title, body }))

const offGrid = [
  ['Storage', 'LiFePO₄ storage in rack or container formats, sized against the loads that have to run when generation is unavailable.'],
  ['Hybrid power', 'Hybrid inverters and charge control coordinated with generation, storage and any existing generator or grid connection.'],
  ['Productive loads', 'Pumps, refrigeration, processing, lighting and other site loads sized from how and when they actually operate.'],
  ['Phased expansion', 'Architecture prepared for additional array or storage later so growth does not force a redesign of the whole system.'],
].map(([title, body]) => ({ title, body }))

export default function SolarStoragePage() {
  return (
    <CorporatePage
      eyebrow="Solar & Storage"
      title="Generation and storage designed as one operating system."
      intro={[
        'Grid-connected and standalone solar systems are only as useful as the loads, distribution, storage and service plan around them. We start with the site and then specify the equipment.',
      ]}
      sections={[
        {
          heading: 'On-grid solar',
          body: ['Complete grid-connected solar systems for commercial and industrial applications with monitoring and optimization planned into the system.'],
          blocks: onGrid,
        },
        {
          heading: 'Off-grid solar & storage',
          body: ['Standalone and hybrid solar power systems for sites that need reliable energy independence, with storage sized around real operating windows rather than a catalogue bundle.'],
          blocks: offGrid,
        },
        {
          heading: 'Module-level architecture',
          body: [
            'Panel-level conversion helps hold output under shading and soiling mismatch, isolates faults instead of taking a whole array offline, and supports phased expansion without redesigning the system.',
            'That matters most on distributed sites — farms, estates and facilities where roof directions, shading, dust, maintenance access and future growth are rarely uniform.',
          ],
        },
        {
          heading: 'Supply and aftermarket',
          body: [
            'Direct manufacturer relationships, sourcing, freight, customs and deployment sit behind the equipment specification. After handover, parts inventory, diagnostics and local technical capability are treated as part of the operating model.',
          ],
        },
      ]}
      list={{
        heading: 'What we supply',
        items: [
          'Solar modules and mounting systems',
          'String, central and hybrid inverter systems',
          'LiFePO₄ battery storage and battery enclosures',
          'Switchgear, protection, metering and transformers',
          'Cabling, balance-of-system hardware and spares',
          'Monitoring, commissioning and handover support',
        ],
      }}
      links={[
        { label: 'How we design systems', href: '/system-design' },
        { label: 'Agriculture & Agribusiness', href: '/sectors/agriculture' },
        { label: 'Discuss a site', href: '/contact?enquiry=system-design' },
      ]}
    />
  )
}
