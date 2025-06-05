"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  AlertTriangle, 
  Building, 
  Car, 
  ChevronRight, 
  Clock, 
  Flame, 
  Play, 
  Shield, 
  Target, 
  Truck, 
  Users, 
  Zap,
  MapPin,
  AlertCircle,
  CheckCircle
} from "lucide-react"
import { emergencyScenarios, type EmergencyScenario } from "../demo-scenarios"

interface ScenarioManagerProps {
  onStartScenario: (scenario: EmergencyScenario) => void
  onStartDrill: (scenario: EmergencyScenario) => void
  isActive: boolean
}

const scenarioIcons = {
  "mass-casualty": Car,
  "active-shooter": Shield,
  "chemical": Flame,
  "natural-disaster": Building,
  "pandemic": Zap,
  "building-collapse": Building,
}

const severityColors = {
  low: "bg-blue-100 text-blue-800 border-blue-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  high: "bg-orange-100 text-orange-800 border-orange-200",
  extreme: "bg-red-100 text-red-800 border-red-200",
}

export function ScenarioManager({ onStartScenario, onStartDrill, isActive }: ScenarioManagerProps) {
  const [selectedScenario, setSelectedScenario] = useState<EmergencyScenario | null>(null)
  const [filterType, setFilterType] = useState<string>("all")
  const [filterSeverity, setFilterSeverity] = useState<string>("all")

  const filteredScenarios = emergencyScenarios.filter(scenario => {
    const typeMatch = filterType === "all" || scenario.type === filterType
    const severityMatch = filterSeverity === "all" || scenario.severity === filterSeverity
    return typeMatch && severityMatch
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-6 w-6" />
          Emergency Scenario Manager
        </CardTitle>
        <CardDescription>
          Select and run realistic emergency scenarios for training and system testing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Scenario Type</label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="mass-casualty">Mass Casualty</SelectItem>
                <SelectItem value="active-shooter">Active Shooter</SelectItem>
                <SelectItem value="chemical">Chemical/HAZMAT</SelectItem>
                <SelectItem value="natural-disaster">Natural Disaster</SelectItem>
                <SelectItem value="pandemic">Pandemic</SelectItem>
                <SelectItem value="building-collapse">Building Collapse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Severity Level</label>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger>
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="extreme">Extreme</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Scenario Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredScenarios.map((scenario) => (
            <ScenarioCard 
              key={scenario.id} 
              scenario={scenario} 
              onSelect={setSelectedScenario}
              isDisabled={isActive}
            />
          ))}
        </div>

        {filteredScenarios.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No scenarios match the selected filters
          </div>
        )}

        {/* Scenario Details Dialog */}
        {selectedScenario && (
          <ScenarioDetailsDialog
            scenario={selectedScenario}
            open={!!selectedScenario}
            onOpenChange={(open) => !open && setSelectedScenario(null)}
            onStartScenario={() => {
              onStartScenario(selectedScenario)
              setSelectedScenario(null)
            }}
            onStartDrill={() => {
              onStartDrill(selectedScenario)
              setSelectedScenario(null)
            }}
            isDisabled={isActive}
          />
        )}
      </CardContent>
    </Card>
  )
}

function ScenarioCard({ scenario, onSelect, isDisabled }: {
  scenario: EmergencyScenario
  onSelect: (scenario: EmergencyScenario) => void
  isDisabled: boolean
}) {
  const Icon = scenarioIcons[scenario.type] || AlertTriangle

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-300'}`}
      onClick={() => !isDisabled && onSelect(scenario)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Icon className="h-6 w-6 text-blue-600" />
          <Badge className={severityColors[scenario.severity]}>
            {scenario.severity.toUpperCase()}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight">{scenario.name}</CardTitle>
        <CardDescription className="text-sm">{scenario.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Duration
            </span>
            <span className="font-medium">{Math.floor(scenario.estimatedDuration / 60)}h {scenario.estimatedDuration % 60}m</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Patients
            </span>
            <span className="font-medium">{scenario.expectedPatients}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <Truck className="h-4 w-4" />
              Resource Impact
            </span>
            <Badge variant="outline" className="text-xs">
              {scenario.resourceIntensity.toUpperCase()}
            </Badge>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full mt-3" disabled={isDisabled}>
          View Details
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

function ScenarioDetailsDialog({ 
  scenario, 
  open, 
  onOpenChange, 
  onStartScenario, 
  onStartDrill,
  isDisabled 
}: {
  scenario: EmergencyScenario
  open: boolean
  onOpenChange: (open: boolean) => void
  onStartScenario: () => void
  onStartDrill: () => void
  isDisabled: boolean
}) {
  const Icon = scenarioIcons[scenario.type] || AlertTriangle

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-2xl z-50">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Icon className="h-8 w-8 text-blue-600" />
            <div>
              <DialogTitle className="text-xl">{scenario.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-1">
                <Badge className={severityColors[scenario.severity]}>
                  {scenario.severity.toUpperCase()}
                </Badge>
                <span>•</span>
                <span>{Math.floor(scenario.estimatedDuration / 60)}h {scenario.estimatedDuration % 60}m</span>
                <span>•</span>
                <span>{scenario.expectedPatients} patients expected</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="objectives" className="data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">Objectives</TabsTrigger>
            <TabsTrigger value="challenges" className="data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">Challenges</TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="font-semibold mb-2">Scenario Briefing</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {scenario.briefing}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Arrival Pattern</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium capitalize">{scenario.patientArrivalPattern}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Resource Intensity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium capitalize">{scenario.resourceIntensity}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Initial Patients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">{scenario.initialPatients || 0} arriving immediately</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="objectives" className="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="font-semibold mb-3">Training Objectives</h4>
              <div className="space-y-2">
                {scenario.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{objective}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Resource Challenges
                </h4>
                <div className="space-y-2">
                  {scenario.resourceChallenges.map((challenge, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Communication Challenges
                </h4>
                <div className="space-y-2">
                  {scenario.communicationChallenges.map((challenge, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="font-semibold mb-3">Scenario Timeline</h4>
              <div className="space-y-4">
                {scenario.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-16 text-sm font-medium text-gray-500">
                      T+{event.timeMinutes}m
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            event.severity === 'critical' ? 'border-red-300 text-red-700' :
                            event.severity === 'warning' ? 'border-yellow-300 text-yellow-700' :
                            'border-blue-300 text-blue-700'
                          }`}
                        >
                          {event.title}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                        {event.description}
                      </p>
                      <p className="text-xs text-gray-500 italic">
                        Impact: {event.impact}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant="secondary" 
            onClick={onStartDrill}
            disabled={isDisabled}
            className="bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300"
          >
            <Play className="h-4 w-4 mr-2" />
            Start as Drill
          </Button>
          <Button 
            onClick={onStartScenario}
            disabled={isDisabled}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Emergency
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 