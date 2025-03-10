"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { fetchExchanges } from "@/lib/api"

interface ExchangesContextType {
  availableExchanges: string[]
  selectedExchanges: string[]
  toggleExchange: (exchange: string) => void
  loading: boolean
}

const ExchangesContext = createContext<ExchangesContextType>({
  availableExchanges: [],
  selectedExchanges: [],
  toggleExchange: () => {},
  loading: true,
})

export function ExchangesProvider({ children }: { children: React.ReactNode }) {
  const [availableExchanges, setAvailableExchanges] = useState<string[]>([])
  const [selectedExchanges, setSelectedExchanges] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getExchanges = async () => {
      try {
        const exchanges = await fetchExchanges()
        setAvailableExchanges(exchanges)
        // Default select the first 3 exchanges
        setSelectedExchanges(exchanges.slice(0, 3))
      } catch (error) {
        console.error("Failed to fetch exchanges:", error)
      } finally {
        setLoading(false)
      }
    }

    getExchanges()
  }, [])

  const toggleExchange = (exchange: string) => {
    setSelectedExchanges((prev) => (prev.includes(exchange) ? prev.filter((e) => e !== exchange) : [...prev, exchange]))
  }

  return (
    <ExchangesContext.Provider value={{ availableExchanges, selectedExchanges, toggleExchange, loading }}>
      {children}
    </ExchangesContext.Provider>
  )
}

export function useExchanges() {
  return useContext(ExchangesContext)
}

