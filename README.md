# AnoEnergy

Next.js 14 App Router, TypeScript strict, Tailwind, raw WebGL aurora background.
Part of the Ano Global Holdings group build.

```bash
npm install
npm run dev
```

## Routes

| Route | What's on it |
| --- | --- |
| `/` | Impact-led homepage, distinct Solar & Storage / E-Mobility capability routes, corridor, sectors, de-risking, reach, brief |
| `/solar-and-storage` | Dedicated Solar & Storage capability page |
| `/e-mobility` | Dedicated E-Mobility capability page and sub-pages |
| `/system-design` | System design capability page |
| `/services` | Compatibility gateway to the two separated capability areas |
| `/contact` | Email, offices, and an interactive brief builder |
| 404 | Themed |

## The aurora

`src/components/Aurora.tsx` is raw WebGL, adapted from the ThreeUI
PortalFieldCollection "Cloud Field" variant. That collection spans Three.js, raw
WebGL and Canvas 2D, and Cloud Field is the raw-WebGL one, so this is faithful to
the reference and ships zero extra bundle weight. If you want it on Three.js to
match the holdings site, the fragment shader drops into a `ShaderMaterial` on a
fullscreen plane with an orthographic camera, unchanged.

The field follows the v2.1 identity: restrained flat gold along the energized lower edge, forest green through the body, and paper white only where curtains overlap. It deliberately stays inside the forest-green, cream and restrained-gold identity.

Three curtains at different depths. Each has a drifting fBm lower edge, an
exponential upward falloff and vertical ray striation scrolling through the sheet,
which is what makes it read as combed light rather than fog. A star field sits
behind and gets occluded.

Performance and accessibility: pauses offscreen and on tab blur, device pixel
ratio capped by viewport width (1.1 above 1600px), one settled frame under
`prefers-reduced-motion`, CSS gradient fallback with no WebGL.

## The aurora is driven by the page, quietly

`AuroraContext` holds `lean`, `charge` and `surge` in refs, so nudging the sky
costs no React re-render.

The field is tuned to be ambient rather than reactive. Three curtains, not four.
Drift roughly a third of its old speed. Ray striation softened so the light reads
as a wash rather than a comb, and no white-hot core. Every easing constant is
long enough that reactions take seconds, not frames.

**Scrolling settles the sky rather than exciting it.** Fast scrolling eases the
curtains down toward a calm floor; they drift back up once you stop on a section.
Motion belongs to the page while you are moving and to the sky once you settle.
Clicking the page no longer flashes the background at all.

| Interaction | Effect |
| --- | --- |
| Pointer move | Curtains bend very slightly toward the cursor, over about two seconds |
| Scroll | Eases the sky down; it recovers when you stop |
| Section in view | `<Lean />` tilts the curtains slowly, alternating down the page |
| Hover a CTA or a line card | A small lift in brightness, and a lean toward that card |
| Press a CTA | A slow swell crosses the sky over four seconds |
| Corridor stage change | Leans with the corridor. No surge per stage, that was noise |

To go calmer still, drop `a *= 0.82 + ch * 0.22` in the shader, or raise
`DWELL` in `Corridor.tsx`. To bring back more movement, raise the `drift`
multiplier in `curtain()`.

## Other interactivity

| Where | What |
| --- | --- |
| `Corridor.tsx` | Plays itself, hands over the moment you touch it. Pauses when offscreen. Horizontal rail from `md` up with hover, drag-to-scrub and arrow keys / Home / End; a vertical tap list below that |
| `LineCards.tsx` | Glow pools under the cursor; each card expands to show what actually ships |
| `ServicesBrowser.tsx` | Category and sector filters with a live count and a clear control |
| `BriefBuilder.tsx` | Composes a brief with a live preview, then hands it to your own mail client |
| `ScrollRail.tsx` | Fixed rail reading the page as a run of sections, with a progress fill |
| `Magnetic.tsx` | Buttons lean toward the cursor and swell the sky on press |
| `Media.tsx` | Every image slot on the site, with a consistent tint and crop |
| `CopyEmail.tsx` | Copies the address and says so |

## Images

**Every image slot is listed in `src/config/images.ts`.** Nothing references an
image path from inside a component.

To swap artwork, drop your file into `public/images/...` over the placeholder of
the same name. That is the whole job. To point a slot at a different filename,
change its `src` in `images.ts`.

The build ships placeholders: dark plates in the brand palette with a REPLACE
label and the expected dimensions on them, so an unfilled slot looks deliberate
in review rather than broken.

| Folder | Slots | Size |
| --- | --- | --- |
| `public/images/hero/` | Hero manifest card | 1600×900 (16:9) |
| `public/images/lines/` | The five supply lines | 960×720 (4:3) |
| `public/images/sectors/` | Fishery, Agricultural, Health, Mobility | 960×720 (4:3) |
| `public/images/services/` | Service card art, shared across the catalog | 960×720 (4:3) |
| `public/images/og/` | Social share card | 1200×630 |

Two things to do when you replace a file:

- **Write real alt text** in `images.ts`. It should describe what is in the
  photograph, not what the section is about. Leave `alt` as an empty string for
  purely decorative art and it stays hidden from screen readers.
- **Set `focus`** if the subject sits off-centre. It takes any CSS
  `object-position` value, so `focus: 'center 30%'` keeps a horizon in frame
  through the crop.

Several services share one plate on purpose. Give a service its own art by
adding an entry to `IMAGES.services` and pointing that service's `image` at it.

## The corridor on small screens

The rail is one set of buttons, restyled by breakpoint rather than duplicated, so
there is no hydration swap and no second tablist for screen readers to find.

From `md` up it is the horizontal rail: dots along a track, hover to preview,
drag to scrub, arrow keys / Home / End. Below `md` the same nodes stack into a
vertical list with each stage drawing its own connector to the next, which avoids
percentage maths against rows that can wrap. Drag-to-scrub and hover-to-select are
gated to pointer input and to the horizontal layout, so neither fights the page
scroll on a phone.

## Copy and provenance

All copy is in `src/config/content.ts`, tagged per block:

- `[LIVE]` — from anoglobalholdings.com/anoenergy, /services and /contact.
  Client spellings kept ("Specialized", "specializing", "America's").
- `[WRITTEN]` — new copy for this build, in the client's register.
- `[EV — NEW]` — **the e-mobility line. Not published anywhere yet.**

### What to sign off before launch

The EV additions are new business claims, so they need EJ's confirmation:

- The **E-Mobility** supply line, now covering electric cars and bikes as well
  as chargers, swap cabinets and spares
- The **General Merchandise** supply line
- The **Mobility** sector entry
- Six services: Solar EV Charging Hub 40kW, Fleet Depot Charging 100kW,
  Two & Three-Wheeler Swap Station, Electric Car Supply, Electric Bike & Scooter
  Supply, General Merchandise Consolidation
- The **Merchandise** category in the services filter
- The e-mobility and merchandise clause added to the second About paragraph

Also illustrative, and flagged as such on the page: the "Typical consignment"
figures in the hero, and the corridor's stage windows. Swap in real numbers when
you have them.

## Configuration

`src/config/site.ts` holds identity, domains, nav and attribution.

```ts
export const BRAND = { email: 'contact@anoenergy.org', domain: 'anoenergy.com', ... }
export const NAV = [ /* drives the header, the mobile sheet and the footer */ ]
export const RAIL = [ /* the section rail on the home page */ ]
export const BUILT_BY = { name: 'Lamar', phone: '2349062288078', message: '...' }
```

Your attribution sits in the footer copyright line, bold, in restrained gold:

> © 2026 AnoEnergy, part of Ano Global Holdings. All rights reserved. Built by **Lamar**

It links to `wa.me/2349062288078` with the message pre-filled. Change the number
or the wording in `BUILT_BY` and nothing else needs touching.

## Fonts

Loaded via a stylesheet link in `src/app/layout.tsx` so the project builds
without network access to fonts.googleapis.com. On Vercel, switch to `next/font`
for self-hosting and zero layout shift:

```tsx
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'

const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-body', display: 'swap' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-mono', display: 'swap' })
```

Put those three variables on `<html>`, drop the `<head>` links, and remove the
three `--font-*` declarations from `:root` in `globals.css` so `next/font` owns them.

Newsreader is used for the display face to keep the corporate pages calm, editorial and institutional. IBM Plex Sans remains the body and navigation face for clarity.

## Padding and hover language

Two rules keep every panel consistent. Both live in `globals.css`.

**Padding.** No card sets its own padding. They use `.pad-card`
(`clamp(1.75rem, 1.15rem + 2.2vw, 2.75rem)`) or `.pad-card-tight`. That gives
28px of inset at 360px and 44px at 1440px, and it means text never ends up
against a card edge on a phone, which is what used to happen where a card set
`md:px-8` and nothing below it. Verified: minimum text inset is 24px at 360px
and 32px at 1440px, across every card on all three pages.

**Hover.** `.card` gives one gesture used everywhere: the ground lifts from
`ink` to `deep`, and a hairline draws across the top from the left over 800ms in
flat gold. Hovering anything on the site should feel like the same
object responding. `.underline-grow` does the same for links, a rule that grows
from the left rather than a colour flip.

Everything eases on `--ease` (`cubic-bezier(0.16, 1, 0.3, 1)`) at 500–1100ms.
Nothing snaps. Solid buttons fill with a wipe that scales up from the floor
instead of switching colour; images scale 3.5% and lift brightness over 1100ms;
service feature markers extend on card hover. All of it is behind
`motion-safe:` or disabled under `prefers-reduced-motion`.

## Design tokens

Declared as raw RGB channels in `globals.css` so Tailwind opacity modifiers
(`border-paper/10`, `bg-ink/70`) resolve.

| Token | Value | Role |
| --- | --- | --- |
| `ink` | `#1B4332` (light theme) / deeper forest in dark mode | Primary dark surfaces |
| `deep` | `#2D6A4F` | Secondary green surfaces |
| `haze` | `#E8F1EA` | Text and soft contrast on dark |
| `paper` | `#FFFFFF` | White text and clean surfaces |
| `flare` | `#D9B44A` | Flat gold emphasis on dark |
| `gold-line` | `#B8860B` | Hairline rules on light surfaces |
