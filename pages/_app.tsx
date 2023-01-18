import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from "@nextui-org/react"

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
    
  )
}
