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
  Droplets,
  Building,
  Phone,
  FileText,
  UserPlus,
  Package,
  Radio,
  Clock,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DemoTourButton } from "./components/demo-tour"

// Import section components
import { TriageSection } from "./components/sections/triage-section"
import { ChargeRNSection } from "./components/sections/charge-rn-section"
import { ZoneSection } from "./components/sections/zone-section"
import { DashboardSection } from "./components/sections/dashboard-section"

// Import new components
import { HICSDashboard } from "./components/hics-dashboard"
import { TriageSystemSelector } from "./components/triage-system-selector"
import { DecontaminationModule } from "./components/decontamination-module"

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
import { ScenarioManager } from "./components/scenario-manager"
import { useEnhancedSimulation } from "./hooks/use-enhanced-simulation"
import { type EmergencyScenario } from "./demo-scenarios"

export default function ToolkitPage() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [saved, setSaved] = useState(false)
  const [emergencyMode, setEmergencyMode] = useState(false)
  const [drillMode, setDrillMode] = useState(false)
  const [emergencyType, setEmergencyType] = useState("")
  const [activationTime, setActivationTime] = useState("")
  const [activeDrillScenario, setActiveDrillScenario] = useState<DrillScenario | null>(null)
  const [selectedTriageSystem, setSelectedTriageSystem] = useState<"salt" | "start" | "jumpstart">("salt")
  const [elapsedTime, setElapsedTime] = useState(0)

  // Enhanced simulation hook
  const simulation = useEnhancedSimulation()

  // Demo data state - use simulation data when active, otherwise demo data
  const [staticPatients, setStaticPatients] = useState<Patient[]>([])
  const [staticResources, setStaticResources] = useState<ResourceItem[]>([])
  const [staticAlerts, setStaticAlerts] = useState<AlertMessage[]>([])

  // Get current data (simulation or static)
  const patients = simulation.isActive ? simulation.patients : staticPatients
  const resources = simulation.isActive ? simulation.resources : staticResources  
  const alerts = simulation.isActive ? simulation.alerts : staticAlerts

  // Critical stats for emergency dashboard - use simulation stats when active
  const criticalPatients = simulation.isActive ? simulation.statistics.criticalPatients : patients.filter(p => p.triage === "Red").length
  const totalPatients = simulation.isActive ? simulation.statistics.totalPatients : patients.length
  const criticalResources = simulation.isActive ? simulation.statistics.resourcesLow : resources.filter(r => r.status === "Critical").length
  const unreadAlerts = simulation.isActive ? simulation.statistics.unreadAlerts : alerts.filter(a => !a.read).length
  
  // Use simulation elapsed time when active
  const currentElapsedTime = simulation.isActive ? simulation.rawElapsedTime : elapsedTime

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

  // Timer for emergency/drill mode (only when not using simulation)
  useEffect(() => {
    let interval: NodeJS.Timeout
    if ((emergencyMode || drillMode) && !simulation.isActive) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    } else if (!simulation.isActive) {
      setElapsedTime(0)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [emergencyMode, drillMode, simulation.isActive])

  const handleSave = () => {
    // Simulate save action
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const toggleEmergencyMode = () => {
    if (!emergencyMode) {
      setActivationTime(new Date().toLocaleTimeString())
      setStaticPatients(samplePatients)
      setStaticResources(sampleResources)
      setStaticAlerts(sampleAlerts)
      setActiveSection("dashboard") // Default to dashboard in emergency
    } else {
      setStaticPatients([])
      setStaticResources([])
      setStaticAlerts([])
      setElapsedTime(0)
    }
    setEmergencyMode(!emergencyMode)
    setDrillMode(false)
  }

  const toggleDrillMode = () => {
    if (!drillMode) {
      setActivationTime(new Date().toLocaleTimeString())
      setActiveSection("dashboard") // Default to dashboard in drill
    } else {
      setActiveDrillScenario(null)
      setStaticPatients([])
      setStaticResources([])
      setStaticAlerts([])
      setElapsedTime(0)
    }
    setDrillMode(!drillMode)
    setEmergencyMode(false)
  }

  const startDrillScenario = (scenario: DrillScenario) => {
    setActiveDrillScenario(scenario)
    setActivationTime(new Date().toLocaleTimeString())
    setStaticPatients(samplePatients)
    setStaticResources(sampleResources)
    setStaticAlerts(sampleAlerts)
    setDrillMode(true)
    setEmergencyMode(false)
  }

  // Enhanced patient management functions
  const handleAddPatient = (patient: Patient) => {
    if (simulation.isActive) {
      // Can't add patients manually during simulation
      return
    }
    setStaticPatients((prev: Patient[]) => [...prev, { ...patient, id: `P${Date.now()}` }])
  }

  const handleUpdatePatient = (updatedPatient: Patient) => {
    if (simulation.isActive) {
      // Can't update patients manually during simulation
      return
    }
    setStaticPatients((prev: Patient[]) => prev.map((patient) => (patient.id === updatedPatient.id ? updatedPatient : patient)))
  }

  const handleUpdateResource = (updatedResource: ResourceItem) => {
    if (simulation.isActive) {
      // Can't update resources manually during simulation
      return
    }
    setStaticResources((prev: ResourceItem[]) =>
      prev.map((resource) => (resource.id === updatedResource.id ? updatedResource : resource))
    )
  }

  const handleRequestResource = (resource: ResourceItem, quantity: number) => {
    // Create alert for resource request
    const alert: AlertMessage = {
      id: `A${Date.now()}`,
      time: new Date().toLocaleTimeString(),
      message: `Resource request: ${quantity} ${resource.name} from ${resource.location}`,
      severity: "warning",
      sender: "Resource Management",
      read: false,
    }
    if (simulation.isActive) {
      // During simulation, alerts are managed by the simulation
      return
    }
    setStaticAlerts((prev: AlertMessage[]) => [alert, ...prev])
  }

  const handleSendAlert = (alert: Omit<AlertMessage, "id" | "time" | "read">) => {
    const newAlert: AlertMessage = {
      ...alert,
      id: `A${Date.now()}`,
      time: new Date().toLocaleTimeString(),
      read: false,
    }
    if (simulation.isActive) {
      // During simulation, alerts are managed by the simulation
      return
    }
    setStaticAlerts((prev: AlertMessage[]) => [newAlert, ...prev])
  }

  const handleMarkAlertAsRead = (alertId: string) => {
    if (simulation.isActive) {
      // During simulation, alerts are managed by the simulation
      return
    }
    setStaticAlerts((prev: AlertMessage[]) => prev.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert)))
  }

  const handleMarkAllAlertsAsRead = () => {
    if (simulation.isActive) {
      // During simulation, alerts are managed by the simulation
      return
    }
    setStaticAlerts((prev: AlertMessage[]) => prev.map((alert) => ({ ...alert, read: true })))
  }

  // Scenario management functions
  const handleStartScenario = (scenario: EmergencyScenario) => {
    simulation.startScenario(scenario, false)
    setEmergencyMode(true)
    setDrillMode(false)
    setActivationTime(new Date().toLocaleTimeString())
    setActiveSection("dashboard")
  }

  const handleStartDrill = (scenario: EmergencyScenario) => {
    simulation.startScenario(scenario, true)
    setDrillMode(true)
    setEmergencyMode(false)
    setActivationTime(new Date().toLocaleTimeString())
    setActiveSection("dashboard")
  }

  const handleStopSimulation = () => {
    simulation.stopSimulation()
    setEmergencyMode(false)
    setDrillMode(false)
    setElapsedTime(0)
  }

  // Enhanced sections array with better categorization
  const sections = [
    // Operational sections for emergency response
    { 
      id: "dashboard", 
      name: "Command Center", 
      icon: <Activity className="h-5 w-5 text-blue-600" />, 
      category: "operational",
      priority: "high" 
    },
    { 
      id: "patients", 
      name: "Patient Tracking", 
      icon: <Users className="h-5 w-5 text-green-600" />, 
      category: "operational",
      priority: "high"
    },
    { 
      id: "resources", 
      name: "Resources", 
      icon: <Package className="h-5 w-5 text-orange-600" />, 
      category: "operational",
      priority: "high"
    },
    { 
      id: "alerts", 
      name: "Communications", 
      icon: <Radio className="h-5 w-5 text-purple-600" />, 
      category: "operational",
      priority: "high"
    },
    { 
      id: "hics", 
      name: "HICS Structure", 
      icon: <Building className="h-5 w-5 text-blue-600" />, 
      category: "operational",
      priority: "medium"
    },
    { 
      id: "triageSystem", 
      name: "Triage Protocol", 
      icon: <AlertCircle className="h-5 w-5 text-red-600" />, 
      category: "operational",
      priority: "medium"
    },
    { 
      id: "decontamination", 
      name: "Decontamination", 
      icon: <Droplets className="h-5 w-5 text-cyan-600" />, 
      category: "operational",
      priority: "medium"
    },
    
    // Scenario management
    {
      id: "scenarios",
      name: "Emergency Scenarios",
      icon: <Zap className="h-5 w-5 text-purple-600" />,
      category: "operational",
      priority: "medium"
    },
    
    // Configuration sections
    { 
      id: "triage", 
      name: "Triage Config", 
      icon: <AlertCircle className="h-5 w-5 text-red-600" />, 
      category: "config",
      priority: "low"
    },
    { 
      id: "chargeRN", 
      name: "Charge RN Config", 
      icon: <Users className="h-5 w-5 text-blue-600" />, 
      category: "config",
      priority: "low"
    },
    {
      id: "red",
      name: "Red Zone Config",
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
      category: "config",
      priority: "low"
    },
    {
      id: "yellow",
      name: "Yellow Zone Config",
      icon: <AlertCircle className="h-5 w-5 text-yellow-600" />,
      category: "config",
      priority: "low"
    },
    {
      id: "green",
      name: "Green Zone Config",
      icon: <AlertCircle className="h-5 w-5 text-green-600" />,
      category: "config",
      priority: "low"
    },
    {
      id: "black",
      name: "Black Zone Config",
      icon: <AlertCircle className="h-5 w-5 text-gray-600" />,
      category: "config",
      priority: "low"
    },
    { 
      id: "resourcesConfig", 
      name: "Resources Config", 
      icon: <Cog className="h-5 w-5" />, 
      category: "config",
      priority: "low"
    },
  ]

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Filter sections based on mode and priority
  const operationalSections = sections.filter((section) => section.category === "operational")
  const configSections = sections.filter((section) => section.category === "config")
  const highPrioritySections = operationalSections.filter(section => section.priority === "high")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      {/* Enhanced Emergency Mode Banner */}
      {(emergencyMode || drillMode) && (
        <div
          className={`sticky top-0 z-50 w-full ${
            emergencyMode 
              ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg border-b-4 border-red-800" 
              : "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg border-b-4 border-amber-700"
          }`}
          style={{ width: "100%" }}
        >
          <div className="flex items-center justify-between w-full px-6 py-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                {emergencyMode ? (
                  <AlertCircle className="h-8 w-8 animate-pulse" />
                ) : (
                  <PlayCircle className="h-8 w-8" />
                )}
                <div>
                  <div className="font-bold text-2xl">
                    {emergencyMode ? "EMERGENCY ACTIVE" : "DRILL IN PROGRESS"}
                  </div>
                  <div className="text-sm opacity-90">
                    {simulation.isActive && simulation.currentScenario
                      ? `${simulation.currentScenario.name} • ${simulation.isDrill ? 'DRILL' : 'EMERGENCY'} • Started ${activationTime}`
                      : `${emergencyType || activeDrillScenario?.name || "Mass Casualty Event"} • Started ${activationTime}`}
                  </div>
                </div>
              </div>
              
              {/* Critical Stats in Emergency Banner */}
              <div className="hidden lg:flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg">
                  <Users className="h-4 w-4" />
                  <span>{totalPatients} Patients</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <span>{criticalPatients} Critical</span>
                </div>
                {criticalResources > 0 && (
                  <div className="flex items-center gap-2 bg-red-500/30 px-3 py-1 rounded-lg">
                    <Package className="h-4 w-4" />
                    <span>{criticalResources} Low Resources</span>
                  </div>
                )}
                {unreadAlerts > 0 && (
                  <div className="flex items-center gap-2 bg-yellow-500/30 px-3 py-1 rounded-lg">
                    <Bell className="h-4 w-4" />
                    <span>{unreadAlerts} New Alerts</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                                        <div className="font-mono text-3xl font-bold">{formatTime(currentElapsedTime)}</div>
                <div className="text-sm opacity-90">Elapsed Time</div>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 hover:bg-white/30 border-white/40 text-white hover:text-white"
                onClick={simulation.isActive ? handleStopSimulation : (emergencyMode ? toggleEmergencyMode : toggleDrillMode)}
              >
                <X className="h-5 w-5 mr-2" />
                {simulation.isActive ? "Stop Scenario" : (emergencyMode ? "End Emergency" : "End Drill")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Top Navigation */}
      <div
        className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 w-full sticky top-0 z-40 shadow-sm"
        style={{ top: emergencyMode || drillMode ? "73px" : 0 }}
      >
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SurgeReady Toolkit</h1>
              {saved && (
                <Badge className="bg-green-600 text-white flex items-center gap-2 px-3 py-1">
                  <Save className="h-4 w-4" />
                  Configuration Saved
                </Badge>
              )}
            </div>

            {!emergencyMode && !drillMode && (
              <div className="flex items-center gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white shadow-lg">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Activate Emergency
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-red-600">Activate Emergency Mode</DialogTitle>
                      <DialogDescription className="text-base">
                        This will activate all emergency protocols and notify designated staff members.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                      <Label htmlFor="emergency-type" className="text-base font-medium mb-3 block">
                        Emergency Type
                      </Label>
                      <Select onValueChange={setEmergencyType}>
                        <SelectTrigger id="emergency-type" className="h-12">
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
                    <DialogFooter className="flex gap-3">
                      <Button variant="outline" size="lg">
                        Cancel
                      </Button>
                      <Button 
                        size="lg" 
                        className="bg-red-600 hover:bg-red-700 text-white" 
                        onClick={toggleEmergencyMode}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Activate Emergency
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button size="lg" onClick={toggleDrillMode} variant="outline" className="border-2">
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Start Drill
                </Button>

                <Button size="lg" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Save className="h-5 w-5 mr-2" />
                  Save Config
                </Button>
              </div>
            )}

            {(emergencyMode || drillMode) && (
              <div className="flex items-center gap-3">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Bell className="h-5 w-5 mr-2" />
                  Send Alert
                </Button>
                <Button size="lg" variant="outline" className="border-2">
                  <Printer className="h-5 w-5 mr-2" />
                  Print Protocols
                </Button>
                <Button size="lg" variant="outline" className="border-2">
                  <Phone className="h-5 w-5 mr-2" />
                  Emergency Contacts
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Section Navigation */}
        <div className="px-6 pb-2">
          <Tabs defaultValue="operational" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="operational" className="flex items-center gap-2 text-base py-3">
                <Activity className="h-5 w-5" />
                <span>Emergency Operations</span>
              </TabsTrigger>
              <TabsTrigger value="configuration" className="flex items-center gap-2 text-base py-3">
                <Cog className="h-5 w-5" />
                <span>System Configuration</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="operational" className="mt-0">
              {(emergencyMode || drillMode) ? (
                // High priority sections in emergency mode
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {highPrioritySections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex flex-col items-center gap-2 p-4 text-sm font-medium rounded-lg transition-all ${
                        activeSection === section.id
                          ? "bg-blue-600 text-white shadow-lg scale-105"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      {section.icon}
                      <span className="text-center">{section.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                // All operational sections in normal mode
                <div className="w-full overflow-x-auto scrollbar-hide">
                  <div className="flex space-x-2 min-w-max pb-2">
                    {operationalSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                          activeSection === section.id
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        {section.icon}
                        <span>{section.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="configuration" className="mt-0">
              <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="flex space-x-2 min-w-max pb-2">
                  {configSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                        activeSection === section.id
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
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

      {/* Enhanced Main Content */}
      <div className="w-full p-6">
        {/* Critical Actions Panel - Only visible in emergency/drill mode */}
        {(emergencyMode || drillMode) && (
          <div className="mb-6">
            <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                  <Zap className="h-5 w-5" />
                  Critical Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button 
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 h-auto py-4 flex-col items-center justify-center gap-2"
                  >
                    <UserPlus className="h-6 w-6" />
                    <span>Add Patient</span>
                  </Button>
                  <Button 
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 h-auto py-4 flex-col items-center justify-center gap-2"
                  >
                    <Bell className="h-6 w-6" />
                    <span>Mass Alert</span>
                  </Button>
                  <Button 
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-700 h-auto py-4 flex-col items-center justify-center gap-2"
                  >
                    <Package className="h-6 w-6" />
                    <span>Resource Request</span>
                  </Button>
                  <Button 
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 h-auto py-4 flex-col items-center justify-center gap-2"
                  >
                    <FileText className="h-6 w-6" />
                    <span>Status Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
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

          {activeSection === "hics" && <HICSDashboard emergencyMode={emergencyMode} drillMode={drillMode} />}

          {activeSection === "decontamination" && (
            <DecontaminationModule emergencyMode={emergencyMode} drillMode={drillMode} />
          )}

          {activeSection === "triageSystem" && (
            <TriageSystemSelector selectedSystem={selectedTriageSystem} onSystemChange={setSelectedTriageSystem} />
          )}

          {activeSection === "scenarios" && (
            <ScenarioManager
              onStartScenario={handleStartScenario}
              onStartDrill={handleStartDrill}
              isActive={simulation.isActive}
            />
          )}

          {/* Enhanced Patient Management Section */}
          {activeSection === "patients" && (
            <div className="space-y-6">
              <Card className="border-2 border-gray-200 dark:border-gray-700 w-full">
                <CardHeader
                  className={`${emergencyMode
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
                          <TabsTrigger value="all">All Patients ({totalPatients})</TabsTrigger>
                          <TabsTrigger value="red" className="text-red-600">Red ({patients.filter(p => p.triage === "Red").length})</TabsTrigger>
                          <TabsTrigger value="yellow" className="text-yellow-600">Yellow ({patients.filter(p => p.triage === "Yellow").length})</TabsTrigger>
                          <TabsTrigger value="green" className="text-green-600">Green ({patients.filter(p => p.triage === "Green").length})</TabsTrigger>
                          <TabsTrigger value="black" className="text-gray-600">Black ({patients.filter(p => p.triage === "Black").length})</TabsTrigger>
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
                      <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-medium mb-2">No Active Emergency</h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Patient management is available during emergency or drill mode. Activate either mode to begin tracking patients.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" onClick={toggleEmergencyMode}>
                          <AlertCircle className="h-5 w-5 mr-2" />
                          Activate Emergency
                        </Button>
                        <Button size="lg" variant="outline" onClick={toggleDrillMode}>
                          <PlayCircle className="h-5 w-5 mr-2" />
                          Start Drill
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Enhanced Resource Management Section */}
          {activeSection === "resources" && (
            <div className="space-y-6">
              <Card className="border-2 border-gray-200 dark:border-gray-700 w-full">
                <CardHeader
                  className={`${emergencyMode
                  ? "bg-red-600 text-white"
                  : drillMode
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800"}`}
                >
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Package className="h-6 w-6" />
                    Resource Management
                  </CardTitle>
                  <CardDescription className={emergencyMode || drillMode ? "text-white/80" : ""}>
                    Track and request critical resources during emergency events
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {emergencyMode || drillMode ? (
                    <div className="space-y-6">
                      {/* Resource Status Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                        <Card className="bg-green-50 border-green-200">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-green-700">
                              {resources.filter(r => r.status === "Adequate").length}
                            </div>
                            <div className="text-sm text-green-600">Adequate</div>
                          </CardContent>
                        </Card>
                        <Card className="bg-yellow-50 border-yellow-200">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-yellow-700">
                              {resources.filter(r => r.status === "Limited").length}
                            </div>
                            <div className="text-sm text-yellow-600">Limited</div>
                          </CardContent>
                        </Card>
                        <Card className="bg-red-50 border-red-200">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-red-700">
                              {resources.filter(r => r.status === "Critical").length}
                            </div>
                            <div className="text-sm text-red-600">Critical</div>
                          </CardContent>
                        </Card>
                        <Card className="bg-blue-50 border-blue-200">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-blue-700">
                              {resources.reduce((sum, r) => sum + r.available, 0)}
                            </div>
                            <div className="text-sm text-blue-600">Available</div>
                          </CardContent>
                        </Card>
                        <Card className="bg-purple-50 border-purple-200">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-purple-700">
                              {resources.reduce((sum, r) => sum + r.total, 0)}
                            </div>
                            <div className="text-sm text-purple-600">Total</div>
                          </CardContent>
                        </Card>
                      </div>

                      <Tabs defaultValue="all">
                        <TabsList>
                          <TabsTrigger value="all">All Resources ({resources.length})</TabsTrigger>
                          <TabsTrigger value="supply" className="text-blue-600">Supplies ({resources.filter(r => r.category === "Supply").length})</TabsTrigger>
                          <TabsTrigger value="equipment" className="text-green-600">Equipment ({resources.filter(r => r.category === "Equipment").length})</TabsTrigger>
                          <TabsTrigger value="medication" className="text-purple-600">Medications ({resources.filter(r => r.category === "Medication").length})</TabsTrigger>
                          <TabsTrigger value="blood" className="text-red-600">Blood ({resources.filter(r => r.category === "Blood").length})</TabsTrigger>
                          <TabsTrigger value="staff" className="text-orange-600">Staff ({resources.filter(r => r.category === "Staff").length})</TabsTrigger>
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
                      <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-medium mb-2">No Active Emergency</h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Resource management is available during emergency or drill mode. Activate either mode to track and manage critical resources.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" onClick={toggleEmergencyMode}>
                          <AlertCircle className="h-5 w-5 mr-2" />
                          Activate Emergency
                        </Button>
                        <Button size="lg" variant="outline" onClick={toggleDrillMode}>
                          <PlayCircle className="h-5 w-5 mr-2" />
                          Start Drill
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Enhanced Communications/Alerts Section */}
          {activeSection === "alerts" && (
            <div className="space-y-6">
              <Card className="border-2 border-gray-200 dark:border-gray-700 w-full">
                <CardHeader
                  className={`${emergencyMode
                  ? "bg-red-600 text-white"
                  : drillMode
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800"}`}
                >
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Radio className="h-6 w-6" />
                    Communications Center
                    {unreadAlerts > 0 && (
                      <Badge className="bg-red-500 text-white ml-2">
                        {unreadAlerts} New
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className={emergencyMode || drillMode ? "text-white/80" : ""}>
                    Send mass alerts and manage communications during emergency events
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {emergencyMode || drillMode ? (
                    <div className="space-y-6">
                      {/* Quick Communication Actions */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Button 
                          size="lg"
                          className="bg-red-600 hover:bg-red-700 h-auto py-4 flex-col items-center justify-center gap-2"
                        >
                          <Bell className="h-6 w-6" />
                          <span>All Staff Alert</span>
                        </Button>
                        <Button 
                          size="lg"
                          className="bg-orange-600 hover:bg-orange-700 h-auto py-4 flex-col items-center justify-center gap-2"
                        >
                          <Phone className="h-6 w-6" />
                          <span>External Agencies</span>
                        </Button>
                        <Button 
                          size="lg"
                          className="bg-blue-600 hover:bg-blue-700 h-auto py-4 flex-col items-center justify-center gap-2"
                        >
                          <Radio className="h-6 w-6" />
                          <span>Radio Check</span>
                        </Button>
                      </div>

                      <AlertCenter
                        alerts={alerts}
                        onSendAlert={handleSendAlert}
                        onMarkAsRead={handleMarkAlertAsRead}
                        onMarkAllAsRead={handleMarkAllAlertsAsRead}
                      />
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Radio className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-medium mb-2">No Active Emergency</h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Communications center is available during emergency or drill mode. Activate either mode to send alerts and coordinate communications.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" onClick={toggleEmergencyMode}>
                          <AlertCircle className="h-5 w-5 mr-2" />
                          Activate Emergency
                        </Button>
                        <Button size="lg" variant="outline" onClick={toggleDrillMode}>
                          <PlayCircle className="h-5 w-5 mr-2" />
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

          {activeSection === "chargeRN" && (
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

