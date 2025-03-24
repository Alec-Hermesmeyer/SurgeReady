"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertCircle,
  Clipboard,
  Phone,
  Users,
  Truck,
  FileText,
  DollarSign,
  MessageSquare,
  Clock,
  Building,
} from "lucide-react"

interface HICSDashboardProps {
  emergencyMode: boolean
  drillMode: boolean
}

export function HICSDashboard({ emergencyMode, drillMode }: HICSDashboardProps) {
  const [notes, setNotes] = useState({
    incident: "",
    operations: "",
    planning: "",
    logistics: "",
    finance: "",
  })

  const [contacts, setContacts] = useState({
    incidentCommander: "Dr. Sarah Johnson - 555-123-4567",
    operationsChief: "Mark Stanley - 555-123-4568",
    planningChief: "Dr. Misha Turner - 555-123-4569",
    logisticsChief: "Robert Chen - 555-123-4570",
    financeChief: "Lisa Washington - 555-123-4571",
  })

  const handleNotesChange = (section: keyof typeof notes, value: string) => {
    setNotes((prev) => ({ ...prev, [section]: value }))
  }

  const handleContactChange = (role: keyof typeof contacts, value: string) => {
    setContacts((prev) => ({ ...prev, [role]: value }))
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
            <Building className="h-6 w-6" />
            Hospital Incident Command System (HICS)
          </CardTitle>
          <CardDescription className={emergencyMode || drillMode ? "text-white/80" : ""}>
            Standardized approach to incident management for events that overwhelm available resources
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {emergencyMode || drillMode ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Incident Commander - White */}
                <Card className="col-span-1 md:col-span-5 border-l-4 border-l-gray-400">
                  <CardHeader className="bg-gray-50 dark:bg-gray-800 py-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      <span>Incident Commander</span>
                      <Badge className="ml-auto bg-white text-gray-800 border border-gray-300">White</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <Input
                          value={contacts.incidentCommander}
                          onChange={(e) => handleContactChange("incidentCommander", e.target.value)}
                          className="text-sm"
                          placeholder="Contact information"
                        />
                      </div>
                      <div>
                        <Label htmlFor="incident-notes" className="text-sm">
                          Notes
                        </Label>
                        <Textarea
                          id="incident-notes"
                          value={notes.incident}
                          onChange={(e) => handleNotesChange("incident", e.target.value)}
                          placeholder="Overall management of the facility during the event"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Operations - Red */}
                <Card className="border-l-4 border-l-red-500">
                  <CardHeader className="bg-red-50 dark:bg-red-900/20 py-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span>Operations</span>
                      <Badge className="ml-auto bg-red-100 text-red-800 border border-red-200">Red</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <Input
                          value={contacts.operationsChief}
                          onChange={(e) => handleContactChange("operationsChief", e.target.value)}
                          className="text-sm"
                          placeholder="Contact information"
                        />
                      </div>
                      <div>
                        <Label htmlFor="operations-notes" className="text-sm">
                          Notes
                        </Label>
                        <Textarea
                          id="operations-notes"
                          value={notes.operations}
                          onChange={(e) => handleNotesChange("operations", e.target.value)}
                          placeholder="Direct patient care and medical operations"
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Planning - Blue */}
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="bg-blue-50 dark:bg-blue-900/20 py-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      <span>Planning</span>
                      <Badge className="ml-auto bg-blue-100 text-blue-800 border border-blue-200">Blue</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <Input
                          value={contacts.planningChief}
                          onChange={(e) => handleContactChange("planningChief", e.target.value)}
                          className="text-sm"
                          placeholder="Contact information"
                        />
                      </div>
                      <div>
                        <Label htmlFor="planning-notes" className="text-sm">
                          Notes
                        </Label>
                        <Textarea
                          id="planning-notes"
                          value={notes.planning}
                          onChange={(e) => handleNotesChange("planning", e.target.value)}
                          placeholder="Collecting and evaluating information, developing action plans"
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Logistics - Yellow */}
                <Card className="border-l-4 border-l-yellow-500">
                  <CardHeader className="bg-yellow-50 dark:bg-yellow-900/20 py-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      <span>Logistics</span>
                      <Badge className="ml-auto bg-yellow-100 text-yellow-800 border border-yellow-200">Yellow</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <Input
                          value={contacts.logisticsChief}
                          onChange={(e) => handleContactChange("logisticsChief", e.target.value)}
                          className="text-sm"
                          placeholder="Contact information"
                        />
                      </div>
                      <div>
                        <Label htmlFor="logistics-notes" className="text-sm">
                          Notes
                        </Label>
                        <Textarea
                          id="logistics-notes"
                          value={notes.logistics}
                          onChange={(e) => handleNotesChange("logistics", e.target.value)}
                          placeholder="Providing services, personnel, equipment and supplies"
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Finance & Administration - Green */}
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="bg-green-50 dark:bg-green-900/20 py-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      <span>Finance & Admin</span>
                      <Badge className="ml-auto bg-green-100 text-green-800 border border-green-200">Green</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <Input
                          value={contacts.financeChief}
                          onChange={(e) => handleContactChange("financeChief", e.target.value)}
                          className="text-sm"
                          placeholder="Contact information"
                        />
                      </div>
                      <div>
                        <Label htmlFor="finance-notes" className="text-sm">
                          Notes
                        </Label>
                        <Textarea
                          id="finance-notes"
                          value={notes.finance}
                          onChange={(e) => handleNotesChange("finance", e.target.value)}
                          placeholder="Monitoring costs, providing accounting, procurement and time recording"
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Communication Log</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 max-h-[300px] overflow-y-auto">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 mt-1 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">10:15 AM - Field IC to Hospital IC</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Multiple casualties en route, ETA 5 minutes. 8 patients total: 3 red, 3 yellow, 2 green.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 mt-1 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">10:18 AM - Hospital IC to Operations</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Prepare Red Zone for 3 critical patients. Activate trauma teams.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 mt-1 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">10:20 AM - Logistics to Hospital IC</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Additional supplies moved to ED. Blood bank notified of potential need.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 mt-1 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">10:25 AM - Planning to Hospital IC</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Staffing plan updated. Off-duty personnel being contacted.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clipboard className="h-5 w-5" />
                      <span>Action Items</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-800 text-xs font-bold">
                          1
                        </div>
                        <p className="text-sm">Operations: Ensure adequate staffing in all zones</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-800 text-xs font-bold">
                          2
                        </div>
                        <p className="text-sm">Logistics: Prepare additional supply carts for ED</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-xs font-bold">
                          3
                        </div>
                        <p className="text-sm">Planning: Update bed availability status</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-xs font-bold">
                          4
                        </div>
                        <p className="text-sm">Finance: Begin tracking resources used for event</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs font-bold">
                          5
                        </div>
                        <p className="text-sm">IC: Schedule next briefing for 11:00 AM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Building className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">HICS Configuration</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                The Hospital Incident Command System provides a standardized approach to incident management. Configure
                your HICS structure and contacts here.
              </p>
              <div className="max-w-md mx-auto space-y-4">
                <div className="space-y-2 text-left">
                  <Label htmlFor="incident-commander">Incident Commander (White)</Label>
                  <Input
                    id="incident-commander"
                    value={contacts.incidentCommander}
                    onChange={(e) => handleContactChange("incidentCommander", e.target.value)}
                    placeholder="Name and contact information"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <Label htmlFor="operations-chief">Operations Chief (Red)</Label>
                  <Input
                    id="operations-chief"
                    value={contacts.operationsChief}
                    onChange={(e) => handleContactChange("operationsChief", e.target.value)}
                    placeholder="Name and contact information"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <Label htmlFor="planning-chief">Planning Chief (Blue)</Label>
                  <Input
                    id="planning-chief"
                    value={contacts.planningChief}
                    onChange={(e) => handleContactChange("planningChief", e.target.value)}
                    placeholder="Name and contact information"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <Label htmlFor="logistics-chief">Logistics Chief (Yellow)</Label>
                  <Input
                    id="logistics-chief"
                    value={contacts.logisticsChief}
                    onChange={(e) => handleContactChange("logisticsChief", e.target.value)}
                    placeholder="Name and contact information"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <Label htmlFor="finance-chief">Finance & Admin Chief (Green)</Label>
                  <Input
                    id="finance-chief"
                    value={contacts.financeChief}
                    onChange={(e) => handleContactChange("financeChief", e.target.value)}
                    placeholder="Name and contact information"
                  />
                </div>
                <Button className="w-full">Save HICS Configuration</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

