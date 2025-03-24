"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  HeartPulse,
  TreesIcon as Lungs,
  Stethoscope,
  Users,
} from "lucide-react"

interface TriageSystemSelectorProps {
  onSystemChange: (system: "salt" | "start" | "jumpstart") => void
  selectedSystem: "salt" | "start" | "jumpstart"
}

export function TriageSystemSelector({ onSystemChange, selectedSystem }: TriageSystemSelectorProps) {
  return (
    <Card className="border-2 border-gray-200 dark:border-gray-700">
      <CardHeader className="bg-gray-100 dark:bg-gray-800">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Activity className="h-6 w-6" />
          Triage System Selection
        </CardTitle>
        <CardDescription>Select the appropriate triage system for your mass casualty response</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <RadioGroup
            defaultValue={selectedSystem}
            onValueChange={(value) => onSystemChange(value as "salt" | "start" | "jumpstart")}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="salt" id="salt" className="peer sr-only" />
              <Label
                htmlFor="salt"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="mb-3 rounded-full bg-blue-100 p-2 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium">SALT Triage</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sort, Assess, Lifesaving interventions, Treatment/Transport
                  </p>
                  <Badge className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    Comprehensive
                  </Badge>
                </div>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="start" id="start" className="peer sr-only" />
              <Label
                htmlFor="start"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="mb-3 rounded-full bg-green-100 p-2 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                  <Activity className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium">START Triage</p>
                  <p className="text-sm text-muted-foreground mt-1">Simple Triage And Rapid Treatment</p>
                  <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Field Use
                  </Badge>
                </div>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="jumpstart" id="jumpstart" className="peer sr-only" />
              <Label
                htmlFor="jumpstart"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="mb-3 rounded-full bg-purple-100 p-2 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                  <Users className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium">JumpSTART</p>
                  <p className="text-sm text-muted-foreground mt-1">Pediatric Triage System (≤8 years)</p>
                  <Badge className="mt-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                    Pediatric
                  </Badge>
                </div>
              </Label>
            </div>
          </RadioGroup>

          <Tabs
            defaultValue={selectedSystem}
            onValueChange={(value) => onSystemChange(value as "salt" | "start" | "jumpstart")}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="salt">SALT</TabsTrigger>
              <TabsTrigger value="start">START</TabsTrigger>
              <TabsTrigger value="jumpstart">JumpSTART</TabsTrigger>
            </TabsList>

            <TabsContent value="salt" className="mt-4 space-y-4">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-4 pb-2">
                  <h3 className="text-lg font-semibold leading-none tracking-tight">SALT Triage Protocol</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive triage system used primarily in hospital settings
                  </p>
                </div>
                <div className="p-4 pt-0">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                        <span className="text-sm font-bold">S</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Sort</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Global sorting: Assess if patients can walk, have purposeful movement, or obvious
                          life-threatening conditions
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                        <span className="text-sm font-bold">A</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Assess</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Individual assessment based on injury or chief complaint
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                        <span className="text-sm font-bold">L</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Lifesaving Interventions</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Control bleeding, open airways, chest decompression, auto-injector antidotes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                        <span className="text-sm font-bold">T</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Treatment/Transport</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Treat based on injury and available resources
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="rounded-md bg-red-100 p-3 dark:bg-red-900/30">
                      <h4 className="font-medium text-red-800 dark:text-red-300 flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-red-600"></div>
                        Red (Immediate)
                      </h4>
                      <p className="text-sm text-red-800/80 dark:text-red-300/80 mt-1">
                        Life-threatening injuries requiring immediate attention
                      </p>
                    </div>

                    <div className="rounded-md bg-yellow-100 p-3 dark:bg-yellow-900/30">
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-300 flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-yellow-600"></div>
                        Yellow (Delayed)
                      </h4>
                      <p className="text-sm text-yellow-800/80 dark:text-yellow-300/80 mt-1">
                        Serious injuries but can wait for treatment
                      </p>
                    </div>

                    <div className="rounded-md bg-green-100 p-3 dark:bg-green-900/30">
                      <h4 className="font-medium text-green-800 dark:text-green-300 flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-green-600"></div>
                        Green (Minimal)
                      </h4>
                      <p className="text-sm text-green-800/80 dark:text-green-300/80 mt-1">
                        Walking wounded, minor injuries
                      </p>
                    </div>

                    <div className="rounded-md bg-gray-100 p-3 dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-gray-300 flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-gray-600"></div>
                        Black (Expectant)
                      </h4>
                      <p className="text-sm text-gray-800/80 dark:text-gray-300/80 mt-1">
                        Deceased or unlikely to survive given resources
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="start" className="mt-4 space-y-4">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-4 pb-2">
                  <h3 className="text-lg font-semibold leading-none tracking-tight">START Triage Protocol</h3>
                  <p className="text-sm text-muted-foreground">
                    Simple Triage And Rapid Treatment - primarily used in field settings
                  </p>
                </div>
                <div className="p-4 pt-0">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-4">
                      <div className="rounded-md border p-4">
                        <h4 className="font-medium mb-2">START Assessment Algorithm</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                            <p className="text-sm">Can the patient walk?</p>
                            <Badge className="ml-auto bg-green-100 text-green-800">Green (Minimal)</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                            <p className="text-sm">Is the patient breathing?</p>
                            <Badge className="ml-auto bg-gray-100 text-gray-800">If No: Black (Expectant)</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                            <p className="text-sm">Respiratory rate &gt; 30/min?</p>
                            <Badge className="ml-auto bg-red-100 text-red-800">Red (Immediate)</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                            <p className="text-sm">Capillary refill &gt; 2 seconds?</p>
                            <Badge className="ml-auto bg-red-100 text-red-800">Red (Immediate)</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                            <p className="text-sm">Not following commands?</p>
                            <Badge className="ml-auto bg-red-100 text-red-800">Red (Immediate)</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                            <p className="text-sm">All other patients</p>
                            <Badge className="ml-auto bg-yellow-100 text-yellow-800">Yellow (Delayed)</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="flex flex-col items-center justify-center p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30">
                          <HeartPulse className="h-6 w-6 text-red-600 mb-2" />
                          <span className="text-sm font-medium text-red-800 dark:text-red-300">Pulse</span>
                          <span className="text-xs text-red-600 dark:text-red-400">Check radial pulse</span>
                        </div>

                        <div className="flex flex-col items-center justify-center p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                          <Lungs className="h-6 w-6 text-blue-600 mb-2" />
                          <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Respirations</span>
                          <span className="text-xs text-blue-600 dark:text-blue-400">30/min threshold</span>
                        </div>

                        <div className="flex flex-col items-center justify-center p-3 rounded-md bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30">
                          <Activity className="h-6 w-6 text-purple-600 mb-2" />
                          <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Perfusion</span>
                          <span className="text-xs text-purple-600 dark:text-purple-400">Capillary refill</span>
                        </div>

                        <div className="flex flex-col items-center justify-center p-3 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30">
                          <AlertCircle className="h-6 w-6 text-amber-600 mb-2" />
                          <span className="text-sm font-medium text-amber-800 dark:text-amber-300">Mental Status</span>
                          <span className="text-xs text-amber-600 dark:text-amber-400">Following commands</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="jumpstart" className="mt-4 space-y-4">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-4 pb-2">
                  <h3 className="text-lg font-semibold leading-none tracking-tight">JumpSTART Pediatric Triage</h3>
                  <p className="text-sm text-muted-foreground">
                    Modified START triage for children 8 years and younger
                  </p>
                </div>
                <div className="p-4 pt-0">
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <h4 className="font-medium mb-2">Pediatric Assessment Criteria</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Age Determination</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Apply to children ≤8 years, males without arm hair, females without breast development
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Respiratory Assessment</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Children with respiratory rate &lt;15 or &gt;45/min are assigned to immediate (red)
                              category
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Rescue Breaths</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Children not breathing but with a pulse receive 5 rescue breaths
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Perfusion Assessment</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Palpable pulse at any site (peripheral or central) is adequate for perfusion
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-md border p-4">
                        <h4 className="font-medium mb-2">Key Differences from START</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 text-xs">
                              1
                            </div>
                            <span>Different respiratory rate thresholds (15-45/min normal range)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 text-xs">
                              2
                            </div>
                            <span>Apneic children with pulse receive rescue breaths</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 text-xs">
                              3
                            </div>
                            <span>AVPU scale used instead of &quot;follows commands&quot;</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 text-xs">
                              4
                            </div>
                            <span>Peripheral pulse check is adequate (not just radial)</span>
                          </li>
                        </ul>
                      </div>

                      <div className="rounded-md border p-4">
                        <h4 className="font-medium mb-2">AVPU Mental Status Scale</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">A - Alert</span>
                            <Badge className="bg-green-100 text-green-800">Minimal</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">V - Responds to Voice</span>
                            <Badge className="bg-yellow-100 text-yellow-800">Delayed</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">P - Responds to Pain</span>
                            <Badge className="bg-red-100 text-red-800">Immediate</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">U - Unresponsive</span>
                            <Badge className="bg-red-100 text-red-800">Immediate</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

