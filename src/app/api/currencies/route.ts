import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Common cryptocurrency pairs to track
    const currencies = [
      "BTC/USDT",
      "ETH/USDT",
      "SOL/USDT",
      "XRP/USDT",
      "ADA/USDT",
      "DOT/USDT",
      "DOGE/USDT",
      "AVAX/USDT",
      "MATIC/USDT",
      "LINK/USDT",
    ]

    return NextResponse.json({ currencies })
  } catch (error) {
    console.error("Error fetching currencies:", error)
    return NextResponse.json({ error: "Failed to fetch currencies" }, { status: 500 })
  }
}

