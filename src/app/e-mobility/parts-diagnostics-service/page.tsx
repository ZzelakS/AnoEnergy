import type { Metadata } from 'next'
import CorporatePage from '@/components/CorporatePage'

export const metadata: Metadata = {
  title: 'Parts, Diagnostics & Service | E-Mobility | Ano Energy',
  description: 'Electric-vehicle spare parts, battery and controller support, diagnostics and technician capability planned with fleet deployment.',
}

export default function Page() {
  return (
    <CorporatePage
      eyebrow="E-Mobility · Parts, Diagnostics & Service"
      title="A fleet is only useful while it can be kept in service."
      sections={[
        {
          heading: 'Aftermarket from the start',
          body: ['Spare packs, controllers, charging hardware and service parts are treated as deployment requirements, not as a later procurement problem. The parts list follows the fleet that was actually supplied.'],
          blocks: [
            { title: 'Parts inventory', body: 'Critical service parts and consumables can be consolidated with the initial vehicle or charging order.' },
            { title: 'Diagnostics', body: 'Diagnostic capability is planned around the supplied platform so faults can be identified without waiting for an overseas visit.' },
            { title: 'Technician capability', body: 'Handover includes the information and practical support needed by the local team that will maintain the fleet and charging equipment.' },
            { title: 'Service continuity', body: 'The objective is to shorten the path from fault to return-to-service by preparing the parts and knowledge before they are needed.' },
          ],
        },
      ]}
      links={[
        { label: 'Vehicles & Fleet', href: '/e-mobility/vehicles-fleet' },
        { label: 'Charging Infrastructure', href: '/e-mobility/charging-infrastructure' },
        { label: 'Discuss fleet & mobility', href: '/contact?enquiry=fleet-mobility' },
      ]}
    />
  )
}
