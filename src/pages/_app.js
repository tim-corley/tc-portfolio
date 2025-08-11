import '@/css/tailwind.css'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'

import { SEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'
import MDXComponents from '@/components/MDXComponents'

export default function App({ Component, pageProps }) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
      <ThemeProvider attribute="class">
        <MDXProvider components={MDXComponents}>
          <Head>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
          </Head>
          <DefaultSeo {...SEO} />
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </MDXProvider>
      </ThemeProvider>
    </GoogleReCaptchaProvider>
  )
}
