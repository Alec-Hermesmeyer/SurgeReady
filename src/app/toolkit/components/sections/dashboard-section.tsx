"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Activity, AlertCircle, BarChart, Calendar, CheckCircle, Clipboard, MessageSquare, Users } from "lucide-react"
import { useSimulation } from "../../hooks/use-simulation"
import { DataVisualizationDashboard } from "../data-visualization"
import { PrintReports } from "../print-reports"
import { SimulationControls } from "../simulation-control"
import type { Patient, ResourceItem, AlertMessage } from "../../demo-data"

interface DashboardSectionProps {
  emergencyMode: boolean
  drillMode: boolean
  patients: Patient[]
  resources: ResourceItem[]
  alerts: AlertMessage[]
}

export function DashboardSection({ emergencyMode, drillMode, patients, resources, alerts }: DashboardSectionProps) {
  // Calculate stats
  const patientCounts = {
    red: patients.filter((p) => p.triage === "Red").length,
    yellow: patients.filter((p) => p.triage === "Yellow").length,
    green: patients.filter((p) => p.triage === "Green").length,
    black: patients.filter((p) => p.triage === "Black").length,
    total: patients.length,
  }

  const staffCounts = {
    available: resources.find((r) => r.id === "R007")?.available || 0,
    needed: emergencyMode || drillMode ? 45 : 0,
    enRoute: emergencyMode || drillMode ? 8 : 0,
  }

  const resourceStatus = {
    beds: {
      available: resources.find((r) => r.id === "R006")?.available || 0,
      total: resources.find((r) => r.id === "R006")?.total || 0,
    },
    ventilators: {
      available: resources.find((r) => r.id === "R003")?.available || 0,
      total: resources.find((r) => r.id === "R003")?.total || 0,
    },
    ivPumps: {
      available: resources.find((r) => r.id === "R002")?.available || 0,
      total: resources.find((r) => r.id === "R002")?.total || 0,
    },
    bloodProducts: {
      status: (resources.find((r) => r.id === "R005")?.status as "Adequate" | "Limited" | "Critical") || "Adequate",
    },
  }

  const recentUpdates = alerts.slice(0, 5)

  // Add simulation state
  const simulation = useSimulation({
    intensity: "medium",
    duration: 60,
    scenarioType: "mass-casualty",
  })

  return (
    <div className="space-y-6 w-full px-4">
      {/* Patient Status Card */}
      <Card className="border-2 border-gray-200 dark:border-gray-700 w-full">
        <CardHeader
          className={`${emergencyMode ? "bg-red-600 text-white" : drillMode ? "bg-amber-500 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
        >
          <CardTitle className="flex items-center gap-2 text-xl">
            <Activity className="h-6 w-6" />
            Patient Status
          </CardTitle>
          <CardDescription className={emergencyMode || drillMode ? "text-white/80" : ""}>
            Current patient distribution
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              <PatientStatusCard
                label="Red"
                count={patientCounts.red}
                color="bg-red-600"
                textColor="text-red-600"
                active={emergencyMode || drillMode}
              />
              <PatientStatusCard
                label="Yellow"
                count={patientCounts.yellow}
                color="bg-yellow-500"
                textColor="text-yellow-600"
                active={emergencyMode || drillMode}
              />
              <PatientStatusCard
                label="Green"
                count={patientCounts.green}
                color="bg-green-600"
                textColor="text-green-600"
                active={emergencyMode || drillMode}
              />
              <PatientStatusCard
                label="Black"
                count={patientCounts.black}
                color="bg-gray-800"
                textColor="text-gray-600"
                active={emergencyMode || drillMode}
              />
            </div>

            <div className="pt-2 border-t w-full">
              <div className="flex justify-between">
                <span className="font-medium">Total Patients</span>
                <span className="font-bold text-lg">{patientCounts.total}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Data Visualization Dashboard */}
      {(emergencyMode || drillMode || simulation.isActive) && (
        <DataVisualizationDashboard
          patients={simulation.isActive ? simulation.patients : patients}
          resources={simulation.isActive ? simulation.resources : resources}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full">
        {/* Staff Status */}
        <Card className="border-2 border-gray-200 dark:border-gray-700 w-full">
          <CardHeader className="bg-gray-100 dark:bg-gray-800">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Users className="h-6 w-6" />
              Staff Status
            </CardTitle>
            <CardDescription>Available personnel</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Available Staff</p>
                  <p className="text-2xl font-bold">{staffCounts.available}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>

              {(emergencyMode || drillMode || simulation.isActive) && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Staff Needed</p>
                      <p className="text-xl font-bold">{staffCounts.needed}</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                      Shortage: {staffCounts.needed - staffCounts.available}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Staff En Route</p>
                    <p className="text-xl font-bold">{staffCounts.enRoute}</p>
                  </div>
                </>
              )}

              <Button variant="outline" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                View Staff Assignments
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resource Status */}
        <Card className="border-2 border-gray-200 dark:border-gray-700 w-full">
          <CardHeader className="bg-gray-100 dark:bg-gray-800">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Clipboard className="h-6 w-6" />
              Resource Status
            </CardTitle>
            <CardDescription>Available equipment and supplies</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Beds</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {resourceStatus.beds.available}/{resourceStatus.beds.total}
                  </span>
                  <Badge
                    className={
                      resourceStatus.beds.available < 10 ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                    }
                  >
                    {resourceStatus.beds.available < 10 ? "Limited" : "Adequate"}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Ventilators</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {resourceStatus.ventilators.available}/{resourceStatus.ventilators.total}
                  </span>
                  <Badge
                    className={
                      resourceStatus.ventilators.available < 5
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {resourceStatus.ventilators.available < 5 ? "Critical" : "Adequate"}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">IV Supplies</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {resourceStatus.ivPumps.available}/{resourceStatus.ivPumps.total}
                  </span>
                  <Badge
                    className={
                      resourceStatus.ivPumps.available < 20
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {resourceStatus.ivPumps.available < 20 ? "Limited" : "Adequate"}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Blood Products</span>
                <Badge
                  className={
                    resourceStatus.bloodProducts.status === "Limited"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-green-100 text-green-800"
                  }
                >
                  {resourceStatus.bloodProducts.status}
                </Badge>
              </div>
              <Separator className="my-2" />
              <Button variant="outline" className="w-full">
                <Clipboard className="h-4 w-4 mr-2" />
                Request Additional Resources
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {(emergencyMode || drillMode) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full">
          <Card className="md:col-span-2 border-2 border-gray-200 dark:border-gray-700 w-full">
            <CardHeader className="bg-gray-100 dark:bg-gray-800">
              <CardTitle className="flex items-center gap-2 text-xl">
                <MessageSquare className="h-6 w-6" />
                Recent Updates
              </CardTitle>
              <CardDescription>Latest information and alerts</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentUpdates.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No updates to display</p>
                  </div>
                ) : (
                  recentUpdates.map((update) => (
                    <div key={update.id} className="flex gap-3 pb-3 border-b last:border-0 last:pb-0">
                      <div
                        className={`mt-0.5 rounded-full p-1 ${
                          update.severity === "critical"
                            ? "bg-red-100 text-red-600"
                            : update.severity === "warning"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{update.message}</p>
                          {update.severity === "critical" && (
                            <Badge className="bg-red-100 text-red-800">Critical</Badge>
                          )}
                          {update.severity === "warning" && (
                            <Badge className="bg-amber-100 text-amber-800">Warning</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{update.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-4 border-t">
              <Button variant="outline" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Update
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-2 border-gray-200 dark:border-gray-700 w-full">
            <CardHeader className="bg-gray-100 dark:bg-gray-800">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Activity className="h-6 w-6" />
                Four S's Status
              </CardTitle>
              <CardDescription>Current emergency assessment</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">Space</Badge>
                    <span className="font-medium">Capacity</span>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800">Limited</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">Supplies</Badge>
                    <span className="font-medium">Resources</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Adequate</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-800">Staff</Badge>
                    <span className="font-medium">Personnel</span>
                  </div>
                  <Badge className="bg-red-100 text-red-800">Shortage</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-indigo-100 text-indigo-800">Systems</Badge>
                    <span className="font-medium">Operations</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Functional</Badge>
                </div>
                <Separator />
                <div className="text-sm text-gray-600">
                  <p>Last updated: 10:45 AM</p>
                  <p>Next assessment due: 11:00 AM</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-4 border-t">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Activity className="h-4 w-4 mr-2" />
                Update Four S's Report
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {!emergencyMode && !drillMode && (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 lg:gap-6 w-full">
          <Card className="border-2 border-gray-200 dark:border-gray-700 w-full">
            <CardHeader className="bg-gray-100 dark:bg-gray-800">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Activity className="h-6 w-6" />
                Emergency Readiness
              </CardTitle>
              <CardDescription>Current configuration status and readiness assessment</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Configuration Completion</h3>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Triage</span>
                      <Badge className="bg-green-100 text-green-800">Complete</Badge>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-green-600 h-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Charge RN</span>
                      <Badge className="bg-green-100 text-green-800">Complete</Badge>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-green-600 h-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Zone Configuration</span>
                      <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Resources</span>
                      <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Recommended Actions</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Complete zone configuration for all treatment areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Upload facility maps for each zone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Schedule a drill to test your configuration</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Drill
                  </Button>
                  <PrintReports patients={patients} resources={resources} alerts={alerts} />
                  <Button variant="outline">
                    <BarChart className="h-4 w-4 mr-2" />
                    View Readiness Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Simulation Controls */}
          <SimulationControls
            isActive={simulation.isActive}
            elapsedTime={simulation.elapsedTime}
            onStart={simulation.startSimulation}
            onStop={simulation.stopSimulation}
            onReset={() => {
              simulation.stopSimulation()
              // Reset would typically reinitialize the simulation
            }}
          />
        </div>
      )}
    </div>
  )
}

function PatientStatusCard({
  label,
  count,
  color,
  textColor,
  active,
}: {
  label: string
  count: number
  color: string
  textColor: string
  active: boolean
}) {
  return (
    <div
      className={`border rounded-lg p-4 ${active ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900"} w-full`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`font-medium ${textColor}`}>{label}</span>
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
      </div>
      <div className="text-3xl font-bold">{count}</div>
      <div className="mt-2">
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
          <div className={`h-full ${color}`} style={{ width: active ? "100%" : "0%" }}></div>
        </div>
      </div>
    </div>
  )
}

