import { AppProps, type AppType } from "next/app"
import { Quicksand as FontSans } from "@next/font/google"
import { api } from "../utils/api"
import "../styles/globals.css"
import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"
import { NextPage } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "react-hot-toast"

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode
}

type Props = AppProps & {
  Component: Page
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: Props) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page)

  return (
    <>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      <ClerkProvider {...pageProps}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Toaster />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </ClerkProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
