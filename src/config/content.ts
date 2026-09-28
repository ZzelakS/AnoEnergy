/**
 * ALL PAGE COPY LIVES HERE.
 *
 * Provenance is marked per block:
 *   [LIVE]     verbatim or near-verbatim from anoglobalholdings.com/anoenergy,
 *              /services and /contact. Client spellings kept ("Specialized",
 *              "specializing", "America's").
 *   [WRITTEN]  new copy for this build, in the client's register.
 *   [EV — NEW] the e-mobility line. Not on the live site. Sign it off before launch.
 */

import { BRAND } from './site'
import { IMAGES, type Media } from './images'

/* ─────────────────────────── HERO ─────────────────────────── */

export const HERO = {
  // [LIVE] strap and hero sentence
  strap: BRAND.strap,
  live: 'Solar generation, energy storage, electric vehicles, and the parts, service, and trained technicians that make them last. System design, sourcing, procurement, freight, customs, and last-mile deployment, managed end to end.',

  // [WRITTEN] display headline
  headline: ['Solar, sourced', 'and landed where', 'the grid stops.'],
  ctaPrimary: 'Start a sourcing brief',
  ctaSecondary: 'See how an order moves',

  // [WRITTEN] illustrative manifest, framed as typical
  manifestLabel: 'Typical consignment',
  manifest: [
    ['Modules', '3,240 × 550 Wp'],
    ['Capacity', '1.78 MWp'],
    ['Containers', '6 × 40 HQ'],
    ['Terms', 'CIF Apapa, Lagos'],
    ['Ex-works to site', '62 days'],
  ] as [string, string][],
  manifestNote:
    'Illustrative. Every order is quoted against your load, your port and your deadline.',
  image: IMAGES.hero,
}

/* ─────────────────────────── ABOUT ─────────────────────────── */

// [LIVE] the three About AnoEnergy paragraphs, with the e-mobility clause added
export const ABOUT = {
  heading: 'About AnoEnergy',
  paras: [
    'AnoEnergy is a premier solar trading company specializing in end-to-end solar energy solutions for emerging markets. Our expertise spans the entire supply chain, from strategic sourcing and procurement to supplier relationship management and complex logistics coordination.',
    'We partner with leading manufacturers and suppliers worldwide to deliver high-quality solar products and systems tailored to the unique needs of businesses globally. That now extends to electric mobility, where the same supply chain carries electric cars and bikes, charging and battery hardware, and the general merchandise a fleet or a dealership needs alongside them.',
    'Our comprehensive approach ensures that clients receive not just products, but complete solutions backed by expert advisory services and ongoing support for sustainable energy implementation.',
  ],
}

/* ───────────────────────── CORRIDOR ────────────────────────── */

export type Stage = {
  id: string
  short: string
  place: string
  title: string
  body: string
  rows: [string, string][]
}

// [WRITTEN] the six stages of a consignment. This is the site's signature.
export const CORRIDOR = {
  label: 'The corridor',
  heading: 'Six places an order can go wrong.',
  lede: 'Most energy projects in emerging markets do not fail on the engineering. They fail somewhere between the factory floor and the site. Walk the rail to see what we hold at each stage.',
  autoHint: 'Playing. Tap a stage to take control.',
  autoHintWide: 'Playing. Hover, click, drag or use arrow keys to take control.',
  stages: [
    {
      id: 'source',
      short: 'Source',
      place: 'Jiangsu / Anhui',
      title: 'Shortlist the factories that can actually hold the price',
      body: 'We work from your load profile and budget, not from a catalogue. Three to five bankable suppliers get quoted against the same specification so the comparison is real, and we audit the line before anything is committed.',
      rows: [
        ['Typical window', '5 – 9 days'],
        ['You receive', 'Quote matrix, bankability notes'],
      ],
    },
    {
      id: 'verify',
      short: 'Verify',
      place: 'Factory floor',
      title: 'Prove the hardware matches the datasheet',
      body: 'Flash test reports on the actual production batch, EL imaging for micro-cracks, and a loading check before the container doors close. Storage cells and charger units get capacity-tested. If a batch fails, it does not ship.',
      rows: [
        ['Typical window', '3 – 6 days'],
        ['You receive', 'Flash + EL report, inspection photos'],
      ],
    },
    {
      id: 'consolidate',
      short: 'Consolidate',
      place: 'Shenzhen / Hong Kong',
      title: 'Kit the order so nothing lands half-complete',
      body: 'Modules, inverters, mounting, cable, protection and spares are consolidated into one shipment and packed against a site-level bill of materials. A mini-grid that arrives without its combiner boxes is a stalled project.',
      rows: [
        ['Typical window', '4 – 8 days'],
        ['You receive', 'Packing list by container'],
      ],
    },
    {
      id: 'ship',
      short: 'Ship',
      place: 'Yantian / Hong Kong',
      title: 'Book the leg and cover the cargo',
      body: 'Space booked, marine insurance placed, and terms set to whatever you can carry. FOB if you have your own forwarder, CIF if you want it landed, DDP if you would rather not touch the freight at all.',
      rows: [
        ['Typical window', '22 – 34 days at sea'],
        ['You receive', 'Bill of lading, ETA tracking'],
      ],
    },
    {
      id: 'clear',
      short: 'Clear',
      place: 'Port of entry',
      title: 'Get it through customs without a demurrage bill',
      body: "Documents prepared to the destination's requirements, HS codes classified correctly, and certificate of origin in hand. Where a renewable-energy duty exemption exists, we prepare the file to claim it.",
      rows: [
        ['Typical window', '4 – 12 days'],
        ['You receive', 'Full customs document set'],
      ],
    },
    {
      id: 'deliver',
      short: 'Deliver',
      place: 'Site',
      title: 'Port to site, then handed to the installer',
      body: 'Inland haulage arranged to the landing site, farm, clinic or depot, including the last stretch that trucks do not like. Delivery is counted against the packing list with your installer present, not signed off at the gate.',
      rows: [
        ['Typical window', '2 – 10 days'],
        ['You receive', 'Signed delivery note, spares log'],
      ],
    },
  ] as Stage[],
}

/* ─────────────────────────── LINES ─────────────────────────── */

// [LIVE] On-grid, Off-grid, Advisory. [EV — NEW] E-Mobility.
export const LINES = {
  label: 'What we do',
  heading: 'Five lines, one purchase order.',
  items: [
    {
      key: 'on-grid' as const,
      name: 'On-Grid Solar',
      live: 'Complete grid-connected solar systems for commercial and industrial applications with advanced monitoring and optimization.',
      image: IMAGES.lines['on-grid'],
      items: [
        'Mono PERC and TOPCon modules, 550 – 700 Wp',
        'String and central inverters with MPPT',
        'Step-up transformers, switchgear, protection',
        'Mounting, tracker structures, DC cable',
      ],
    },
    {
      key: 'off-grid' as const,
      name: 'Off-Grid Solar',
      live: 'Standalone solar power systems designed for remote locations, providing reliable energy independence for various applications.',
      image: IMAGES.lines['off-grid'],
      items: [
        'Hybrid inverters and charge controllers',
        'LiFePO₄ storage, rack and container format',
        'DC appliances, pumps, refrigeration',
        'Meters and prepaid control for mini-grid operators',
      ],
    },
    {
      key: 'e-mobility' as const,
      name: 'E-Mobility',
      /** [EV — NEW] Not published on the live site yet. */
      live: 'Electric vehicles and the infrastructure that keeps them moving. Cars and bikes sourced from the factory, chargers and battery systems supplied alongside them.',
      image: IMAGES.lines['e-mobility'],
      items: [
        'Electric cars, passenger and light commercial',
        'Electric bikes, scooters and three-wheelers',
        'AC and DC chargers, 7 kW to 180 kW',
        'Battery swap cabinets and depot load management',
        'Spare packs, controllers and service parts',
      ],
      isNew: true,
    },
    {
      key: 'merchandise' as const,
      name: 'General Merchandise',
      /** [EV — NEW] Not published on the live site yet. */
      live: 'The everything-else order. Consolidated onto the same shipment so you are not paying freight twice for a pallet of accessories.',
      image: IMAGES.lines.merchandise,
      items: [
        'Rider and workshop gear, helmets, tools, safety kit',
        'Fleet and dealership branded stock',
        'Consumer electronics and small appliances',
        'Spares, consumables and packaging',
        'Consolidated with your energy or EV order',
      ],
      isNew: true,
    },
    {
      key: 'advisory' as const,
      name: 'Advisory',
      live: 'Expert consultation on solar project planning, implementation strategies, and sustainable energy optimization for your business.',
      image: IMAGES.lines.advisory,
      items: [
        'System sizing against real load and irradiance data',
        'Tender and bid support for public procurement',
        'Supplier due diligence and warranty review',
        'Landed-cost modelling, ex-works to site',
      ],
    },
  ],
}

/* ────────────────────────── SECTORS ────────────────────────── */

// [LIVE] Fishery, Agricultural, Health. [EV — NEW] Mobility.
export const SECTORS = {
  label: 'Sectors',
  heading: 'Power designed around the work it has to do.',
  lede: 'Agriculture and estate development are site-development problems first: mixed loads, distributed infrastructure, and operating costs that last for years.',
  items: [
    { tag:'Agriculture & Agribusiness', image:IMAGES.sectors.agricultural, live:'Full sector page', title:'Power is the difference between selling a crop and selling a product.', body:'Irrigation, cold storage, processing and value addition designed around the crop, the operating window and the cost of downtime.', href:'/sectors/agriculture' },
    { tag:'Estates & Real Estate Development', image:IMAGES.sectors.mobility, live:'Full sector page', title:'Power belongs in the masterplan, not in the snagging list.', body:'Estate-wide load modelling, common services, reticulation, phased capacity and electric vehicle provision designed in before the ground is broken.', href:'/sectors/estates' },
    { tag:'Commercial & Industrial', image:IMAGES.sectors.fishery, live:'Explore sectors', title:'Reliable power for productive loads.', body:'Commercial and industrial energy systems supported by sourcing, logistics, storage and service capability.', href:'/solar-and-storage' },
    { tag:'Critical Infrastructure', image:IMAGES.sectors.health, live:'Explore sectors', title:'Power where interruption carries a higher cost.', body:'Systems for healthcare and other critical loads where availability, serviceability and parts support matter as much as installed capacity.', href:'/solar-and-storage' },
  ],
}

/* ──────────────────────── DE-RISKING ───────────────────────── */

export const DERISK = {
  label: 'How we de-risk it',
  heading: 'Trust is a document trail.',
  lede: 'You are buying from a continent away, often against a disbursement deadline. Everything below exists so you can verify the order instead of hoping about it.',
  items: [
    [
      'Supplier vetting',
      'Factory audit, financial check and warranty backing before a purchase order exists.',
    ],
    [
      'Pre-shipment inspection',
      'Flash test, EL imaging and container loading verified on your batch, not a sample from last quarter.',
    ],
    [
      'Terms that fit',
      'FOB, CIF or DDP. We price all three so you can choose how much of the freight you want to own.',
    ],
    [
      'Documentation',
      "Invoice, packing list, bill of lading, certificate of origin and duty-exemption support, prepared to the destination's rules.",
    ],
  ] as [string, string][],
}

/* ─────────────────────────── REACH ─────────────────────────── */

// [LIVE] Our Global Reach
export const REACH = {
  label: 'Reach',
  heading: 'Our Global Reach',
  lede: 'Serving emerging markets across the globe',
  title: 'Global Operations',
  body: 'We are dedicated to driving renewable energy adoption and sustainable development throughout emerging markets worldwide, expanding access to reliable solutions wherever they are needed most.',
  hubsTitle: 'Regional Hubs',
  hubsBody:
    "Dedicated teams positioned in Southern Africa and the America's to provide localized support and rapid response times.",
}

/* ─────────────────────────── BRIEF ─────────────────────────── */

export const BRIEF = {
  label: 'Start here',
  heading: 'Send us the load, the port and the deadline.',
  lede: 'That is enough to come back with a real quote. If the specification is still open, say so and we will size it with you first.',
  note: ['Quotes returned within 3 working days', 'Hong Kong · GMT+8'],
}

/* ────────────────────── SERVICES CATALOG ───────────────────── */

export type ServiceCategory =
  | 'On-grid'
  | 'Off-grid'
  | 'E-Mobility'
  | 'Merchandise'
  | 'Advisory'

export type ServiceSector =
  | 'Fishery'
  | 'Agricultural'
  | 'Health'
  | 'Mobility'
  | 'All Sectors'

export interface ServiceItem {
  category: ServiceCategory
  title: string
  body: string
  features: string[]
  sector: ServiceSector
  /** Card art. Swap the file in public/images/services, or point at another key. */
  image: Media
}

export const SERVICES_PAGE = {
  heading: 'Our Services',
  lede: 'Comprehensive solar, e-mobility and supply solutions tailored to your business needs',
  filterLabel: 'Filter by',
  categoryLabel: 'Category',
  sectorLabel: 'Sector',
  featuresLabel: 'Key features',
  quoteCta: 'Request quote',
  clearCta: 'Clear filters',
  emptyBody: 'Nothing matches that combination. Clear a filter to see more.',
  categories: ['All', 'On-grid', 'Off-grid', 'E-Mobility', 'Merchandise', 'Advisory'] as const,
  sectors: ['All', 'Fishery', 'Agricultural', 'Health', 'Mobility', 'All Sectors'] as const,
}

// [LIVE] the nine published services, plus three [EV — NEW] entries.
export const SERVICES: ServiceItem[] = [
  {
    category: 'On-grid',
    title: 'Commercial On-Grid Solar System 50kW',
    body: 'Complete grid-tied solar solution for commercial facilities with advanced monitoring and net metering capabilities.',
    features: [
      'High-efficiency monocrystalline panels',
      'Grid-tie inverter with MPPT technology',
      'Real-time monitoring system',
      'Net metering compatible',
      '25-year panel warranty',
    ],
    sector: 'Agricultural',
    image: IMAGES.services['on-grid'],
  },
  {
    category: 'Off-grid',
    title: 'Off-Grid Solar Package 10kW',
    body: 'Standalone solar power system with battery storage, ideal for remote locations and facilities without grid access.',
    features: [
      'Deep-cycle battery bank 48V',
      'Pure sine wave inverter',
      'Solar charge controller',
      'Backup generator integration ready',
      '10-year system warranty',
    ],
    sector: 'Fishery',
    image: IMAGES.services['off-grid'],
  },
  {
    category: 'On-grid',
    title: 'Healthcare Facility Solar Solution 30kW',
    body: 'Hybrid solar system designed specifically for healthcare facilities requiring uninterrupted power supply.',
    features: [
      'Hybrid inverter with battery backup',
      'Medical-grade power quality',
      'Automatic transfer switch',
      'Emergency power reserve',
      'Remote monitoring and alerts',
    ],
    sector: 'Health',
    image: IMAGES.services['on-grid'],
  },
  {
    category: 'Off-grid',
    title: 'Agricultural Irrigation Solar Pump 15kW',
    body: 'Solar-powered water pumping system for agricultural irrigation with variable speed control.',
    features: [
      'High-efficiency solar pump inverter',
      'Weather-resistant enclosure',
      'Variable flow rate control',
      'Low maintenance design',
      '5-year pump warranty',
    ],
    sector: 'Agricultural',
    image: IMAGES.services['off-grid'],
  },
  {
    category: 'On-grid',
    title: 'Cold Storage Solar System 25kW',
    body: 'Specialized solar solution for fishery cold storage facilities with reliable temperature control.',
    features: [
      'High-capacity inverter system',
      'Temperature monitoring integration',
      'Battery backup for critical loads',
      'Weatherproof installation',
      'Priority power routing',
    ],
    sector: 'Fishery',
    image: IMAGES.services['on-grid'],
  },
  {
    category: 'Advisory',
    title: 'Solar Energy Advisory Package',
    body: 'Comprehensive consultation service including site assessment, system design, ROI analysis, and implementation strategy.',
    features: [
      'Site assessment and energy audit',
      'Custom system design',
      'Financial analysis and ROI projection',
      'Supplier and contractor recommendations',
      'Implementation roadmap',
    ],
    sector: 'All Sectors',
    image: IMAGES.services.advisory,
  },
  {
    category: 'Off-grid',
    title: 'Remote Clinic Solar Package 8kW',
    body: 'Complete off-grid solar solution for remote healthcare clinics with medicine refrigeration support.',
    features: [
      'Medical refrigerator compatible',
      'LED lighting package included',
      'Communication equipment support',
      'Expandable battery capacity',
      'Rugged all-weather design',
    ],
    sector: 'Health',
    image: IMAGES.services['off-grid'],
  },
  {
    category: 'On-grid',
    title: 'Commercial Greenhouse Solar 40kW',
    body: 'Grid-tied solar system optimized for greenhouse operations with climate control integration.',
    features: [
      'Climate control system integration',
      'Automated irrigation support',
      'Peak shaving capability',
      'Energy management system',
      'Production monitoring dashboard',
    ],
    sector: 'Agricultural',
    image: IMAGES.services['on-grid'],
  },
  {
    category: 'On-grid',
    title: 'Fish Processing Plant Solar 60kW',
    body: 'Large-scale solar installation for fish processing facilities with high power demands.',
    features: [
      'Industrial-grade components',
      'Three-phase power output',
      'Load management system',
      'Scalable design for expansion',
      'Commercial warranty package',
    ],
    sector: 'Fishery',
    image: IMAGES.services['on-grid'],
  },
  /* ── [EV — NEW] Not on the live site. Sign these off before launch. ── */
  {
    category: 'E-Mobility',
    title: 'Solar EV Charging Hub 40kW',
    body: 'Grid-tied charging hub with solar canopy and buffer storage, sized for commercial forecourts and workplace parking.',
    features: [
      'Two 22kW AC and one 60kW DC outlet',
      'Solar canopy with buffer battery',
      'Dynamic load management',
      'OCPP 1.6J back-office compatible',
      'Card, QR and mobile payment ready',
    ],
    sector: 'Mobility',
    image: IMAGES.services['ev-charger'],
  },
  {
    category: 'E-Mobility',
    title: 'Fleet Depot Charging 100kW',
    body: 'Overnight depot charging for electric fleets, with scheduling that shifts the draw off the site peak.',
    features: [
      'Multi-dispenser DC charging',
      'Scheduled overnight charge windows',
      'Peak-shaving with battery buffer',
      'Per-vehicle usage reporting',
      'Generator changeover compatible',
    ],
    sector: 'Mobility',
    image: IMAGES.services['ev-charger'],
  },
  {
    category: 'E-Mobility',
    title: 'Electric Car Supply, Passenger & Light Commercial',
    body: 'Battery-electric cars and vans sourced direct from the factory, homologated for your market and landed with the charging kit that goes with them.',
    features: [
      'Passenger, van and light commercial models',
      'Right- or left-hand drive to market',
      'Homologation and type-approval paperwork',
      'Home and depot charger supplied with the vehicle',
      'Spare packs and service parts on the same order',
    ],
    sector: 'Mobility',
    image: IMAGES.services['ev-car'],
  },
  {
    category: 'E-Mobility',
    title: 'Electric Bike & Scooter Supply',
    body: 'Electric bikes, scooters and three-wheelers for commercial riders and last-mile fleets, quoted per unit with spares built into the order.',
    features: [
      'Cargo, delivery and passenger configurations',
      'Removable packs, swap-cabinet compatible',
      'Rider gear and workshop tooling included',
      'Spare batteries, controllers and tyres',
      'Volume pricing from 25 units',
    ],
    sector: 'Mobility',
    image: IMAGES.services['ev-bike'],
  },
  {
    category: 'Merchandise',
    title: 'General Merchandise Consolidation',
    body: 'The accessories, branded stock and consumables that would otherwise need their own shipment, packed into the container you are already paying for.',
    features: [
      'Rider gear, helmets, safety and workshop kit',
      'Branded fleet or dealership stock',
      'Consumer electronics and small appliances',
      'Consolidated with your energy or EV order',
      'One packing list, one bill of lading',
    ],
    sector: 'All Sectors',
    image: IMAGES.services.merch,
  },
  {
    category: 'E-Mobility',
    title: 'Two & Three-Wheeler Swap Station',
    body: 'Battery swap cabinet for commercial riders, so a rider changes a pack in under a minute instead of waiting on a charger.',
    features: [
      'Eight to sixteen bay cabinet',
      'Solar and grid hybrid input',
      'Cell-level monitoring and lockout',
      'Rider app and access control ready',
      'Weatherproof outdoor rating',
    ],
    sector: 'Mobility',
    image: IMAGES.services['ev-swap'],
  },
]

/* ────────────────────────── CONTACT ────────────────────────── */

// [LIVE] Get in Touch, Send us a Message, Our Offices
export const CONTACT_PAGE = {
  heading: 'Get in Touch',
  lede: "Reach out to us with your questions or project ideas — we're here to help.",
  body: "Whether you're looking for sustainable energy solutions, partnership opportunities, or just have a general inquiry, our team is ready to assist you.",
  formHeading: 'Build your brief',
  formBody:
    'Fill this in and it composes an email in your own mail client. Nothing is sent through this site and nothing is stored here.',
  officesHeading: 'Our Offices',
  officesLede: 'Strategically located to serve global emerging markets efficiently.',
  offices: [
    {
      title: 'Global Headquarters',
      body: 'Operating globally with centralized management to ensure consistent quality and service delivery across all our international projects.',
    },
    {
      title: 'Regional Hubs',
      body: "Dedicated teams positioned in Southern Africa and the America's to provide localized support and rapid response times.",
    },
  ],
}
