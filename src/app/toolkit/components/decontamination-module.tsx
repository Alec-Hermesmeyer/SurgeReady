"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckSquare, Droplets, Shield, User, Users, Workflow } from "lucide-react"

interface DecontaminationModuleProps {
  emergencyMode: boolean
  drillMode: boolean
}

export function DecontaminationModule({ emergencyMode, drillMode }: DecontaminationModuleProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPPE, setSelectedPPE] = useState<string>("levelC")

  const [checklist, setChecklist] = useState({
    setupArea: false,
    staffAssigned: false,
    ppeReady: false,
    suppliesReady: false,
    waterAvailable: false,
    disposalReady: false,
    communicationReady: false,
    documentationReady: false,
  })

  const [patients, setPatients] = useState([
    {
      id: "D001",
      name: "John Smith",
      age: 34,
      contaminant: "Unknown chemical",
      status: "Waiting",
      deconLevel: "Full",
      arrivalTime: "10:15 AM",
    },
    {
      id: "D002",
      name: "Maria Garcia",
      age: 28,
      contaminant: "Suspected organophosphate",
      status: "In process",
      deconLevel: "Full",
      arrivalTime: "10:18 AM",
    },
    {
      id: "D003",
      name: "Robert Chen",
      age: 42,
      contaminant: "Dust/debris only",
      status: "Completed",
      deconLevel: "Dry",
      arrivalTime: "10:05 AM",
    },
  ])

  const handleChecklistChange = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Waiting":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Waiting</Badge>
      case "In process":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">In Process</Badge>
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Completed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-gray-200 dark:border-gray-700">
        <CardHeader
          className={`${
            emergencyMode
              ? "bg-red-600 text-white"
              : drillMode
                ? "bg-amber-500 text-white"
                : "bg-gray-100 dark:bg-gray-800"
          }`}
        >
          <CardTitle className="flex items-center gap-2 text-xl">
            <Droplets className="h-6 w-6" />
            Decontamination Management
          </CardTitle>
          <CardDescription className={emergencyMode || drillMode ? "text-white/80" : ""}>
            Manage patient decontamination procedures and PPE requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {emergencyMode || drillMode ? (
            <div className="space-y-6">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="checklist">Checklist</TabsTrigger>
                  <TabsTrigger value="patients">Patients</TabsTrigger>
                  <TabsTrigger value="ppe">PPE Guide</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-red-600" />
                          <span>Decontamination Status</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Decon Area:</span>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Current PPE Level:</span>
                            <Badge className="bg-amber-100 text-amber-800">Level C</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Patients Waiting:</span>
                            <span className="font-medium">1</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Patients In Process:</span>
                            <span className="font-medium">1</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Patients Completed:</span>
                            <span className="font-medium">1</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Shield className="h-5 w-5 text-blue-600" />
                          <span>Contaminant Information</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Identified Agent:</span>
                            <Badge className="bg-amber-100 text-amber-800">Suspected Organophosphate</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Source:</span>
                            <span className="text-sm">Field IC Report</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Decon Protocol:</span>
                            <span className="text-sm">Full Decontamination</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Antidote Required:</span>
                            <Badge className="bg-red-100 text-red-800">Yes - Atropine</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Workflow className="h-5 w-5 text-purple-600" />
                        <span>Decontamination Workflow</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="relative">
                        <div className="absolute left-4 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                        <div className="space-y-6 relative">
                          <div className="flex gap-4">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 z-10">
                              1
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">Triage & Assessment</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Determine need for decontamination at initial triage point
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 z-10">
                              2
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">PPE Preparation</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Staff don appropriate PPE based on contaminant (currently Level C)
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 z-10">
                              3
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">Decontamination Process</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Remove clothing, wash with water and mild soap, rinse thoroughly
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 z-10">
                              4
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">Medical Evaluation</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Post-decon medical assessment and treatment
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 z-10">
                              5
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">Documentation & Disposition</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Record decon details and transfer to appropriate treatment area
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="checklist" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <CheckSquare className="h-5 w-5 text-green-600" />
                        <span>Decontamination Setup Checklist</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="setup-area"
                            checked={checklist.setupArea}
                            onCheckedChange={() => handleChecklistChange("setupArea")}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="setup-area" className="text-sm font-medium">
                              Decontamination area established
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Separate entrance and exit, privacy screens, proper drainage
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="staff-assigned"
                            checked={checklist.staffAssigned}
                            onCheckedChange={() => handleChecklistChange("staffAssigned")}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="staff-assigned" className="text-sm font-medium">
                              Staff assigned to decontamination team
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Minimum 4 staff members trained in decontamination procedures
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="ppe-ready"
                            checked={checklist.ppeReady}
                            onCheckedChange={() => handleChecklistChange("ppeReady")}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="ppe-ready" className="text-sm font-medium">
                              Appropriate PPE available and ready
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Level C PPE prepared for staff (PAPR, chemical-resistant suits)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="supplies-ready"
                            checked={checklist.suppliesReady}
                            onCheckedChange={() => handleChecklistChange("suppliesReady")}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="supplies-ready" className="text-sm font-medium">
                              Decontamination supplies prepared
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Mild soap, soft brushes, towels, patient gowns, bags for belongings
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="water-available"
                            checked={checklist.waterAvailable}
                            onCheckedChange={() => handleChecklistChange("waterAvailable")}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="water-available" className="text-sm font-medium">
                              Water supply functional
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Warm water available with appropriate pressure and temperature
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="disposal-ready"
                            checked={checklist.disposalReady}
                            onCheckedChange={() => handleChecklistChange("disposalReady")}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="disposal-ready" className="text-sm font-medium">
                              Contaminated waste disposal prepared
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Hazardous waste containers, double-bagging system, proper labeling
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="communication-ready"
                            checked={checklist.communicationReady}
                            onCheckedChange={() => handleChecklistChange("communicationReady")}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="communication-ready" className="text-sm font-medium">
                              Communication system established
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Radio/intercom between decon area and ED, clear signage
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="documentation-ready"
                            checked={checklist.documentationReady}
                            onCheckedChange={() => handleChecklistChange("documentationReady")}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="documentation-ready" className="text-sm font-medium">
                              Documentation system in place
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Waterproof forms, tracking system for patients and belongings
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button className="w-full">
                          {Object.values(checklist).every(Boolean)
                            ? "Decontamination Area Ready"
                            : `Complete Checklist (${Object.values(checklist).filter(Boolean).length}/${Object.values(checklist).length})`}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="patients" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span>Decontamination Patient Tracking</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium">Current Patients</h4>
                          <Button size="sm">Add Patient</Button>
                        </div>

                        <div className="border rounded-md">
                          <div className="grid grid-cols-7 gap-2 p-3 border-b bg-gray-50 dark:bg-gray-800">
                            <div className="text-sm font-medium">ID</div>
                            <div className="text-sm font-medium">Name</div>
                            <div className="text-sm font-medium">Age</div>
                            <div className="text-sm font-medium">Contaminant</div>
                            <div className="text-sm font-medium">Arrival</div>
                            <div className="text-sm font-medium">Decon Type</div>
                            <div className="text-sm font-medium">Status</div>
                          </div>

                          {patients.map((patient) => (
                            <div key={patient.id} className="grid grid-cols-7 gap-2 p-3 border-b last:border-0">
                              <div className="text-sm">{patient.id}</div>
                              <div className="text-sm font-medium">{patient.name}</div>
                              <div className="text-sm">{patient.age}</div>
                              <div className="text-sm">{patient.contaminant}</div>
                              <div className="text-sm">{patient.arrivalTime}</div>
                              <div className="text-sm">{patient.deconLevel}</div>
                              <div className="text-sm">{getStatusBadge(patient.status)}</div>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="contaminant-type">Contaminant Type</Label>
                            <Select defaultValue="chemical">
                              <SelectTrigger id="contaminant-type">
                                <SelectValue placeholder="Select contaminant type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="chemical">Chemical</SelectItem>
                                <SelectItem value="biological">Biological</SelectItem>
                                <SelectItem value="radiological">Radiological</SelectItem>
                                <SelectItem value="unknown">Unknown</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="decon-method">Decontamination Method</Label>
                            <Select defaultValue="wet">
                              <SelectTrigger id="decon-method">
                                <SelectValue placeholder="Select decon method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="wet">Wet Decontamination</SelectItem>
                                <SelectItem value="dry">Dry Decontamination</SelectItem>
                                <SelectItem value="technical">Technical Decontamination</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="decon-notes">Notes</Label>
                          <Textarea
                            id="decon-notes"
                            placeholder="Enter any special considerations or observations"
                            className="min-h-[100px]"
                          />
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Reset</Button>
                          <Button>Update Patient Status</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ppe" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        <span>Personal Protective Equipment Guide</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium">Current PPE Level</h4>
                          <Select value={selectedPPE} onValueChange={setSelectedPPE}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select PPE level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="levelA">Level A</SelectItem>
                              <SelectItem value="levelB">Level B</SelectItem>
                              <SelectItem value="levelC">Level C</SelectItem>
                              <SelectItem value="levelD">Level D</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className={selectedPPE === "levelA" ? "border-2 border-green-500" : ""}>
                            <CardHeader className="py-3 bg-gray-50 dark:bg-gray-800">
                              <CardTitle className="text-sm flex items-center gap-2">
                                <Shield className="h-4 w-4 text-red-600" />
                                <span>Level A - Highest Protection</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 text-sm">
                              <p className="mb-2">
                                Provides the highest level of respiratory, skin, and eye protection.
                              </p>
                              <ul className="space-y-1 list-disc pl-5">
                                <li>Totally encapsulating chemical-resistant suit</li>
                                <li>Self-contained breathing apparatus (SCBA)</li>
                                <li>Chemical-resistant gloves (inner and outer)</li>
                                <li>Chemical-resistant boots</li>
                                <li>Two-way radio communication</li>
                              </ul>
                              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                <strong>When to use:</strong> Unknown substances, high concentrations of toxic
                                substances, IDLH environments, substances requiring highest level of skin protection.
                              </p>
                            </CardContent>
                          </Card>

                          <Card className={selectedPPE === "levelB" ? "border-2 border-green-500" : ""}>
                            <CardHeader className="py-3 bg-gray-50 dark:bg-gray-800">
                              <CardTitle className="text-sm flex items-center gap-2">
                                <Shield className="h-4 w-4 text-orange-600" />
                                <span>Level B - High Protection</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 text-sm">
                              <p className="mb-2">
                                Provides highest level of respiratory protection but less skin protection.
                              </p>
                              <ul className="space-y-1 list-disc pl-5">
                                <li>Chemical-resistant suit (not encapsulating)</li>
                                <li>Self-contained breathing apparatus (SCBA)</li>
                                <li>Chemical-resistant gloves (inner and outer)</li>
                                <li>Chemical-resistant boots</li>
                                <li>Hard hat if needed</li>
                              </ul>
                              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                <strong>When to use:</strong> Known contaminants requiring high respiratory protection
                                but lower skin protection, splash hazards.
                              </p>
                            </CardContent>
                          </Card>

                          <Card className={selectedPPE === "levelC" ? "border-2 border-green-500" : ""}>
                            <CardHeader className="py-3 bg-gray-50 dark:bg-gray-800">
                              <CardTitle className="text-sm flex items-center gap-2">
                                <Shield className="h-4 w-4 text-yellow-600" />
                                <span>Level C - Moderate Protection</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 text-sm">
                              <p className="mb-2">
                                Used when contaminants are known and air-purifying respirators are adequate.
                              </p>
                              <ul className="space-y-1 list-disc pl-5">
                                <li>Full-face air-purifying respirator (APR) or PAPR</li>
                                <li>Chemical-resistant suit</li>
                                <li>Chemical-resistant gloves (inner and outer)</li>
                                <li>Chemical-resistant boots</li>
                              </ul>
                              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                <strong>When to use:</strong> Known contaminants, adequate oxygen levels, concentrations
                                below IDLH, most hospital decontamination scenarios.
                              </p>
                            </CardContent>
                          </Card>

                          <Card className={selectedPPE === "levelD" ? "border-2 border-green-500" : ""}>
                            <CardHeader className="py-3 bg-gray-50 dark:bg-gray-800">
                              <CardTitle className="text-sm flex items-center gap-2">
                                <Shield className="h-4 w-4 text-blue-600" />
                                <span>Level D - Basic Protection</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 text-sm">
                              <p className="mb-2">
                                Minimal protection, used when no respiratory or skin hazards exist.
                              </p>
                              <ul className="space-y-1 list-disc pl-5">
                                <li>Standard work uniform</li>
                                <li>Gloves as needed</li>
                                <li>Safety glasses or goggles</li>
                                <li>Face shield (optional)</li>
                              </ul>
                              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                <strong>When to use:</strong> No contaminants present, no splash, vapor, or dust
                                hazards, routine medical care after decontamination.
                              </p>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">PPE Donning & Doffing Procedure</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border rounded-md p-3">
                              <h5 className="text-sm font-medium mb-2 flex items-center gap-1">
                                <User className="h-4 w-4 text-green-600" />
                                Donning Procedure
                              </h5>
                              <ol className="space-y-1 list-decimal pl-5 text-sm">
                                <li>Inspect all PPE for damage</li>
                                <li>Remove jewelry and personal items</li>
                                <li>Don inner gloves</li>
                                <li>Put on chemical-resistant suit</li>
                                <li>Put on boots/boot covers</li>
                                <li>Don respiratory protection</li>
                                <li>Put on outer gloves</li>
                                <li>Seal all openings with tape</li>
                                <li>Have partner verify complete coverage</li>
                              </ol>
                            </div>

                            <div className="border rounded-md p-3">
                              <h5 className="text-sm font-medium mb-2 flex items-center gap-1">
                                <User className="h-4 w-4 text-red-600" />
                                Doffing Procedure
                              </h5>
                              <ol className="space-y-1 list-decimal pl-5 text-sm">
                                <li>Gross decontamination of PPE</li>
                                <li>Remove tape at closures</li>
                                <li>Remove outer gloves</li>
                                <li>Remove suit, rolling downward</li>
                                <li>Remove boots/boot covers</li>
                                <li>Remove respiratory protection</li>
                                <li>Remove inner gloves</li>
                                <li>Perform personal hygiene</li>
                                <li>Document exposure time</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="text-center py-12">
              <Droplets className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">Decontamination Configuration</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Configure your decontamination procedures and PPE requirements for chemical, biological, and
                radiological exposures.
              </p>
              <div className="max-w-md mx-auto space-y-4">
                <div className="space-y-2 text-left">
                  <Label htmlFor="decon-location">Decontamination Area Location</Label>
                  <Input
                    id="decon-location"
                    placeholder="e.g., Ambulance bay, dedicated decon room"
                    defaultValue="Ambulance Bay - East Entrance"
                  />
                </div>

                <div className="space-y-2 text-left">
                  <Label htmlFor="decon-team">Decontamination Team Members</Label>
                  <Textarea
                    id="decon-team"
                    placeholder="List team members and contact information"
                    defaultValue="Dr. James Wilson (Team Lead): Ext. 5678
Nurse Sarah Johnson: Ext. 5679
Technician Robert Chen: Ext. 5680
Security Officer Michael Davis: Ext. 5681"
                  />
                </div>

                <div className="space-y-2 text-left">
                  <Label htmlFor="default-ppe">Default PPE Level</Label>
                  <Select defaultValue="levelC">
                    <SelectTrigger id="default-ppe">
                      <SelectValue placeholder="Select default PPE level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="levelA">Level A</SelectItem>
                      <SelectItem value="levelB">Level B</SelectItem>
                      <SelectItem value="levelC">Level C</SelectItem>
                      <SelectItem value="levelD">Level D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 text-left">
                  <Label htmlFor="decon-protocol">Decontamination Protocol</Label>
                  <Textarea
                    id="decon-protocol"
                    placeholder="Describe your facility's decontamination protocol"
                    defaultValue="1. Initial assessment at triage point
2. Removal of clothing and personal items
3. Dry decontamination if appropriate
4. Wet decontamination with warm water and mild soap
5. Rinse thoroughly
6. Dry and provide clean garments
7. Medical evaluation
8. Documentation and disposition"
                  />
                </div>

                <Button className="w-full">Save Decontamination Configuration</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

