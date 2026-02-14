import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'PesaQR | Generate Payment QR Codes',
      },
      {
        name: 'description',
        content: 'Generate Payment QR Codes for M-PESA transactions',
      },
      {
        name: 'keywords',
        content: 'till number,qr,qr code,mpesa,m-pesa,payment,kenya',
      },
      {
        property: 'og:title',
        content: 'PesaQR | Generate Payment QR Codes',
      },
      {
        property: 'og:description',
        content: 'Generate Payment QR Codes for M-PESA transactions',
      },
      {
        property: 'og:url',
        content: 'https://pesaqr.com',
      },
      {
        property: 'og:image',
        content: 'https://pesaqr.com/ogimage.png',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:site',
        content: '@davidamunga_',
      },
      {
        name: 'twitter:creator',
        content: '@davidamunga_',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster position="top-right" />
        <Scripts />
      </body>
    </html>
  )
}
