"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"

interface RefreshIntervalContextType {
  refreshInterval: number
  setRefreshInterval: (interval: number) => void
}

const RefreshIntervalContext = createContext<RefreshIntervalContextType>({
  refreshInterval: 30,
  setRefreshInterval: () => {},
})

export function RefreshIntervalProvider({ children }: { children: React.ReactNode }) {
  const [refreshInterval, setRefreshInterval] = useState(30)

  return (
    <RefreshIntervalContext.Provider value={{ refreshInterval, setRefreshInterval }}>
      {children}
    </RefreshIntervalContext.Provider>
  )
}

export function useRefreshInterval() {
  return useContext(RefreshIntervalContext)
}

