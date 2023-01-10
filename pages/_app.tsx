import '../styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import SiteLayout from '../src/layout/siteLayout'

export default function App({ Component, pageProps }: AppProps) {
  return ( <SiteLayout>
    <>
    <Head>
    <title>Create Next App</title>
    <meta name="description" content="Simple React Quiz" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head><Component {...pageProps} />
    </>
  </SiteLayout>
  )
}
