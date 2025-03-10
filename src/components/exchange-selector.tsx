"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useExchanges } from "@/hooks/use-exchanges"
import { Loader2 } from "lucide-react"

export function ExchangeSelector() {
  const { availableExchanges, selectedExchanges, toggleExchange, loading } = useExchanges()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exchanges</CardTitle>
        <CardDescription>Select exchanges to compare</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {availableExchanges.map((exchange) => (
              <div key={exchange} className="flex items-center space-x-2">
                <Checkbox
                  id={`exchange-${exchange}`}
                  checked={selectedExchanges.includes(exchange)}
                  onCheckedChange={() => toggleExchange(exchange)}
                />
                <label
                  htmlFor={`exchange-${exchange}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {exchange}
                </label>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

