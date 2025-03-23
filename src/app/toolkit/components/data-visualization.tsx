"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { Patient, ResourceItem } from "../demo-data"

interface PatientDistributionProps {
  patients: Patient[]
}

export function PatientDistributionChart({ patients }: PatientDistributionProps) {
  // Count patients by triage category
  const redCount = patients.filter((p) => p.triage === "Red").length
  const yellowCount = patients.filter((p) => p.triage === "Yellow").length
  const greenCount = patients.filter((p) => p.triage === "Green").length
  const blackCount = patients.filter((p) => p.triage === "Black").length

  const total = patients.length || 1 // Avoid division by zero

  // Calculate percentages
  const redPercent = (redCount / total) * 100
  const yellowPercent = (yellowCount / total) * 100
  const greenPercent = (greenCount / total) * 100
  const blackPercent = (blackCount / total) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Patient Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-8 w-full flex rounded-md overflow-hidden">
            <div
              className="bg-red-600 h-full"
              style={{ width: `${redPercent}%` }}
              title={`Red: ${redCount} patients (${redPercent.toFixed(1)}%)`}
            />
            <div
              className="bg-yellow-500 h-full"
              style={{ width: `${yellowPercent}%` }}
              title={`Yellow: ${yellowCount} patients (${yellowPercent.toFixed(1)}%)`}
            />
            <div
              className="bg-green-600 h-full"
              style={{ width: `${greenPercent}%` }}
              title={`Green: ${greenCount} patients (${greenPercent.toFixed(1)}%)`}
            />
            <div
              className="bg-gray-800 h-full"
              style={{ width: `${blackPercent}%` }}
              title={`Black: ${blackCount} patients (${blackPercent.toFixed(1)}%)`}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-600 rounded-sm"></div>
              <span className="text-sm">Red: {redCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
              <span className="text-sm">Yellow: {yellowCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
              <span className="text-sm">Green: {greenCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-800 rounded-sm"></div>
              <span className="text-sm">Black: {blackCount}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ResourceStatusProps {
  resources: ResourceItem[]
}

export function ResourceStatusChart({ resources }: ResourceStatusProps) {
  const [category, setCategory] = useState<string>("all")

  // Filter resources by category if needed
  const filteredResources = category === "all" ? resources : resources.filter((r) => r.category === category)

  // Get critical resources (less than 30% available)
  const criticalResources = filteredResources.filter((r) => r.available / r.total < 0.3)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Resource Status</CardTitle>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Supply">Supplies</SelectItem>
            <SelectItem value="Equipment">Equipment</SelectItem>
            <SelectItem value="Medication">Medications</SelectItem>
            <SelectItem value="Blood">Blood Products</SelectItem>
            <SelectItem value="Staff">Staff</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {criticalResources.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Critical Resources</h4>
              <div className="space-y-2">
                {criticalResources.map((resource) => (
                  <div key={resource.id} className="flex justify-between items-center">
                    <span>{resource.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {resource.available}/{resource.total}
                      </span>
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                        {Math.round((resource.available / resource.total) * 100)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{resource.name}</span>
                  <span className="font-medium">
                    {resource.available}/{resource.total}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      (resource.available / resource.total) < 0.3
                        ? "bg-red-600"
                        : resource.available / resource.total < 0.6
                          ? "bg-yellow-500"
                          : "bg-green-600"
                    }`}
                    style={{ width: `${(resource.available / resource.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface PatientStatusTimelineProps {
  patients: Patient[]
}

export function PatientStatusTimeline({ patients }: PatientStatusTimelineProps) {
  // This would show patient status changes over time
  // For demo purposes, we'll create some mock timeline data
  const timePoints = ["10:15", "10:30", "10:45", "11:00", "11:15", "11:30"]

  // Mock data showing patient counts at different time points
  const mockData = [
    { time: "10:15", red: 2, yellow: 3, green: 1, black: 0 },
    { time: "10:30", red: 4, yellow: 5, green: 3, black: 1 },
    { time: "10:45", red: 5, yellow: 8, green: 6, black: 1 },
    { time: "11:00", red: 4, yellow: 10, green: 8, black: 2 },
    { time: "11:15", red: 3, yellow: 9, green: 10, black: 2 },
    { time: "11:30", red: 3, yellow: 8, green: 12, black: 2 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Patient Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-40 relative">
            {/* X-axis (time) */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between border-t">
              {timePoints.map((time) => (
                <div key={time} className="text-xs text-gray-500">
                  {time}
                </div>
              ))}
            </div>

            {/* Chart lines */}
            <div className="absolute inset-0 pt-4 pb-6">
              {/* Red line */}
              <svg className="w-full h-full" preserveAspectRatio="none">
                <polyline
                  points="0,80 20,60 40,55 60,60 80,70 100,70"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2"
                  className="w-full"
                />
              </svg>

              {/* Yellow line */}
              <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none">
                <polyline
                  points="0,75 20,55 40,40 60,30 80,35 100,40"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="2"
                  className="w-full"
                />
              </svg>

              {/* Green line */}
              <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none">
                <polyline
                  points="0,85 20,75 40,50 60,40 80,30 100,20"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2"
                  className="w-full"
                />
              </svg>

              {/* Black line */}
              <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none">
                <polyline
                  points="0,90 20,85 40,85 60,80 80,80 100,80"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="2"
                  className="w-full"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-red-600"></div>
              <span className="text-sm">Red</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-yellow-500"></div>
              <span className="text-sm">Yellow</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-green-600"></div>
              <span className="text-sm">Green</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-gray-800"></div>
              <span className="text-sm">Black</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function DataVisualizationDashboard({
  patients,
  resources,
}: { patients: Patient[]; resources: ResourceItem[] }) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="distribution">
        <TabsList>
          <TabsTrigger value="distribution">Patient Distribution</TabsTrigger>
          <TabsTrigger value="resources">Resource Status</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="distribution" className="pt-4">
          <PatientDistributionChart patients={patients} />
        </TabsContent>

        <TabsContent value="resources" className="pt-4">
          <ResourceStatusChart resources={resources} />
        </TabsContent>

        <TabsContent value="timeline" className="pt-4">
          <PatientStatusTimeline patients={patients} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

