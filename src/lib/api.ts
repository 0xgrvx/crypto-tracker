export async function fetchExchanges(): Promise<string[]> {
  const response = await fetch("/api/exchanges")
  const data = await response.json()
  return data.exchanges
}

export async function fetchCurrencies(): Promise<string[]> {
  const response = await fetch("/api/currencies")
  const data = await response.json()
  return data.currencies
}

export async function fetchPrices(
  exchanges: string[],
  currencies: string[],
): Promise<Record<string, Record<string, number>>> {
  const params = new URLSearchParams()
  exchanges.forEach((exchange) => params.append("exchanges", exchange))
  currencies.forEach((currency) => params.append("currencies", currency))

  try {
    const response = await fetch(`/api/prices?${params.toString()}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API error (${response.status}):`, errorText)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.prices
  } catch (error) {
    console.error("Error in fetchPrices:", error)
    // Return empty object instead of throwing to prevent UI crashes
    return {}
  }
}

