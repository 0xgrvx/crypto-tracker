"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useCurrencies } from "@/hooks/use-currencies"
import { Loader2 } from "lucide-react"

export function CurrencySelector() {
  const { availableCurrencies, selectedCurrencies, toggleCurrency, loading } = useCurrencies()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Currencies</CardTitle>
        <CardDescription>Select cryptocurrencies to track</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {availableCurrencies.map((currency) => (
              <div key={currency} className="flex items-center space-x-2">
                <Checkbox
                  id={`currency-${currency}`}
                  checked={selectedCurrencies.includes(currency)}
                  onCheckedChange={() => toggleCurrency(currency)}
                />
                <label
                  htmlFor={`currency-${currency}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {currency}
                </label>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

