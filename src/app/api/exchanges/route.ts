import { NextResponse } from "next/server"

export async function GET() {
  try {
    // List of exchanges we want to support
    const exchanges = ["Binance", "Kraken", "Bitfinex", "Coinbase", "Huobi"]

    return NextResponse.json({ exchanges })
  } catch (error) {
    console.error("Error fetching exchanges:", error)
    return NextResponse.json({ error: "Failed to fetch exchanges" }, { status: 500 })
  }
}

