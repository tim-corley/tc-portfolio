import './global.css'
import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Tim\'s Website',
    template: '%s | Tim\'s Website',
  },
  icons: {
    icon: [
      { url: '/static/favicons/favicon.ico', sizes: 'any' }, // traditional favicon
      { url: '/static/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/static/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/static/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: ['/static/favicons/favicon.ico']
  },
  description: 'A portfolio and notes website',
  openGraph: {
    title: 'Tim\'s Portfolio & Notes',
    description: 'A portfolio and notes website',
    url: baseUrl,
    siteName: 'Tim\'s Portfolio & Notes',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        `${plexMono.variable}`,
        'text-black bg-white dark:text-white dark:bg-black font-main'
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
