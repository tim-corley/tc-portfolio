'use client'

import '@/app/globals.css'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'

import { SEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'
import MDXComponents from '@/components/MDXComponents'

import localFont from "next/font/local";

// // Load the font
// const quicksand = localFont({
//   src: '../public/static/fonts/Quicksand-Regular.ttf',
//   variable: '--font-title',
//   weight: '400', // optional
//   style: 'normal', // optional
// });

// const roboto = localFont({
//   src: '../public/static/fonts/Roboto-Regular.ttf',
//   variable: '--font-body',
//   weight: '400', // optional
//   style: 'normal', // optional
// });

const quicksand = localFont({
  src: [
    { path: '../public/static/fonts/Quicksand-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/static/fonts/Quicksand-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../public/static/fonts/Quicksand-Light.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--font-title',
  display: 'swap',
});

const roboto = localFont({
  src: [
    { path: '../public/static/fonts/Roboto-Thin.ttf', weight: '100', style: 'normal' },
    { path: '../public/static/fonts/Roboto-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/static/fonts/Roboto-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../public/static/fonts/Roboto-Medium.ttf', weight: '400', style: 'normal' },
    { path: '../public/static/fonts/Roboto-BoldItalic.ttf', weight: '700', style: 'italic' },
    { path: '../public/static/fonts/Roboto-ThinItalic.ttf', weight: '400', style: 'italic' },
  ],
  variable: '--font-body',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${quicksand.variable} ${roboto.variable}`} suppressHydrationWarning>
      <Head>
        <link rel="apple-touch-icon" sizes="76x76" href="../public/static/favicons/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="../public/static/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../public/static/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <link rel="alternate" type="application/rss+xml" href="/index.xml" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          />
        </noscript>
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/fonts/KaTeX_Main-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/fonts/KaTeX_Math-Italic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/fonts/KaTeX_Size2-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/fonts/KaTeX_Size4-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.css"
          integrity="sha384-yFRtMMDnQtDRO8rLpMIKrtPCD5jdktao2TV19YiZYWMDkUR5GQZR/NOVTdquEx1j"
          crossOrigin="anonymous"
        />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <body className="antialiased text-black bg-white dark:bg-gray-900 dark:text-white">
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
          <ThemeProvider attribute="data-theme">
            <MDXProvider components={MDXComponents}>
              <DefaultSeo {...SEO} />
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </MDXProvider>
          </ThemeProvider>
        </GoogleReCaptchaProvider>
      </body>
    </html>
  )
}