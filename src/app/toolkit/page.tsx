"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, ChevronRight, Info, Save, Upload } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { Badge } from "@/components/ui/badge"

export default function ToolkitPage() {
  const [activeTab, setActiveTab] = useState("triage")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Emergency Response Toolkit</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Customize your facility&apos;s mass casualty response procedures
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700 flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Configuration
            </Button>
            {saved && (
              <Badge className="bg-green-600 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Saved
              </Badge>
            )}
          </div>
        </div>

        <Tabs defaultValue="triage" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
            <TabsTrigger value="triage">Triage</TabsTrigger>
            <TabsTrigger value="charge">Charge RN</TabsTrigger>
            <TabsTrigger value="red">Red Zone</TabsTrigger>
            <TabsTrigger value="yellow">Yellow Zone</TabsTrigger>
            <TabsTrigger value="green">Green Zone</TabsTrigger>
            <TabsTrigger value="black">Black Zone</TabsTrigger>
          </TabsList>

          <TabsContent value="triage">
            <TriageSection />
          </TabsContent>

          <TabsContent value="charge">
            <ChargeRNSection />
          </TabsContent>

          <TabsContent value="red">
            <ZoneSection zone="Red" ratio="1:1 or 1:2 if possible" />
          </TabsContent>

          <TabsContent value="yellow">
            <ZoneSection zone="Yellow" ratio="1:5 if possible" />
          </TabsContent>

          <TabsContent value="green">
            <ZoneSection zone="Green" ratio="Based on staff availability" />
          </TabsContent>

          <TabsContent value="black">
            <ZoneSection zone="Black" ratio="Based on staff availability" />
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            disabled={activeTab === "triage"}
            onClick={() => {
              const tabs = ["triage", "charge", "red", "yellow", "green", "black"]
              const currentIndex = tabs.indexOf(activeTab)
              if (currentIndex > 0) {
                setActiveTab(tabs[currentIndex - 1])
              }
            }}
          >
            Previous Section
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
            disabled={activeTab === "black"}
            onClick={() => {
              const tabs = ["triage", "charge", "red", "yellow", "green", "black"]
              const currentIndex = tabs.indexOf(activeTab)
              if (currentIndex < tabs.length - 1) {
                setActiveTab(tabs[currentIndex + 1])
              }
            }}
          >
            Next Section <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}

function TriageSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Triage Configuration</CardTitle>
        <CardDescription>Configure triage procedures for mass casualty events</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="communication-type">Communication with Charge RN</Label>
              <Select defaultValue="radio">
                <SelectTrigger id="communication-type">
                  <SelectValue placeholder="Select communication type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="radio">Radio</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="pager">Pager</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">What type of communication is used?</p>
            </div>

            <div>
              <Label htmlFor="disaster-supplies">Disaster Supplies Location</Label>
              <Textarea
                id="disaster-supplies"
                placeholder="Describe where disaster supplies are located, including triage tags"
                className="min-h-[100px]"
              />
              <p className="text-sm text-gray-500 mt-1">Where are disaster supplies located, including triage tags?</p>
            </div>

            <div>
              <Label htmlFor="triage-system">Triage System</Label>
              <Select defaultValue="start">
                <SelectTrigger id="triage-system">
                  <SelectValue placeholder="Select triage system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">START</SelectItem>
                  <SelectItem value="jumpstart">JumpSTART</SelectItem>
                  <SelectItem value="salt">SALT</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">What triage system is being used?</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Triage Support Staff Roles</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="role-runners" />
                  <Label htmlFor="role-runners" className="font-normal">
                    Runners
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="role-transporters" />
                  <Label htmlFor="role-transporters" className="font-normal">
                    Transporters
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="role-housekeeping" />
                  <Label htmlFor="role-housekeeping" className="font-normal">
                    Housekeeping
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="role-other" />
                  <Label htmlFor="role-other" className="font-normal">
                    Other
                  </Label>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">What roles are important to the facility? (Select multiple)</p>
            </div>

            <div>
              <Label htmlFor="other-roles">Other Important Roles</Label>
              <Textarea
                id="other-roles"
                placeholder="Specify other important roles for triage support"
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-4">Life-Threatening Interventions</h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Ensure staff are trained to intervene for life-threatening injuries:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Apply tourniquets for severe bleeding</li>
              <li>Establish airway management</li>
              <li>Chest decompression (if trained)</li>
              <li>Hemorrhage control</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-red-600 hover:bg-red-700">Save Triage Configuration</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ChargeRNSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Charge RN Configuration</CardTitle>
        <CardDescription>Configure procedures for the Charge RN during mass casualty events</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>Who can call a disaster?</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="call-md" />
                  <Label htmlFor="call-md" className="font-normal">
                    ED MD
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="call-supervisor" />
                  <Label htmlFor="call-supervisor" className="font-normal">
                    House Supervisor
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="call-admin" />
                  <Label htmlFor="call-admin" className="font-normal">
                    Admin
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="call-other" />
                  <Label htmlFor="call-other" className="font-normal">
                    Other
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="facility-code">What is the facility code called?</Label>
              <Input id="facility-code" placeholder="e.g., Code Triage, Code Orange, etc." />
            </div>

            <div>
              <Label htmlFor="resource-coordinator">Resource Pool Coordinator</Label>
              <Input id="resource-coordinator" placeholder="Optional position" />
              <p className="text-sm text-gray-500 mt-1">Optional position</p>
            </div>

            <div>
              <Label htmlFor="hazmat-response">Who is the facility hazmat response?</Label>
              <Textarea
                id="hazmat-response"
                placeholder="Describe hazmat response team and procedures"
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="zone-locations">Zone Locations</Label>
              <Textarea
                id="zone-locations"
                placeholder="Edit here for pre-established zones"
                className="min-h-[100px]"
              />
              <div className="mt-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Digital Map
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="communication-method">How is communication being handled?</Label>
              <Select defaultValue="radio">
                <SelectTrigger id="communication-method">
                  <SelectValue placeholder="Select communication method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="radio">Radio</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="downtime-procedures">Downtime Procedures</Label>
              <Textarea id="downtime-procedures" placeholder="What is the facility policy?" className="min-h-[100px]" />
              <div className="mt-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Policies/Documents
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-4">Four S&apos;s Report to Incident Command</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Assess every 15 minutes or as needed</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-bold mb-2">SPACE</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                <li>Do you have enough rooms/areas to care for your patients?</li>
                <li>Do you need additional stretchers/chairs/etc.?</li>
              </ul>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-bold mb-2">SUPPLIES</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                <li>Do you have enough supplies? (Wheelchairs, tourniquets, PIVs, blood, linens, etc.)</li>
                <li>Do you have enough medications?</li>
              </ul>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-bold mb-2">STAFF</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                <li>Do you need additional staff in the ED?</li>
                <li>Nurses, techs, housekeeping, runners, transporters, etc.?</li>
              </ul>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-bold mb-2">SYSTEMS</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                <li>How many patients are in each zone?</li>
                <li>How many need to go to the OR, ICU, or Med-Surg?</li>
                <li>How many patients are deceased?</li>
                <li>What are the barriers to patient flow?</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-red-600 hover:bg-red-700">Save Charge RN Configuration</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ZoneSection({ zone, ratio }: { zone: string; ratio: string }) {
  const zoneColor = {
    Red: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    Yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    Green: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Black: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
  }[zone]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{zone} Zone Configuration</CardTitle>
          <Badge className={zoneColor}>{zone} Zone</Badge>
        </div>
        <CardDescription>Configure procedures for the {zone} Zone during mass casualty events</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor={`${zone.toLowerCase()}-communication`}>Communication with Charge RN</Label>
              <Select defaultValue="radio">
                <SelectTrigger id={`${zone.toLowerCase()}-communication`}>
                  <SelectValue placeholder="Select communication type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="radio">Radio</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">What type of communication is used?</p>
            </div>

            <div>
              <Label htmlFor={`${zone.toLowerCase()}-location`}>Zone Location</Label>
              <Textarea
                id={`${zone.toLowerCase()}-location`}
                placeholder={`Where is the ${zone} Zone located?`}
                className="min-h-[100px]"
              />
              <div className="mt-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Zone Map
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Team Roles</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id={`${zone.toLowerCase()}-role-med-rn`} />
                  <Label htmlFor={`${zone.toLowerCase()}-role-med-rn`} className="font-normal">
                    Med RN
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id={`${zone.toLowerCase()}-role-lab-runner`} />
                  <Label htmlFor={`${zone.toLowerCase()}-role-lab-runner`} className="font-normal">
                    {zone === "Black" ? "Lab Runner" : "Blood bank/lab runner"}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id={`${zone.toLowerCase()}-role-piv`} />
                  <Label htmlFor={`${zone.toLowerCase()}-role-piv`} className="font-normal">
                    PIV starter
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id={`${zone.toLowerCase()}-role-transporter`} />
                  <Label htmlFor={`${zone.toLowerCase()}-role-transporter`} className="font-normal">
                    Transporter
                  </Label>
                </div>
                {zone !== "Black" && (
                  <div className="flex items-center space-x-2">
                    <Checkbox id={`${zone.toLowerCase()}-role-vitals`} />
                    <Label htmlFor={`${zone.toLowerCase()}-role-vitals`} className="font-normal">
                      Vital Signs
                    </Label>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Checkbox id={`${zone.toLowerCase()}-role-other`} />
                  <Label htmlFor={`${zone.toLowerCase()}-role-other`} className="font-normal">
                    Additional roles
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor={`${zone.toLowerCase()}-other-roles`}>Additional Roles</Label>
              <Textarea
                id={`${zone.toLowerCase()}-other-roles`}
                placeholder="Specify other important roles"
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center gap-3">
          <Info className="h-5 w-5 text-blue-600" />
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">RN Ratio:</span> {ratio}
          </p>
        </div>

        <div className="flex justify-end">
          <Button className="bg-red-600 hover:bg-red-700">Save {zone} Zone Configuration</Button>
        </div>
      </CardContent>
    </Card>
  )
}

