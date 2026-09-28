/**
 * Identity, domains and attribution. Change anything here and every page
 * follows. Mirrors what is published on anoglobalholdings.com, with AnoEnergy's
 * own domain and contact address per the group's domain plan.
 */

export const BRAND = {
  name: 'ANO ENERGY',
  strap: 'Leading Solar Trading Solutions',
  domain: 'anoenergy.com',
  url: 'https://anoenergy.com',
  email: 'contact@anoenergy.org',
  replyWindow: 'We aim to reply within 24 hours',
  base: 'Hong Kong',
  address: 'Hong Kong | Golden Gate Commercial Bldg',
  hubs: "Southern Africa and the America's",
} as const

export const PARENT = {
  name: 'Ano Global Holdings',
  url: 'https://anoglobalholdings.com',
  email: 'info@anoglobalholdings.com',
} as const

export const FOUNDATION = {
  name: 'Anosike Cares Foundation',
  url: 'https://anocaresfoundation.org',
} as const

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/impact/our-approach', label: 'Impact' },
  { href: '/solar-and-storage', label: 'Solar & Storage' },
  { href: '/e-mobility', label: 'E-Mobility' },
  { href: '/system-design', label: 'System Design' },
  { href: '/sectors', label: 'Sectors' },
  { href: '/#partners', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
] as const

/** Sections the scroll rail tracks on the home page. */
export const RAIL = [
  { id: 'top', label: 'Top' },
  { id: 'corridor', label: 'Corridor' },
  { id: 'lines', label: 'Capabilities' },
  { id: 'sectors', label: 'Sectors' },
  { id: 'partners', label: 'Partners' },
  { id: 'brief', label: 'Brief' },
] as const

/** Developer attribution. Change the number and message here, nowhere else. */
export const BUILT_BY = {
  name: 'Lamar',
  phone: '2349062288078',
  message:
    "Hi Lamar, I saw your work on the AnoEnergy website and I'd like to discuss a project.",
} as const

export const whatsappHref = (
  phone: string = BUILT_BY.phone,
  message: string = BUILT_BY.message,
): string => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

export const mailtoHref = (subject: string, body?: string): string => {
  const params = new URLSearchParams({ subject })
  if (body) params.set('body', body)
  return `mailto:${BRAND.email}?${params.toString()}`
}
