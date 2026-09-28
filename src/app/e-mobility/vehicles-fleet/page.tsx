import type { Metadata } from 'next'
import CorporatePage from '@/components/CorporatePage'

export const metadata: Metadata = {
  title: 'Vehicles & Fleet | E-Mobility | Ano Energy',
  description: 'Electric passenger, light-commercial, two- and three-wheeler fleet sourcing with charging, spares and deployment coordinated end to end.',
}

export default function Page() {
  return (
    <CorporatePage
      eyebrow="E-Mobility · Vehicles & Fleet"
      title="Source the fleet with the infrastructure it needs."
      sections={[
        {
          heading: 'Vehicle supply',
          body: ['Battery-electric passenger and light-commercial vehicles, electric bikes, scooters and three-wheelers sourced from manufacturers against the intended duty cycle and market requirements.'],
          blocks: [
            { title: 'Passenger & light commercial', body: 'Passenger cars, vans and light-commercial configurations sourced with the market paperwork and charging hardware required for deployment.' },
            { title: 'Two & three wheelers', body: 'Cargo, delivery and passenger configurations for commercial riders and last-mile fleets, with spare batteries, controllers and workshop requirements planned with the order.' },
          ],
        },
        {
          heading: 'Deployment',
          body: ['Sourcing, freight, customs and last-mile deployment are coordinated as one procurement path. Charging equipment and service parts can move with the same programme instead of arriving as separate dependencies.'],
        },
      ]}
      links={[
        { label: 'Charging Infrastructure', href: '/e-mobility/charging-infrastructure' },
        { label: 'Parts, Diagnostics & Service', href: '/e-mobility/parts-diagnostics-service' },
        { label: 'Discuss fleet & mobility', href: '/contact?enquiry=fleet-mobility' },
      ]}
    />
  )
}
