"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { useRefreshInterval } from "@/hooks/use-refresh-interval"

export function RefreshInterval() {
  const { refreshInterval, setRefreshInterval } = useRefreshInterval()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Refresh Interval</CardTitle>
        <CardDescription>Set how often to update prices</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Slider
            value={[refreshInterval]}
            onValueChange={(value) => setRefreshInterval(value[0])}
            min={5}
            max={60}
            step={5}
          />
          <div className="text-center text-sm text-muted-foreground">{refreshInterval} seconds</div>
        </div>
      </CardContent>
    </Card>
  )
}

