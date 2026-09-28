import type { Metadata } from 'next'
import CorporatePage from '@/components/CorporatePage'

export const metadata: Metadata = {
  title: 'E-Mobility | Ano Energy',
  description: 'Electric vehicles, fleet supply, charging infrastructure, parts, diagnostics and service support coordinated with the power system behind them.',
  openGraph: { images: ['/og/e-mobility.png'] },
}

const pillars = [
  ['Vehicles & fleet', 'Electric passenger, light-commercial, two- and three-wheeler vehicles sourced with the market paperwork, charging hardware and service parts that belong with the fleet.'],
  ['Charging infrastructure', 'AC and DC charging for homes, estates, workplaces and fleet depots, planned against the site load and the generation or storage available behind it.'],
  ['Parts, diagnostics & service', 'Spare packs, controllers, charging hardware and service parts supplied alongside the fleet, with diagnostic capability and technician support considered before deployment.'],
].map(([title, body]) => ({ title, body }))

export default function EMobilityPage() {
  return (
    <CorporatePage
      eyebrow="E-Mobility"
      title="Vehicles, charging and service planned together."
      intro={[
        'Electric mobility is not a vehicle purchase in isolation. The fleet, charging load, site power, spares and service model have to work as one system.',
      ]}
      sections={[
        {
          heading: 'Three connected workstreams',
          blocks: pillars,
        },
        {
          heading: 'Fleet and site together',
          body: [
            'Charging is a site load. We plan it alongside the building, depot or estate infrastructure so the charging requirement does not become an afterthought after the vehicles arrive.',
            'Where solar generation and storage are in scope, charging infrastructure is coordinated with the same site design rather than treated as a separate procurement.',
          ],
        },
        {
          heading: 'Delivered',
          body: [
            'In Lagos we executed a client procurement mandate for 50 electric vehicles, sourced in China, cleared through customs, and deployed into service with private estate security operations. A complete sourcing-to-deployment cycle, delivered for an estate operator.',
          ],
        },
      ]}
      links={[
        { label: 'Vehicles & Fleet', href: '/e-mobility/vehicles-fleet' },
        { label: 'Parts, Diagnostics & Service', href: '/e-mobility/parts-diagnostics-service' },
        { label: 'Charging Infrastructure', href: '/e-mobility/charging-infrastructure' },
        { label: 'Discuss fleet & mobility', href: '/contact?enquiry=fleet-mobility' },
      ]}
    />
  )
}
