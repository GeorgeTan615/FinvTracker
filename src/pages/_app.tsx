import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { SessionProvider } from "next-auth/react"

const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      brandPurple: '#C36CEC'

    },
    space: {},
    fonts: {}
  }
})

export default function App({ Component, pageProps:{ session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider theme={theme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  )
}
