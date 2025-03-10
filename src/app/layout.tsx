import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ExchangesProvider } from "@/hooks/use-exchanges"
import { CurrenciesProvider } from "@/hooks/use-currencies"
import { RefreshIntervalProvider } from "@/hooks/use-refresh-interval"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Crypto Price Tracker",
  description: "Track cryptocurrency prices across multiple exchanges",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ExchangesProvider>
            <CurrenciesProvider>
              <RefreshIntervalProvider>{children}</RefreshIntervalProvider>
            </CurrenciesProvider>
          </ExchangesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

