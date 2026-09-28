import type { Metadata } from 'next'
import CorporatePage from '@/components/CorporatePage'

export const metadata: Metadata = {
  title: 'Charging Infrastructure | E-Mobility | Ano Energy',
  description: 'AC and DC electric-vehicle charging infrastructure for estates, workplaces and fleet depots, coordinated with site generation, storage and distribution.',
}

export default function Page() {
  return (
    <CorporatePage
      eyebrow="E-Mobility · Charging Infrastructure"
      title="Charging is a power-system decision."
      intro={['The charger is the visible part. The site load, distribution, protection, metering, generation and storage behind it determine whether the installation works as intended.']}
      sections={[
        {
          heading: 'Where we design for charging',
          blocks: [
            { title: 'Estates & residences', body: 'Resident, common-service and security-fleet charging planned with the estate electrical infrastructure and future occupancy.' },
            { title: 'Workplaces & commercial sites', body: 'Charging positioned against parking use, operating windows and the site demand profile.' },
            { title: 'Fleet depots', body: 'Multi-vehicle charging planned around dwell time, route schedules and the peak demand the site can carry.' },
            { title: 'Solar-backed charging', body: 'Charging coordinated with solar generation and storage where the site needs to reduce grid or generator dependence.' },
          ],
        },
        {
          heading: 'What is included in the design',
          body: ['Charger placement, distribution, cable routes, protection, metering and load management are coordinated with the rest of the site rather than added after the electrical layout is fixed.'],
        },
      ]}
      links={[
        { label: 'System Design', href: '/system-design' },
        { label: 'Estates & Real Estate', href: '/sectors/estates' },
        { label: 'Discuss charging', href: '/contact?enquiry=fleet-mobility' },
      ]}
    />
  )
}
