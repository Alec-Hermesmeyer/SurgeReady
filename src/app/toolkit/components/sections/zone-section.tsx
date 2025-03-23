"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Info, Map, Printer, Upload } from "lucide-react"

interface ZoneSectionProps {
  zone: string
  ratio: string
  emergencyMode: boolean
  drillMode: boolean
  zoneConfig: any
  setZoneConfig: (config: any) => void
  onSave: () => void
}

export function ZoneSection({
  zone,
  ratio,
  emergencyMode,
  drillMode,
  zoneConfig,
  setZoneConfig,
  onSave,
}: ZoneSectionProps) {
  const zoneColor = {
    Red: "bg-red-600 text-white",
    Yellow: "bg-yellow-500 text-white",
    Green: "bg-green-600 text-white",
    Black: "bg-gray-800 text-white",
  }[zone]

  const zoneBadgeColor = {
    Red: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    Yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    Green: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Black: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
  }[zone]

  return (
    <div className="space-y-6 w-full px-4">
      <Card className="border-2 border-gray-200 dark:border-gray-700 w-full">
        <CardHeader
          className={emergencyMode ? "bg-red-600 text-white" : drillMode ? "bg-amber-500 text-white" : zoneColor}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertCircle className="h-6 w-6" />
                {zone} Zone Configuration
              </CardTitle>
              {!emergencyMode && !drillMode && <Badge className={zoneBadgeColor}>{zone} Zone</Badge>}
            </div>
          </div>
          <CardDescription className={emergencyMode || drillMode || zoneColor ? "text-white/80" : ""}>
            Configure procedures for the {zone} Zone during mass casualty events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {(emergencyMode || drillMode) && (
            <Alert className="bg-blue-50 text-blue-800 border-blue-200">
              <Info className="h-4 w-4" />
              <AlertTitle>Active Checklist</AlertTitle>
              <AlertDescription>Use this checklist to ensure all {zone} Zone procedures are followed</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full">
            <div className="space-y-4">
              <div>
                <Label htmlFor={`${zone.toLowerCase()}-communication`} className="text-base font-medium">
                  Communication with Charge RN
                </Label>
                <Select
                  defaultValue={zoneConfig.communication}
                  onValueChange={(value) => setZoneConfig({ ...zoneConfig, communication: value })}
                >
                  <SelectTrigger id={`${zone.toLowerCase()}-communication`} className="mt-2">
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
                <Label htmlFor={`${zone.toLowerCase()}-location`} className="text-base font-medium">
                  Zone Location
                </Label>
                <Textarea
                  id={`${zone.toLowerCase()}-location`}
                  placeholder={`Where is the ${zone} Zone located?`}
                  className="min-h-[100px] mt-2"
                  value={zoneConfig.location}
                  onChange={(e) => setZoneConfig({ ...zoneConfig, location: e.target.value })}
                />
                <div className="mt-2 flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Zone Map
                  </Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Map className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Zone Map</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Team Roles</Label>
                <div className="mt-2 space-y-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${zone.toLowerCase()}-role-med-rn`}
                      checked={zoneConfig.teamRoles.medRN}
                      onCheckedChange={(checked) =>
                        setZoneConfig({
                          ...zoneConfig,
                          teamRoles: {
                            ...zoneConfig.teamRoles,
                            medRN: !!checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor={`${zone.toLowerCase()}-role-med-rn`} className="font-normal">
                      Med RN
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${zone.toLowerCase()}-role-lab-runner`}
                      checked={zoneConfig.teamRoles.labRunner}
                      onCheckedChange={(checked) =>
                        setZoneConfig({
                          ...zoneConfig,
                          teamRoles: {
                            ...zoneConfig.teamRoles,
                            labRunner: !!checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor={`${zone.toLowerCase()}-role-lab-runner`} className="font-normal">
                      {zone === "Black" ? "Lab Runner" : "Blood bank/lab runner"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${zone.toLowerCase()}-role-piv`}
                      checked={zoneConfig.teamRoles.pivStarter}
                      onCheckedChange={(checked) =>
                        setZoneConfig({
                          ...zoneConfig,
                          teamRoles: {
                            ...zoneConfig.teamRoles,
                            pivStarter: !!checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor={`${zone.toLowerCase()}-role-piv`} className="font-normal">
                      PIV starter
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${zone.toLowerCase()}-role-transporter`}
                      checked={zoneConfig.teamRoles.transporter}
                      onCheckedChange={(checked) =>
                        setZoneConfig({
                          ...zoneConfig,
                          teamRoles: {
                            ...zoneConfig.teamRoles,
                            transporter: !!checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor={`${zone.toLowerCase()}-role-transporter`} className="font-normal">
                      Transporter
                    </Label>
                  </div>
                  {zone !== "Black" && (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${zone.toLowerCase()}-role-vitals`}
                        checked={zoneConfig.teamRoles.vitals}
                        onCheckedChange={(checked) =>
                          setZoneConfig({
                            ...zoneConfig,
                            teamRoles: {
                              ...zoneConfig.teamRoles,
                              vitals: !!checked,
                            },
                          })
                        }
                      />
                      <Label htmlFor={`${zone.toLowerCase()}-role-vitals`} className="font-normal">
                        Vital Signs
                      </Label>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${zone.toLowerCase()}-role-other`}
                      checked={zoneConfig.teamRoles.other}
                      onCheckedChange={(checked) =>
                        setZoneConfig({
                          ...zoneConfig,
                          teamRoles: {
                            ...zoneConfig.teamRoles,
                            other: !!checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor={`${zone.toLowerCase()}-role-other`} className="font-normal">
                      Additional roles
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor={`${zone.toLowerCase()}-other-roles`} className="text-base font-medium">
                  Additional Roles
                </Label>
                <Textarea
                  id={`${zone.toLowerCase()}-other-roles`}
                  placeholder="Specify other important roles"
                  className="min-h-[100px] mt-2"
                  value={zoneConfig.otherRoles}
                  onChange={(e) => setZoneConfig({ ...zoneConfig, otherRoles: e.target.value })}
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

          {(emergencyMode || drillMode) && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
              <h3 className="font-medium mb-3">{zone} Zone Checklist</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id={`${zone.toLowerCase()}-check-1`} />
                  <Label htmlFor={`${zone.toLowerCase()}-check-1`} className="font-normal">
                    Establish Lead RN/MD
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id={`${zone.toLowerCase()}-check-2`} />
                  <Label htmlFor={`${zone.toLowerCase()}-check-2`} className="font-normal">
                    Ensure radio communication with Charge RN
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id={`${zone.toLowerCase()}-check-3`} />
                  <Label htmlFor={`${zone.toLowerCase()}-check-3`} className="font-normal">
                    Coordinate room assignments for zone
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id={`${zone.toLowerCase()}-check-4`} />
                  <Label htmlFor={`${zone.toLowerCase()}-check-4`} className="font-normal">
                    Establish {zone} Team members
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id={`${zone.toLowerCase()}-check-6`} />
                  <Label htmlFor={`${zone.toLowerCase()}-check-6`} className="font-normal">
                    Ensure adequate supplies are available
                  </Label>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="outline" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print {zone} Zone Protocol
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={onSave}>
              Save {zone} Zone Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

