"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useExchanges } from "@/hooks/use-exchanges"
import { useCurrencies } from "@/hooks/use-currencies"
import { formatPrice, calculatePriceDifference } from "@/lib/utils"

interface PriceTableProps {
  prices: Record<string, Record<string, number>>
}

export function PriceTable({ prices }: PriceTableProps) {
  const { selectedExchanges } = useExchanges()
  const { selectedCurrencies } = useCurrencies()

  // Find the best price for each currency
  const bestPrices = selectedCurrencies.reduce(
    (acc, currency) => {
      const currencyPrices = selectedExchanges.map((exchange) => prices[exchange]?.[currency]).filter(Boolean)

      acc[currency] = currencyPrices.length ? Math.min(...currencyPrices) : 0
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Currency</TableHead>
            {selectedExchanges.map((exchange) => (
              <TableHead key={exchange}>{exchange}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedCurrencies.map((currency) => (
            <TableRow key={currency}>
              <TableCell className="font-medium">{currency}</TableCell>
              {selectedExchanges.map((exchange) => {
                const price = prices[exchange]?.[currency]
                const bestPrice = bestPrices[currency]
                const difference = calculatePriceDifference(price, bestPrice)

                return (
                  <TableCell key={`${exchange}-${currency}`}>
                    {price ? (
                      <div className="flex flex-col">
                        <span className={difference > 0 ? "text-red-500" : difference < 0 ? "text-green-500" : ""}>
                          {formatPrice(price)}
                        </span>
                        {difference !== 0 && (
                          <span className="text-xs text-muted-foreground">
                            {difference > 0 ? "+" : ""}
                            {difference.toFixed(2)}%
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

