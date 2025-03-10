import { PriceTracker } from "@/components/price-tracker"
import { ExchangeSelector } from "@/components/exchange-selector"
import { CurrencySelector } from "@/components/currency-selector"
import { RefreshInterval } from "@/components/refresh-interval"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Crypto Price Tracker</h1>
          <p className="text-muted-foreground">Track cryptocurrency prices across multiple exchanges in real-time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ExchangeSelector />
          <CurrencySelector />
          <RefreshInterval />
        </div>

        <PriceTracker />
      </div>
    </main>
  )
}

