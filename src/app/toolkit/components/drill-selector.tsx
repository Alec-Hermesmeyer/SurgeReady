"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DrillScenario } from "../demo-data"
import { AlertCircle, Clock, PlayCircle, Users } from "lucide-react"

interface DrillSelectorProps {
  scenarios: DrillScenario[]
  onStartDrill: (scenario: DrillScenario) => void
}

export function DrillSelector({ scenarios, onStartDrill }: DrillSelectorProps) {
  const [selectedScenario, setSelectedScenario] = useState<DrillScenario | null>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Moderate":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "Difficult":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return ""
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Mass Casualty":
        return <Users className="h-5 w-5 text-blue-600" />
      case "Active Shooter":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case "Chemical Exposure":
        return <AlertCircle className="h-5 w-5 text-amber-600" />
      case "Natural Disaster":
        return <AlertCircle className="h-5 w-5 text-purple-600" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select Drill Scenario</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((scenario) => (
          <Card
            key={scenario.id}
            className={`cursor-pointer transition-all ${
              selectedScenario?.id === scenario.id ? "ring-2 ring-blue-500 dark:ring-blue-400" : "hover:shadow-md"
            }`}
            onClick={() => setSelectedScenario(scenario)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {getTypeIcon(scenario.type)}
                  <CardTitle className="text-lg">{scenario.name}</CardTitle>
                </div>
                <Badge className={getDifficultyColor(scenario.difficulty)}>{scenario.difficulty}</Badge>
              </div>
              <CardDescription>{scenario.type}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">{scenario.description}</p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{scenario.patientCount} patients</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{scenario.expectedDuration}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${selectedScenario?.id === scenario.id ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                variant={selectedScenario?.id === scenario.id ? "default" : "outline"}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedScenario(scenario)
                  onStartDrill(scenario)
                }}
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                {selectedScenario?.id === scenario.id ? "Start Drill" : "Select Drill"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedScenario && (
        <div className="mt-6">
          <Button
            size="lg"
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={() => onStartDrill(selectedScenario)}
          >
            <PlayCircle className="h-5 w-5 mr-2" />
            Start {selectedScenario.name} Drill
          </Button>
        </div>
      )}
    </div>
  )
}

