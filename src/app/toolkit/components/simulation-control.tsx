"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Play, Pause, RotateCcw, Clock, Zap } from "lucide-react"

interface SimulationControlsProps {
  isActive: boolean
  elapsedTime: number
  onStart: (options: {
    intensity: "low" | "medium" | "high"
    duration: number
    scenarioType: string
  }) => void
  onStop: () => void
  onReset: () => void
}

export function SimulationControls({ isActive, elapsedTime, onStart, onStop, onReset }: SimulationControlsProps) {
  const [intensity, setIntensity] = useState<"low" | "medium" | "high">("medium")
  const [duration, setDuration] = useState(60) // minutes
  const [scenarioType, setScenarioType] = useState("mass-casualty")
  const [autoAdvance, setAutoAdvance] = useState(true)

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = () => {
    onStart({
      intensity,
      duration,
      scenarioType,
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Simulation Controls
          </CardTitle>
          {isActive && (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Active</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isActive ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-500">Elapsed Time:</span>
              </div>
              <span className="font-mono text-lg font-bold">{formatTime(elapsedTime)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Auto-advance time:</span>
              <div className="flex items-center gap-2">
                <Switch checked={autoAdvance} onCheckedChange={setAutoAdvance} id="auto-advance" />
                <Label htmlFor="auto-advance" className="sr-only">
                  Auto-advance time
                </Label>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <span className="font-medium text-amber-800 dark:text-amber-300">Simulation Active</span>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                The simulation is running with {intensity} intensity. New patients and events will occur automatically.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="scenario-type" className="mb-2 block">
                Scenario Type
              </Label>
              <Select value={scenarioType} onValueChange={setScenarioType}>
                <SelectTrigger id="scenario-type">
                  <SelectValue placeholder="Select scenario type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mass-casualty">Mass Casualty Incident</SelectItem>
                  <SelectItem value="active-shooter">Active Shooter</SelectItem>
                  <SelectItem value="chemical">Chemical Exposure</SelectItem>
                  <SelectItem value="natural-disaster">Natural Disaster</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label htmlFor="intensity">Intensity</Label>
                <span className="text-sm font-medium capitalize">{intensity}</span>
              </div>
              <Select value={intensity} onValueChange={(value) => setIntensity(value as "low" | "medium" | "high")}>
                <SelectTrigger id="intensity">
                  <SelectValue placeholder="Select intensity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">Controls the frequency of events and patient arrivals</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <span className="text-sm font-medium">{duration}</span>
              </div>
              <Slider
                id="duration"
                min={15}
                max={120}
                step={15}
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {isActive ? (
          <>
            <Button variant="outline" onClick={onReset} className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button variant="destructive" onClick={onStop} className="flex items-center gap-2">
              <Pause className="h-4 w-4" />
              Stop Simulation
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" disabled>
              Last run: Never
            </Button>
            <Button onClick={handleStart} className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              <Play className="h-4 w-4" />
              Start Simulation
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

