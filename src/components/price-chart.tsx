"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useExchanges } from "@/hooks/use-exchanges"
import { useCurrencies } from "@/hooks/use-currencies"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PriceChartProps {
  prices: Record<string, Record<string, number>>
}

export function PriceChart({ prices }: PriceChartProps) {
  const { selectedExchanges } = useExchanges()
  const { selectedCurrencies } = useCurrencies()
  const [selectedCurrency, setSelectedCurrency] = useState(selectedCurrencies[0] || "")

  if (!selectedCurrency && selectedCurrencies.length > 0) {
    setSelectedCurrency(selectedCurrencies[0])
  }

  const chartData = selectedExchanges
    .filter((exchange) => prices[exchange]?.[selectedCurrency])
    .map((exchange) => ({
      exchange,
      price: prices[exchange]?.[selectedCurrency] || 0,
    }))

  if (chartData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p>No data available for the selected currency</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {selectedCurrencies.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="exchange" />
            <YAxis />
            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                "Price",
              ]}
            />
            <Legend />
            <Bar dataKey="price" fill="#3b82f6" name={`${selectedCurrency} Price`} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

