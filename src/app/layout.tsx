import type { Metadata, Viewport } from 'next'
import Aurora from '@/components/Aurora'
import { AuroraProvider } from '@/components/AuroraContext'
import BackToTop from '@/components/BackToTop'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import { IMAGES } from '@/config/images'
import { BRAND, PARENT } from '@/config/site'
import './globals.css'

const FONTS =
  'https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400..700' +
  '&family=IBM+Plex+Mono:wght@400;500' +
  '&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap'

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: `${BRAND.name} — ${BRAND.strap}`,
    template: `%s — ${BRAND.name}`,
  },
  description:
    'Energy system design, solar generation and storage, electric mobility, sourcing, procurement and long-term support for emerging markets.',
  icons: {
    icon: [
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-64.png', sizes: '64x64', type: 'image/png' },
      { url: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: BRAND.name,
    description: 'Design. Supply. Sustain.',
    url: BRAND.url,
    siteName: BRAND.name,
    type: 'website',
    images: [{ url: IMAGES.og.src, width: 1200, height: 630, alt: IMAGES.og.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND.name,
    description: 'Design. Supply. Sustain.',
    images: [IMAGES.og.src],
  },
  other: { 'parent-company': PARENT.name },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF7F0' },
    { media: '(prefers-color-scheme: dark)', color: '#091F17' },
  ],
}

const THEME_BOOT = `
(function(){
  try {
    var saved = localStorage.getItem('ano-theme');
    var theme = saved === 'dark' || saved === 'light'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>
        <AuroraProvider>
          <Aurora />
          <Nav />
          <div className="relative z-10">{children}</div>
          <Footer />
          <BackToTop />
        </AuroraProvider>
      </body>
    </html>
  )
}
