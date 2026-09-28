/**
 * EVERY IMAGE ON THE SITE IS LISTED HERE.
 *
 * To swap artwork, drop your file into `public/images/...` over the placeholder
 * of the same name and you are done. Nothing else needs editing. To point at a
 * different filename, change `src` on the entry below.
 *
 * Placeholders shipped with the build are dark plates in the brand palette with
 * a REPLACE label on them, so an unfilled slot looks deliberate rather than
 * broken, and is obvious in review.
 *
 * Sizes: card art is 4:3 at 960×720, banner art is 16:9 at 1600×900. Supply at
 * least those dimensions so Next can serve retina crops.
 *
 * Write real alt text when you replace a file. Alt describes what is in the
 * photograph, not what the section is about. If an image is purely decorative,
 * set `alt` to an empty string and it will be hidden from screen readers.
 */

export type Media = {
  src: string
  alt: string
  /** Focal point, so crops keep the subject in frame. CSS object-position. */
  focus?: string
}

export const IMAGES = {
  hero: {
    src: '/images/hero/consignment.jpg',
    alt: '',
  },

  lines: {
    'on-grid': { src: '/images/lines/on-grid.jpg', alt: '' },
    'off-grid': { src: '/images/lines/off-grid.jpg', alt: '' },
    'e-mobility': { src: '/images/lines/e-mobility.jpg', alt: '' },
    merchandise: { src: '/images/lines/merchandise.jpg', alt: '' },
    advisory: { src: '/images/lines/advisory.jpg', alt: '' },
  },

  sectors: {
    fishery: { src: '/images/sectors/fishery.jpg', alt: '' },
    agricultural: { src: '/images/sectors/agricultural.jpg', alt: '' },
    health: { src: '/images/sectors/health.jpg', alt: '' },
    mobility: { src: '/images/sectors/mobility.jpg', alt: '' },
  },

  services: {
    'on-grid': { src: '/images/services/on-grid.jpg', alt: '' },
    'off-grid': { src: '/images/services/off-grid.jpg', alt: '' },
    advisory: { src: '/images/services/advisory.jpg', alt: '' },
    'ev-charger': { src: '/images/services/ev-charger.jpg', alt: '' },
    'ev-car': { src: '/images/services/ev-car.jpg', alt: '' },
    'ev-bike': { src: '/images/services/ev-bike.jpg', alt: '' },
    'ev-swap': { src: '/images/services/ev-swap.jpg', alt: '' },
    merch: { src: '/images/services/merch.jpg', alt: '' },
  },

  corridor: {
    factory: { src: '/images/corridor/factory.jpg', alt: '' },
    port: { src: '/images/corridor/port.jpg', alt: '' },
  },

  /** Social card. 1200×630. */
  og: { src: '/images/og/cover.jpg', alt: 'AnoEnergy' },
} as const

export type LineImageKey = keyof typeof IMAGES.lines
export type SectorImageKey = keyof typeof IMAGES.sectors
export type ServiceImageKey = keyof typeof IMAGES.services
