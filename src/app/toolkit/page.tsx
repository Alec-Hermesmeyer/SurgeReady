"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertCircle,
  Bell,
  Clipboard,
  Map,
  PlayCircle,
  X,
  Activity,
  Users,
  Cog,
  Printer,
  Save,
  Home,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DemoTourButton } from "./components/demo-tour"

// Import section components
import { TriageSection } from "./components/sections/triage-section"
import { ChargeRNSection } from "./components/sections/charge-rn-section"
import { ZoneSection } from "./components/sections/zone-section"
import { DashboardSection } from "./components/sections/dashboard-section"

// Import demo data and components
import {
  samplePatients,
  sampleResources,
  sampleAlerts,
  sampleDrillScenarios,
  type Patient,
  type ResourceItem,
  type AlertMessage,
  type DrillScenario,
} from "./demo-data"
import { PatientTable } from "./components/patient-table"
import { ResourceManagement } from "./components/resource-management"
import { AlertCenter } from "./components/alert-center"
import { DrillSelector } from "./components/drill-selector"
import { ResourcesConfigSection } from "./components/resources-config"

export default function ToolkitPage() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [saved, setSaved] = useState(false)
  const [emergencyMode, setEmergencyMode] = useState(false)
  const [drillMode, setDrillMode] = useState(false)
  const [emergencyType, setEmergencyType] = useState("")
  const [activationTime, setActivationTime] = useState("")
  const [activeDrillScenario, setActiveDrillScenario] = useState<DrillScenario | null>(null)

  // Demo data state
  const [patients, setPatients] = useState<Patient[]>([])
  const [resources, setResources] = useState<ResourceItem[]>([])
  const [alerts, setAlerts] = useState<AlertMessage[]>([])

  // Configuration state
  const [triageConfig, setTriageConfig] = useState({
    communicationType: "radio",
    disasterSuppliesLocation: "ED Supply Room, Cabinet A - Disaster Supplies",
    triageSystem: "start",
    supportStaffRoles: {
      runners: true,
      transporters: true,
      housekeeping: false,
      other: false,
    },
    otherRoles: "",
  })

  const [chargeRNConfig, setChargeRNConfig] = useState({
    canCallDisaster: {
      edMD: true,
      supervisor: true,
      admin: true,
      other: false,
    },
    facilityCode: "Code Triage",
    resourceCoordinator: "Charge Nurse or designee",
    hazmatResponse: "Hospital Safety Officer and trained Hazmat team",
    zoneLocations:
      "Red Zone: ED Rooms 1-5\nYellow Zone: ED Rooms 6-10\nGreen Zone: ED Waiting Area\nBlack Zone: ED Room 12 (isolated)",
    communicationMethod: "radio",
    downtimeProcedures: "Use paper forms located in disaster cart. Runner system for communication.",
  })

  const [zoneConfigs, setZoneConfigs] = useState({
    red: {
      communication: "radio",
      location: "ED Rooms 1-5, Trauma Bays",
      teamRoles: {
        medRN: true,
        labRunner: true,
        pivStarter: true,
        transporter: true,
        vitals: true,
        other: false,
      },
      otherRoles: "",
    },
    yellow: {
      communication: "radio",
      location: "ED Rooms 6-10, Overflow Area A",
      teamRoles: {
        medRN: true,
        labRunner: true,
        pivStarter: true,
        transporter: true,
        vitals: true,
        other: false,
      },
      otherRoles: "",
    },
    green: {
      communication: "radio",
      location: "ED Waiting Area, Conference Rooms A & B",
      teamRoles: {
        medRN: true,
        labRunner: false,
        pivStarter: false,
        transporter: true,
        vitals: true,
        other: "Registration staff, Volunteer coordinator",
      },
      otherRoles: "Registration staff, Volunteer coordinator",
    },
    black: {
      communication: "radio",
      location: "ED Room 12 (isolated), Morgue",
      teamRoles: {
        medRN: true,
        labRunner: false,
        pivStarter: false,
        transporter: true,
        vitals: false,
        other: true,
      },
      otherRoles: "Chaplain, Security, Documentation specialist",
    },
  })

  const [resourcesConfig, setResourcesConfig] = useState({
    criticalSupplies: [
      { name: "Tourniquets", quantity: 30, location: "Supply Cabinet A" },
      { name: "IV Supplies", quantity: 60, location: "Supply Cabinet B" },
      { name: "Airway Management Supplies", quantity: 25, location: "Airway Cart" },
      { name: "Stretchers", quantity: 20, location: "Hallway Storage" },
      { name: "Wheelchairs", quantity: 15, location: "ED Entrance" },
    ],
    equipment: [
      { name: "Cardiac Monitors", quantity: 15, location: "Equipment Room" },
      { name: "Ventilators", quantity: 10, location: "Equipment Room" },
      { name: "IV Pumps", quantity: 40, location: "Equipment Room" },
      { name: "Portable Ultrasound", quantity: 3, location: "Imaging Department" },
      { name: "Portable X-Ray", quantity: 2, location: "Imaging Department" },
    ],
    bloodBank: {
      contact: "Blood Bank Supervisor: Ext. 5432",
      emergencyReleaseProtocol:
        "For emergency release, call Blood Bank Supervisor. O-negative available for immediate release without full crossmatch.",
      productsAvailable: {
        oNegative: true,
        oPositive: true,
        plasma: true,
        platelets: true,
        cryo: true,
      },
      massiveTransfusionProtocol:
        "Activate via ED Attending or Trauma Surgeon. 1:1:1 ratio of PRBCs, plasma, and platelets.",
    },
    externalResources: {
      contacts:
        "EMS Dispatch: 555-123-4567\nPolice Department: 555-123-7890\nFire Department: 555-123-4561\nRegional Hospital Coordination Center: 555-123-9876",
      mutualAid:
        "Mutual aid agreements with Memorial Hospital and County General for staff, supplies, and patient transfers during mass casualty events.",
    },
  })

  // Initialize with empty data, then populate when emergency/drill mode is activated
  useEffect(() => {
    if (emergencyMode || drillMode) {
      setPatients(samplePatients)
      setResources(sampleResources)
      setAlerts(sampleAlerts)
    } else {
      setPatients([])
      setResources([])
      setAlerts([])
    }
  }, [emergencyMode, drillMode])

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const toggleEmergencyMode = () => {
    if (!emergencyMode) {
      setDrillMode(false)
      setActiveDrillScenario(null)
      setActivationTime(new Date().toLocaleTimeString())
      // In a real app, you would also trigger notifications, etc.
    } else {
      // Reset everything when deactivating
      setPatients([])
      setResources([])
      setAlerts([])
    }
    setEmergencyMode(!emergencyMode)
  }

  const toggleDrillMode = () => {
    if (!drillMode) {
      setEmergencyMode(false)
      setActivationTime(new Date().toLocaleTimeString())
    } else {
      // Reset everything when deactivating
      setPatients([])
      setResources([])
      setAlerts([])
      setActiveDrillScenario(null)
    }
    setDrillMode(!drillMode)
  }

  const startDrillScenario = (scenario: DrillScenario) => {
    setDrillMode(true)
    setEmergencyMode(false)
    setEmergencyType(scenario.type)
    setActiveDrillScenario(scenario)
    setActivationTime(new Date().toLocaleTimeString())

    // Add a system alert about the drill
    const newAlert: AlertMessage = {
      id: `A${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      message: `Drill Mode Activated: ${scenario.name}`,
      severity: "info",
      sender: "System",
      read: false,
    }
    setAlerts((prev) => [newAlert, ...prev])
  }

  // Patient management functions
  const handleAddPatient = (patient: Patient) => {
    setPatients((prev) => [patient, ...prev])

    // Add an alert about the new patient
    const newAlert: AlertMessage = {
      id: `A${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      message: `New ${patient.triage} patient arrived: ${patient.name}`,
      severity: patient.triage === "Red" ? "critical" : patient.triage === "Yellow" ? "warning" : "info",
      sender: "Triage",
      read: false,
    }
    setAlerts((prev) => [newAlert, ...prev])
  }

  const handleUpdatePatient = (updatedPatient: Patient) => {
    setPatients((prev) => prev.map((patient) => (patient.id === updatedPatient.id ? updatedPatient : patient)))

    // Add an alert if triage level changed
    const originalPatient = patients.find((p) => p.id === updatedPatient.id)
    if (originalPatient && originalPatient.triage !== updatedPatient.triage) {
      const newAlert: AlertMessage = {
        id: `A${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        message: `Patient ${updatedPatient.name} re-triaged from ${originalPatient.triage} to ${updatedPatient.triage}`,
        severity:
          updatedPatient.triage === "Red" ? "critical" : updatedPatient.triage === "Yellow" ? "warning" : "info",
        sender: "Triage",
        read: false,
      }
      setAlerts((prev) => [newAlert, ...prev])
    }
  }

  // Resource management functions
  const handleUpdateResource = (updatedResource: ResourceItem) => {
    setResources((prev) => prev.map((resource) => (resource.id === updatedResource.id ? updatedResource : resource)))
  }

  const handleRequestResource = (resource: ResourceItem, quantity: number) => {
    // In a real app, this would send a request to the appropriate department
    const newAlert: AlertMessage = {
      id: `A${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      message: `Resource request: ${quantity} ${resource.name}`,
      severity: "info",
      sender: "You",
      read: false,
    }
    setAlerts((prev) => [newAlert, ...prev])
  }

  // Alert management functions
  const handleSendAlert = (alert: Omit<AlertMessage, "id" | "time" | "read">) => {
    const newAlert: AlertMessage = {
      id: `A${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      ...alert,
      read: false,
    }
    setAlerts((prev) => [newAlert, ...prev])
  }

  const handleMarkAlertAsRead = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert)))
  }

  const handleMarkAllAlertsAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })))
  }

  // Timer for emergency mode
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (emergencyMode || drillMode) {
      setElapsedTime(0)
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [emergencyMode, drillMode])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  }

  // All sections including both operational and configuration sections
  const sections = [
    // Operational sections
    { id: "dashboard", name: "Dashboard", icon: <Home className="h-5 w-5" />, category: "operational" },
    { id: "patients", name: "Patients", icon: <Users className="h-5 w-5" />, category: "operational" },
    { id: "resources", name: "Resources", icon: <Clipboard className="h-5 w-5" />, category: "operational" },
    { id: "alerts", name: "Alerts", icon: <Bell className="h-5 w-5" />, category: "operational" },
    { id: "drills", name: "Drills", icon: <PlayCircle className="h-5 w-5" />, category: "operational" },

    // Configuration sections
    { id: "triage", name: "Triage Config", icon: <Activity className="h-5 w-5" />, category: "config" },
    { id: "charge", name: "Charge RN Config", icon: <Users className="h-5 w-5" />, category: "config" },
    { id: "red", name: "Red Zone Config", icon: <AlertCircle className="h-5 w-5 text-red-600" />, category: "config" },
    {
      id: "yellow",
      name: "Yellow Zone Config",
      icon: <AlertCircle className="h-5 w-5 text-yellow-600" />,
      category: "config",
    },
    {
      id: "green",
      name: "Green Zone Config",
      icon: <AlertCircle className="h-5 w-5 text-green-600" />,
      category: "config",
    },
    {
      id: "black",
      name: "Black Zone Config",
      icon: <AlertCircle className="h-5 w-5 text-gray-600" />,
      category: "config",
    },
    { id: "resourcesConfig", name: "Resources Config", icon: <Cog className="h-5 w-5" />, category: "config" },
  ]

  // Filter sections based on mode
  const operationalSections = sections.filter((section) => section.category === "operational")
  const configSections = sections.filter((section) => section.category === "config")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      {/* Emergency Mode Banner - Always visible when active */}
      {(emergencyMode || drillMode) && (
        <div
          className={`sticky top-0 z-50 w-full py-3 px-4 ${
            emergencyMode ? "bg-red-600 text-white" : "bg-amber-500 text-white"
          }`}
          style={{ width: "100%" }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {emergencyMode ? <AlertCircle className="h-5 w-5 animate-pulse" /> : <PlayCircle className="h-5 w-5" />}
              <span className="font-bold text-lg">
                {emergencyMode ? "EMERGENCY MODE ACTIVE" : "DRILL MODE ACTIVE"}
                {activeDrillScenario && `: ${activeDrillScenario.name}`}
              </span>
              <span className="hidden md:inline-block">
                - {emergencyType || "Mass Casualty Event"} - Activated at {activationTime}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono">{formatTime(elapsedTime)}</span>
              <Button
                size="sm"
                variant="outline"
                className="ml-2 bg-white/20 hover:bg-white/30 border-white/40"
                onClick={emergencyMode ? toggleEmergencyMode : toggleDrillMode}
              >
                <X className="h-4 w-4 mr-1" />
                {emergencyMode ? "End Emergency" : "End Drill"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <div
        className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 w-full sticky top-0 z-40"
        style={{ top: emergencyMode || drillMode ? "49px" : 0 }}
      >
        <div className="w-full px-4 py-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <h1 className="text-xl font-bold mr-6">Emergency Toolkit</h1>
              {saved && (
                <Badge className="bg-green-600 flex items-center gap-1">
                  <span className="text-white">Saved</span>
                </Badge>
              )}
            </div>

            {!emergencyMode && !drillMode && (
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Activate Emergency
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Activate Emergency Mode</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to activate Emergency Mode? This will notify all designated staff and
                        activate emergency protocols.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Label htmlFor="emergency-type" className="mb-2 block">
                        Emergency Type
                      </Label>
                      <Select onValueChange={setEmergencyType}>
                        <SelectTrigger id="emergency-type">
                          <SelectValue placeholder="Select emergency type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mass Casualty Incident">Mass Casualty Incident</SelectItem>
                          <SelectItem value="Active Shooter">Active Shooter</SelectItem>
                          <SelectItem value="Natural Disaster">Natural Disaster</SelectItem>
                          <SelectItem value="Chemical Exposure">Chemical Exposure</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {}}>
                        Cancel
                      </Button>
                      <Button className="bg-red-600 hover:bg-red-700" onClick={toggleEmergencyMode}>
                        Activate Emergency Mode
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button onClick={toggleDrillMode} variant="outline">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Start Drill Mode
                </Button>

                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            )}

            {(emergencyMode || drillMode) && (
              <div className="flex items-center gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Bell className="h-4 w-4 mr-2" />
                  Send Alert
                </Button>
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Protocols
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Section Navigation with Tabs for Operational vs Configuration */}
        <div className="px-4 pt-2">
          <Tabs defaultValue="operational" className="w-full">
            <TabsList className="mb-2">
              <TabsTrigger value="operational" className="flex items-center gap-1 mr-4">
                <Activity className="h-4 w-4" />
                <span>Operations</span>
              </TabsTrigger>
              <TabsTrigger value="configuration" className="flex items-center gap-1 ml-4">
                <Cog className="h-4 w-4" />
                <span>Configuration</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="operational" className="mt-0">
              <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="flex space-x-1 min-w-max">
                  {operationalSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                        activeSection === section.id
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      {section.icon}
                      <span>{section.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="configuration" className="mt-0">
              <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="flex space-x-1 min-w-max">
                  {configSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                        activeSection === section.id
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      {section.icon}
                      <span>{section.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full p-4">
        {/* Emergency Quick Actions - Always visible in emergency mode */}
        {(emergencyMode || drillMode) && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 w-full">
            <Button className="bg-blue-600 hover:bg-blue-700 h-auto py-4 flex-col items-center justify-center">
              <Map className="h-6 w-6 mb-2" />
              <span className="text-base">Facility Map</span>
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 h-auto py-4 flex-col items-center justify-center">
              <Bell className="h-6 w-6 mb-2" />
              <span className="text-base">Send Alert</span>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 h-auto py-4 flex-col items-center justify-center">
              <Printer className="h-6 w-6 mb-2" />
              <span className="text-base">Print Tags</span>
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700 h-auto py-4 flex-col items-center justify-center">
              <Clipboard className="h-6 w-6 mb-2" />
              <span className="text-base">Request Resources</span>
            </Button>
          </div>
        )}

        {/* Section Content */}
        <div className="w-full">
          {/* Operational Sections */}
          {activeSection === "dashboard" && (
            <DashboardSection
              emergencyMode={emergencyMode}
              drillMode={drillMode}
              patients={patients}
              resources={resources}
              alerts={alerts}
            />
          )}

          {activeSection === "patients" && (
            <div className="space-y-6">
              <Card className="border-2 border-gray-200 dark:border-gray-700 w-full">
                <CardHeader
                  className={`{emergencyMode
                    ? "bg-red-600 text-white"
                    : drillMode
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800"}`}
                >
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Users className="h-6 w-6" />
                    Patient Management
                  </CardTitle>
                  <CardDescription className={emergencyMode || drillMode ? "text-white/80" : ""}>
                    Track and manage patients during emergency events
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {emergencyMode || drillMode ? (
                    <div className="space-y-6">
                      <Tabs defaultValue="all">
                        <TabsList>
                          <TabsTrigger value="all">All Patients</TabsTrigger>
                          <TabsTrigger value="red">Red</TabsTrigger>
                          <TabsTrigger value="yellow">Yellow</TabsTrigger>
                          <TabsTrigger value="green">Green</TabsTrigger>
                          <TabsTrigger value="black">Black</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                          <PatientTable
                            patients={patients}
                            onAddPatient={handleAddPatient}
                            onUpdatePatient={handleUpdatePatient}
                          />
                        </TabsContent>
                        <TabsContent value="red">
                          <PatientTable
                            patients={patients}
                            onAddPatient={handleAddPatient}
                            onUpdatePatient={handleUpdatePatient}
                            filter="Red"
                          />
                        </TabsContent>
                        <TabsContent value="yellow">
                          <PatientTable
                            patients={patients}
                            onAddPatient={handleAddPatient}
                            onUpdatePatient={handleUpdatePatient}
                            filter="Yellow"
                          />
                        </TabsContent>
                        <TabsContent value="green">
                          <PatientTable
                            patients={patients}
                            onAddPatient={handleAddPatient}
                            onUpdatePatient={handleUpdatePatient}
                            filter="Green"
                          />
                        </TabsContent>
                        <TabsContent value="black">
                          <PatientTable
                            patients={patients}
                            onAddPatient={handleAddPatient}
                            onUpdatePatient={handleUpdatePatient}
                            filter="Black"
                          />
                        </TabsContent>
                      </Tabs>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium mb-2">No Active Emergency</h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Patient management is available during emergency or drill mode. Activate either mode to manage
                        patients.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button className="bg-red-600 hover:bg-red-700" onClick={toggleEmergencyMode}>
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Activate Emergency
                        </Button>
                        <Button variant="outline" onClick={toggleDrillMode}>
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Start Drill
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "resources" && (
            <div className="space-y-6">
              <Card className="border-2 border-gray-200 dark:border-gray-700 w-full">
                <CardHeader
                  className={`{emergencyMode
                    ? "bg-red-600 text-white"
                    : drillMode
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800"}`}
                >
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Clipboard className="h-6 w-6" />
                    Resource Management
                  </CardTitle>
                  <CardDescription className={emergencyMode || drillMode ? "text-white/80" : ""}>
                    Track and request resources during emergency events
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {emergencyMode || drillMode ? (
                    <div className="space-y-6">
                      <Tabs defaultValue="all">
                        <TabsList>
                          <TabsTrigger value="all">All Resources</TabsTrigger>
                          <TabsTrigger value="supply">Supplies</TabsTrigger>
                          <TabsTrigger value="equipment">Equipment</TabsTrigger>
                          <TabsTrigger value="medication">Medications</TabsTrigger>
                          <TabsTrigger value="blood">Blood</TabsTrigger>
                          <TabsTrigger value="staff">Staff</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                          <ResourceManagement
                            resources={resources}
                            onUpdateResource={handleUpdateResource}
                            onRequestResource={handleRequestResource}
                          />
                        </TabsContent>
                        <TabsContent value="supply">
                          <ResourceManagement
                            resources={resources}
                            onUpdateResource={handleUpdateResource}
                            onRequestResource={handleRequestResource}
                            filter="Supply"
                          />
                        </TabsContent>
                        <TabsContent value="equipment">
                          <ResourceManagement
                            resources={resources}
                            onUpdateResource={handleUpdateResource}
                            onRequestResource={handleRequestResource}
                            filter="Equipment"
                          />
                        </TabsContent>
                        <TabsContent value="medication">
                          <ResourceManagement
                            resources={resources}
                            onUpdateResource={handleUpdateResource}
                            onRequestResource={handleRequestResource}
                            filter="Medication"
                          />
                        </TabsContent>
                        <TabsContent value="blood">
                          <ResourceManagement
                            resources={resources}
                            onUpdateResource={handleUpdateResource}
                            onRequestResource={handleRequestResource}
                            filter="Blood"
                          />
                        </TabsContent>
                        <TabsContent value="staff">
                          <ResourceManagement
                            resources={resources}
                            onUpdateResource={handleUpdateResource}
                            onRequestResource={handleRequestResource}
                            filter="Staff"
                          />
                        </TabsContent>
                      </Tabs>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Clipboard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium mb-2">No Active Emergency</h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Resource management is available during emergency or drill mode. Activate either mode to manage
                        resources.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button className="bg-red-600 hover:bg-red-700" onClick={toggleEmergencyMode}>
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Activate Emergency
                        </Button>
                        <Button variant="outline" onClick={toggleDrillMode}>
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Start Drill
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "alerts" && (
            <div className="space-y-6">
              <Card className="border-2 border-gray-200 dark:border-gray-700 w-full">
                <CardHeader
                  className={`{emergencyMode
                    ? "bg-red-600 text-white"
                    : drillMode
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800"}`}
                >
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Bell className="h-6 w-6" />
                    Alert Center
                  </CardTitle>
                  <CardDescription className={emergencyMode || drillMode ? "text-white/80" : ""}>
                    Send and receive alerts during emergency events
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {emergencyMode || drillMode ? (
                    <AlertCenter
                      alerts={alerts}
                      onSendAlert={handleSendAlert}
                      onMarkAsRead={handleMarkAlertAsRead}
                      onMarkAllAsRead={handleMarkAllAlertsAsRead}
                    />
                  ) : (
                    <div className="text-center py-12">
                      <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium mb-2">No Active Emergency</h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Alert management is available during emergency or drill mode. Activate either mode to view and
                        send alerts.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button className="bg-red-600 hover:bg-red-700" onClick={toggleEmergencyMode}>
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Activate Emergency
                        </Button>
                        <Button variant="outline" onClick={toggleDrillMode}>
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Start Drill
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "drills" && (
            <div className="space-y-6">
              <Card className="border-2 border-gray-200 dark:border-gray-700 w-full">
                <CardHeader className="bg-gray-100 dark:bg-gray-800">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <PlayCircle className="h-6 w-6" />
                    Drill Scenarios
                  </CardTitle>
                  <CardDescription>Select and run emergency drill scenarios for training</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {drillMode ? (
                    <div className="space-y-6">
                      <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                        <PlayCircle className="h-4 w-4" />
                        <AlertTitle>Drill Mode Active</AlertTitle>
                        <AlertDescription>
                          {activeDrillScenario ? (
                            <>
                              Currently running: <strong>{activeDrillScenario.name}</strong> drill scenario.
                            </>
                          ) : (
                            <>A drill is currently in progress.</>
                          )}
                        </AlertDescription>
                      </Alert>

                      {activeDrillScenario && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Active Drill: {activeDrillScenario.name}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <p className="text-sm text-gray-500">Type</p>
                              <p>{activeDrillScenario.type}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-500">Expected Duration</p>
                              <p>{activeDrillScenario.expectedDuration}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-500">Patient Count</p>
                              <p>{activeDrillScenario.patientCount} patients</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-500">Difficulty</p>
                              <p>{activeDrillScenario.difficulty}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">Description</p>
                            <p>{activeDrillScenario.description}</p>
                          </div>

                          <Button variant="outline" className="w-full" onClick={toggleDrillMode}>
                            <X className="h-4 w-4 mr-2" />
                            End Drill
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : emergencyMode ? (
                    <div className="text-center py-12">
                      <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
                      <h3 className="text-lg font-medium mb-2">Emergency Mode Active</h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Drill scenarios cannot be started while in emergency mode. End the current emergency to start a
                        drill.
                      </p>
                      <Button variant="outline" onClick={toggleEmergencyMode}>
                        <X className="h-4 w-4 mr-2" />
                        End Emergency Mode
                      </Button>
                    </div>
                  ) : (
                    <DrillSelector scenarios={sampleDrillScenarios} onStartDrill={startDrillScenario} />
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Configuration Sections */}
          {activeSection === "triage" && (
            <TriageSection
              emergencyMode={emergencyMode}
              drillMode={drillMode}
              triageConfig={triageConfig}
              setTriageConfig={setTriageConfig}
              onSave={handleSave}
            />
          )}

          {activeSection === "charge" && (
            <ChargeRNSection
              emergencyMode={emergencyMode}
              drillMode={drillMode}
              chargeRNConfig={chargeRNConfig}
              setChargeRNConfig={setChargeRNConfig}
              onSave={handleSave}
            />
          )}

          {activeSection === "red" && (
            <ZoneSection
              zone="Red"
              ratio="1:1 or 1:2 if possible"
              emergencyMode={emergencyMode}
              drillMode={drillMode}
              zoneConfig={zoneConfigs.red}
              setZoneConfig={(config) => setZoneConfigs((prev) => ({ ...prev, red: config }))}
              onSave={handleSave}
            />
          )}

          {activeSection === "yellow" && (
            <ZoneSection
              zone="Yellow"
              ratio="1:5 if possible"
              emergencyMode={emergencyMode}
              drillMode={drillMode}
              zoneConfig={zoneConfigs.yellow}
              setZoneConfig={(config) => setZoneConfigs((prev) => ({ ...prev, yellow: config }))}
              onSave={handleSave}
            />
          )}

          {activeSection === "green" && (
            <ZoneSection
              zone="Green"
              ratio="Based on staff availability"
              emergencyMode={emergencyMode}
              drillMode={drillMode}
              zoneConfig={zoneConfigs.green}
              setZoneConfig={(config) => setZoneConfigs((prev) => ({ ...prev, green: config }))}
              onSave={handleSave}
            />
          )}

          {activeSection === "black" && (
            <ZoneSection
              zone="Black"
              ratio="Based on staff availability"
              emergencyMode={emergencyMode}
              drillMode={drillMode}
              zoneConfig={zoneConfigs.black}
              setZoneConfig={(config) => setZoneConfigs((prev) => ({ ...prev, black: config }))}
              onSave={handleSave}
            />
          )}

          {activeSection === "resourcesConfig" && (
            <ResourcesConfigSection
              emergencyMode={emergencyMode}
              drillMode={drillMode}
              resourcesConfig={resourcesConfig}
              setResourcesConfig={setResourcesConfig}
              onSave={handleSave}
            />
          )}
        </div>
      </div>

      {/* Add Demo Tour Button */}
      {!emergencyMode && !drillMode && activeSection === "dashboard" && (
        <div className="flex justify-center mt-6">
          <DemoTourButton />
        </div>
      )}
    </div>
  )
}

