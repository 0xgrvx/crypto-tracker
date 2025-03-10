"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PriceTable } from "@/components/price-table"
import { PriceChart } from "@/components/price-chart"
import { useExchanges } from "@/hooks/use-exchanges"
import { useCurrencies } from "@/hooks/use-currencies"
import { useRefreshInterval } from "@/hooks/use-refresh-interval"
import { fetchPrices } from "@/lib/api"
import { Loader2 } from "lucide-react"

export function PriceTracker() {
  const { selectedExchanges } = useExchanges()
  const { selectedCurrencies } = useCurrencies()
  const { refreshInterval } = useRefreshInterval()
  const [prices, setPrices] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"table" | "chart">("table")

  useEffect(() => {
    const getPrices = async () => {
      if (selectedExchanges.length === 0 || selectedCurrencies.length === 0) {
        setPrices({})
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const data = await fetchPrices(selectedExchanges, selectedCurrencies)
        if (data && Object.keys(data).length > 0) {
          setPrices(data)
        } else {
          console.warn("Received empty price data")
          // Keep the old prices if we get empty data
        }
      } catch (error) {
        console.error("Failed to fetch prices:", error)
        // Don't clear existing prices on error
      } finally {
        setLoading(false)
      }
    }

    getPrices()

    const interval = setInterval(getPrices, refreshInterval * 1000)
    return () => clearInterval(interval)
  }, [selectedExchanges, selectedCurrencies, refreshInterval])

  if (selectedExchanges.length === 0 || selectedCurrencies.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Data</CardTitle>
          <CardDescription>Please select at least one exchange and one currency to track</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle>Price Comparison</CardTitle>
          <Tabs value={view} onValueChange={(v) => setView(v as "table" | "chart")}>
            <TabsList>
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="chart">Chart</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CardDescription>Compare prices across {selectedExchanges.length} exchanges</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Tabs value={view} className="w-full">
            <TabsContent value="table" className="mt-0">
              <PriceTable prices={prices} />
            </TabsContent>
            <TabsContent value="chart" className="mt-0">
              <PriceChart prices={prices} />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

