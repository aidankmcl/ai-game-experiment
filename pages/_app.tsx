// _app.tsx
import '@unocss/reset/tailwind.css'
import 'uno.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp