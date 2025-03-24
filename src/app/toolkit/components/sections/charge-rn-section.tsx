"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FileText, Info, Map, Printer, Upload, Users } from "lucide-react"

interface ChargeRNSectionProps {
  emergencyMode: boolean
  drillMode: boolean
  chargeRNConfig: any
  setChargeRNConfig: (config: any) => void
  onSave: () => void
}

export function ChargeRNSection({
  emergencyMode,
  drillMode,
  chargeRNConfig,
  setChargeRNConfig,
  onSave,
}: ChargeRNSectionProps) {
  return (
    <div className="space-y-6 w-full px-4">
      <Card className="border-2 border-gray-200 dark:border-gray-700 w-full">
        <CardHeader
          className={
            emergencyMode
              ? "bg-red-600 text-white"
              : drillMode
                ? "bg-amber-500 text-white"
                : "bg-gray-100 dark:bg-gray-800"
          }
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="h-6 w-6" />
                Charge RN Configuration
              </CardTitle>
              <CardDescription className={emergencyMode || drillMode ? "text-white/80" : ""}>
                Configure procedures for the Charge RN during mass casualty events
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {(emergencyMode || drillMode) && (
            <Alert className="bg-blue-50 text-blue-800 border-blue-200">
              <Info className="h-4 w-4" />
              <AlertTitle>Active Checklist</AlertTitle>
              <AlertDescription>Use this checklist to ensure all Charge RN procedures are followed</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Who can call a disaster?</Label>
                <div className="mt-2 space-y-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="call-md"
                      checked={chargeRNConfig.canCallDisaster.edMD}
                      onCheckedChange={(checked) =>
                        setChargeRNConfig({
                          ...chargeRNConfig,
                          canCallDisaster: {
                            ...chargeRNConfig.canCallDisaster,
                            edMD: !!checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor="call-md" className="font-normal">
                      ED MD
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="call-supervisor"
                      checked={chargeRNConfig.canCallDisaster.supervisor}
                      onCheckedChange={(checked) =>
                        setChargeRNConfig({
                          ...chargeRNConfig,
                          canCallDisaster: {
                            ...chargeRNConfig.canCallDisaster,
                            supervisor: !!checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor="call-supervisor" className="font-normal">
                      House Supervisor
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="call-admin"
                      checked={chargeRNConfig.canCallDisaster.admin}
                      onCheckedChange={(checked) =>
                        setChargeRNConfig({
                          ...chargeRNConfig,
                          canCallDisaster: {
                            ...chargeRNConfig.canCallDisaster,
                            admin: !!checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor="call-admin" className="font-normal">
                      Admin
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="call-other"
                      checked={chargeRNConfig.canCallDisaster.other}
                      onCheckedChange={(checked) =>
                        setChargeRNConfig({
                          ...chargeRNConfig,
                          canCallDisaster: {
                            ...chargeRNConfig.canCallDisaster,
                            other: !!checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor="call-other" className="font-normal">
                      Other
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="facility-code" className="text-base font-medium">
                  What is the facility code called?
                </Label>
                <Input
                  id="facility-code"
                  placeholder="e.g., Code Triage, Code Orange, etc."
                  className="mt-2"
                  value={chargeRNConfig.facilityCode}
                  onChange={(e) => setChargeRNConfig({ ...chargeRNConfig, facilityCode: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="resource-coordinator" className="text-base font-medium">
                  Resource Pool Coordinator
                </Label>
                <Input
                  id="resource-coordinator"
                  placeholder="Optional position"
                  className="mt-2"
                  value={chargeRNConfig.resourceCoordinator}
                  onChange={(e) => setChargeRNConfig({ ...chargeRNConfig, resourceCoordinator: e.target.value })}
                />
                <p className="text-sm text-gray-500 mt-1">Optional position</p>
              </div>

              <div>
                <Label htmlFor="hazmat-response" className="text-base font-medium">
                  Who is the facility hazmat response?
                </Label>
                <Textarea
                  id="hazmat-response"
                  placeholder="Describe hazmat response team and procedures"
                  className="min-h-[100px] mt-2"
                  value={chargeRNConfig.hazmatResponse}
                  onChange={(e) => setChargeRNConfig({ ...chargeRNConfig, hazmatResponse: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="zone-locations" className="text-base font-medium">
                  Zone Locations
                </Label>
                <Textarea
                  id="zone-locations"
                  placeholder="Edit here for pre-established zones"
                  className="min-h-[100px] mt-2"
                  value={chargeRNConfig.zoneLocations}
                  onChange={(e) => setChargeRNConfig({ ...chargeRNConfig, zoneLocations: e.target.value })}
                />
                <div className="mt-2 flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Digital Map
                  </Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Map className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Facility Map</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div>
                <Label htmlFor="communication-method" className="text-base font-medium">
                  How is communication being handled?
                </Label>
                <Select
                  defaultValue={chargeRNConfig.communicationMethod}
                  onValueChange={(value) => setChargeRNConfig({ ...chargeRNConfig, communicationMethod: value })}
                >
                  <SelectTrigger id="communication-method" className="mt-2">
                    <SelectValue placeholder="Select communication method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="radio">Radio</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="downtime-procedures" className="text-base font-medium">
                  Downtime Procedures
                </Label>
                <Textarea
                  id="downtime-procedures"
                  placeholder="What is the facility policy?"
                  className="min-h-[100px] mt-2"
                  value={chargeRNConfig.downtimeProcedures}
                  onChange={(e) => setChargeRNConfig({ ...chargeRNConfig, downtimeProcedures: e.target.value })}
                />
                <div className="mt-2 flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Policies/Documents
                  </Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Uploaded Documents</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Four S&apos;s Report to Incident Command</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Assess every 15 minutes or as needed</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full">
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

          {(emergencyMode || drillMode) && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
              <h3 className="font-medium mb-3">Charge RN Checklist</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="charge-check-1" />
                  <Label htmlFor="charge-check-1" className="font-normal">
                    Work with ED MD/House Supervisor/Admin to activate mass casualty code
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="charge-check-2" />
                  <Label htmlFor="charge-check-2" className="font-normal">
                    Work with ED MDs to rapid triage current patients
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="charge-check-3" />
                  <Label htmlFor="charge-check-3" className="font-normal">
                    Assign Triage Lead
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="charge-check-4" />
                  <Label htmlFor="charge-check-4" className="font-normal">
                    Establish Lead RN/MD for each zone
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="charge-check-5" />
                  <Label htmlFor="charge-check-5" className="font-normal">
                    Establish Resource Pool Coordinator
                  </Label>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="outline" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print Charge RN Protocol
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={onSave}>
              Save Charge RN Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

