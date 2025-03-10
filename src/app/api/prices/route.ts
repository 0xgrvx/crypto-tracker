import { NextResponse } from "next/server"

// Mock data for development to avoid CCXT issues
const mockPrices = {
  Binance: {
    "BTC/USDT": 65432.1,
    "ETH/USDT": 3456.78,
    "SOL/USDT": 145.67,
    "XRP/USDT": 0.5678,
    "ADA/USDT": 0.4321,
    "DOT/USDT": 6.789,
    "DOGE/USDT": 0.1234,
    "AVAX/USDT": 34.56,
    "MATIC/USDT": 0.789,
    "LINK/USDT": 15.67,
  },
  Kraken: {
    "BTC/USDT": 65478.9,
    "ETH/USDT": 3467.89,
    "SOL/USDT": 146.78,
    "XRP/USDT": 0.5689,
    "ADA/USDT": 0.4345,
    "DOT/USDT": 6.801,
    "DOGE/USDT": 0.1245,
    "AVAX/USDT": 34.78,
    "MATIC/USDT": 0.792,
    "LINK/USDT": 15.78,
  },
  Bitfinex: {
    "BTC/USDT": 65398.76,
    "ETH/USDT": 3445.67,
    "SOL/USDT": 144.56,
    "XRP/USDT": 0.5667,
    "ADA/USDT": 0.4301,
    "DOT/USDT": 6.776,
    "DOGE/USDT": 0.1223,
    "AVAX/USDT": 34.45,
    "MATIC/USDT": 0.785,
    "LINK/USDT": 15.56,
  },
  Coinbase: {
    "BTC/USDT": 65501.23,
    "ETH/USDT": 3470.12,
    "SOL/USDT": 147.12,
    "XRP/USDT": 0.5701,
    "ADA/USDT": 0.4356,
    "DOT/USDT": 6.823,
    "DOGE/USDT": 0.1256,
    "AVAX/USDT": 34.89,
    "MATIC/USDT": 0.798,
    "LINK/USDT": 15.89,
  },
  Huobi: {
    "BTC/USDT": 65412.45,
    "ETH/USDT": 3450.34,
    "SOL/USDT": 145.23,
    "XRP/USDT": 0.5671,
    "ADA/USDT": 0.4312,
    "DOT/USDT": 6.781,
    "DOGE/USDT": 0.1229,
    "AVAX/USDT": 34.51,
    "MATIC/USDT": 0.787,
    "LINK/USDT": 15.61,
  },
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const exchanges = searchParams.getAll("exchanges")
  const currencies = searchParams.getAll("currencies")

  if (!exchanges.length || !currencies.length) {
    return NextResponse.json({ error: "Exchanges and currencies are required" }, { status: 400 })
  }

  try {
    // For development, use mock data instead of actual API calls
    // In production, you would use the CCXT library here
    const prices: Record<string, Record<string, number>> = {}

    exchanges.forEach((exchange) => {
      prices[exchange] = {}
      currencies.forEach((currency) => {
        if (mockPrices[exchange as keyof typeof mockPrices]?.[currency as keyof (typeof mockPrices)[keyof typeof mockPrices]]) {
          // Add some random variation to make the data more realistic
          const basePrice = mockPrices[exchange as keyof typeof mockPrices][currency as keyof (typeof mockPrices)[keyof typeof mockPrices]]
          const variation = Math.random() * 0.01 - 0.005 // ±0.5%
          prices[exchange][currency] = basePrice * (1 + variation)
        }
      })
    })

    return NextResponse.json({ prices })
  } catch (error: unknown) {
    console.error("Error fetching prices:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: "Failed to fetch prices", message: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Failed to fetch prices" }, { status: 500 })
  }
}
