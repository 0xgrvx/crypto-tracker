"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { fetchCurrencies } from "@/lib/api"

interface CurrenciesContextType {
  availableCurrencies: string[]
  selectedCurrencies: string[]
  toggleCurrency: (currency: string) => void
  loading: boolean
}

const CurrenciesContext = createContext<CurrenciesContextType>({
  availableCurrencies: [],
  selectedCurrencies: [],
  toggleCurrency: () => {},
  loading: true,
})

export function CurrenciesProvider({ children }: { children: React.ReactNode }) {
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([])
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const currencies = await fetchCurrencies()
        setAvailableCurrencies(currencies)
        // Default select the first 5 currencies
        setSelectedCurrencies(currencies.slice(0, 5))
      } catch (error) {
        console.error("Failed to fetch currencies:", error)
      } finally {
        setLoading(false)
      }
    }

    getCurrencies()
  }, [])

  const toggleCurrency = (currency: string) => {
    setSelectedCurrencies((prev) =>
      prev.includes(currency) ? prev.filter((c) => c !== currency) : [...prev, currency],
    )
  }

  return (
    <CurrenciesContext.Provider value={{ availableCurrencies, selectedCurrencies, toggleCurrency, loading }}>
      {children}
    </CurrenciesContext.Provider>
  )
}

export function useCurrencies() {
  return useContext(CurrenciesContext)
}

