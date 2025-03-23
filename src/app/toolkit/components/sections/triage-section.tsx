"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Activity, Info, Printer } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface TriageSectionProps {
  emergencyMode: boolean
  drillMode: boolean
  triageConfig: any
  setTriageConfig: (config: any) => void
  onSave: () => void
}

export function TriageSection({ emergencyMode, drillMode, triageConfig, setTriageConfig, onSave }: TriageSectionProps) {
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
                <Activity className="h-6 w-6" />
                Triage Configuration
              </CardTitle>
              <CardDescription className={emergencyMode || drillMode ? "text-white/80" : ""}>
                Configure triage procedures for mass casualty events
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {(emergencyMode || drillMode) && (
            <Alert className="bg-blue-50 text-blue-800 border-blue-200">
              <Info className="h-4 w-4" />
              <AlertTitle>Active Checklist</AlertTitle>
              <AlertDescription>Use this checklist to ensure all triage procedures are followed</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full">
            <div className="space-y-4">
              <div>
                <Label htmlFor="communication-type" className="text-base font-medium">
                  Communication with Charge RN
                </Label>
                <Select
                  defaultValue={triageConfig.communicationType}
                  onValueChange={(value) => setTriageConfig({ ...triageConfig, communicationType: value })}
                >
                  <SelectTrigger id="communication-type" className="mt-2">
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
                <Label htmlFor="disaster-supplies" className="text-base font-medium">
                  Disaster Supplies Location
                </Label>
                <Textarea
                  id="disaster-supplies"
                  placeholder="Describe where disaster supplies are located, including triage tags"
                  className="min-h-[100px] mt-2"
                  value={triageConfig.disasterSuppliesLocation}
                  onChange={(e) => setTriageConfig({ ...triageConfig, disasterSuppliesLocation: e.target.value })}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Where are disaster supplies located, including triage tags?
                </p>
              </div>

              <div>
                <Label htmlFor="triage-system" className="text-base font-medium">
                  Triage System
                </Label>
                <Select
                  defaultValue={triageConfig.triageSystem}
                  onValueChange={(value) => setTriageConfig({ ...triageConfig, triageSystem: value })}
                >
                  <SelectTrigger id="triage-system" className="mt-2">
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
                <Label className="text-base font-medium">Triage Support Staff Roles</Label>
                <div className="mt-2 space-y-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="role-runners"
                      checked={triageConfig.supportStaffRoles.runners}
                      onCheckedChange={(checked) =>
                        setTriageConfig({
                          ...triageConfig,
                          supportStaffRoles: {
                            ...triageConfig.supportStaffRoles,
                            runners: !!checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor="role-runners" className="font-normal">
                      Runners
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="role-transporters"
                      checked={triageConfig.supportStaffRoles.transporters}
                      onCheckedChange={(checked) =>
                        setTriageConfig({
                          ...triageConfig,
                          supportStaffRoles: {
                            ...triageConfig.supportStaffRoles,
                            transporters: !!checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor="role-transporters" className="font-normal">
                      Transporters
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="role-housekeeping"
                      checked={triageConfig.supportStaffRoles.housekeeping}
                      onCheckedChange={(checked) =>
                        setTriageConfig({
                          ...triageConfig,
                          supportStaffRoles: {
                            ...triageConfig.supportStaffRoles,
                            housekeeping: !!checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor="role-housekeeping" className="font-normal">
                      Housekeeping
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="role-other"
                      checked={triageConfig.supportStaffRoles.other}
                      onCheckedChange={(checked) =>
                        setTriageConfig({
                          ...triageConfig,
                          supportStaffRoles: {
                            ...triageConfig.supportStaffRoles,
                            other: !!checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor="role-other" className="font-normal">
                      Other
                    </Label>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  What roles are important to the facility? (Select multiple)
                </p>
              </div>

              <div>
                <Label htmlFor="other-roles" className="text-base font-medium">
                  Other Important Roles
                </Label>
                <Textarea
                  id="other-roles"
                  placeholder="Specify other important roles for triage support"
                  className="min-h-[100px] mt-2"
                  value={triageConfig.otherRoles}
                  onChange={(e) => setTriageConfig({ ...triageConfig, otherRoles: e.target.value })}
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

          {(emergencyMode || drillMode) && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
              <h3 className="font-medium mb-3">Triage Checklist</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="triage-check-1" />
                  <Label htmlFor="triage-check-1" className="font-normal">
                    Ensure radio communication with Charge RN
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="triage-check-2" />
                  <Label htmlFor="triage-check-2" className="font-normal">
                    Obtain disaster cart with Triage Tags
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="triage-check-3" />
                  <Label htmlFor="triage-check-3" className="font-normal">
                    Use START and JumpSTART Triage
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="triage-check-4" />
                  <Label htmlFor="triage-check-4" className="font-normal">
                    Intervene for life-threatening injuries
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="triage-check-5" />
                  <Label htmlFor="triage-check-5" className="font-normal">
                    Establish needed triage support staff
                  </Label>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="outline" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print Triage Protocol
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={onSave}>
              Save Triage Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

