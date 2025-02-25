import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Clock, FileText, Play, Users } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"

export default function EmergencyToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Emergency Response Tools</h1>
            <p className="text-gray-600 dark:text-gray-400">Access protocols and tools for mass casualty events</p>
          </div>

          <Button className="bg-red-600 hover:bg-red-700 text-white">Activate Emergency Mode</Button>
        </div>

        <Tabs defaultValue="protocols" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="protocols">Response Protocols</TabsTrigger>
            <TabsTrigger value="checklists">Checklists</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="drills">Drills</TabsTrigger>
          </TabsList>

          <TabsContent value="protocols" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Active Shooter Response",
                  description: "Step-by-step protocol for active shooter situations",
                  lastUpdated: "Jan 15, 2025",
                  steps: 12,
                  tag: "Critical",
                },
                {
                  title: "Chemical Exposure Protocol",
                  description: "Procedures for managing chemical exposure incidents",
                  lastUpdated: "Dec 10, 2024",
                  steps: 15,
                  tag: "Important",
                },
                {
                  title: "Mass Casualty Triage",
                  description: "Triage procedures for mass casualty events",
                  lastUpdated: "Feb 1, 2025",
                  steps: 18,
                  tag: "Critical",
                },
                {
                  title: "Hospital Evacuation",
                  description: "Procedures for safe hospital evacuation",
                  lastUpdated: "Jan 30, 2025",
                  steps: 20,
                },
                {
                  title: "Multi-Agency Coordination",
                  description: "Protocols for coordinating with external agencies",
                  lastUpdated: "Jan 5, 2025",
                  steps: 14,
                },
                {
                  title: "Communication Failure Protocol",
                  description: "Procedures when normal communication systems fail",
                  lastUpdated: "Dec 20, 2024",
                  steps: 10,
                  tag: "Important",
                },
              ].map((protocol, index) => (
                <ProtocolCard key={index} protocol={protocol} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="checklists" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Response Checklists</CardTitle>
                <CardDescription>Quick reference checklists for emergency situations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Initial Response Checklist", items: 15, lastUsed: "Feb 10, 2025" },
                    { name: "Triage Station Setup", items: 12, lastUsed: "Jan 25, 2025" },
                    { name: "Communication Protocol", items: 8, lastUsed: "Feb 5, 2025" },
                    { name: "Resource Allocation", items: 10, lastUsed: "Jan 15, 2025" },
                    { name: "Staff Assignment", items: 14, lastUsed: "Feb 12, 2025" },
                  ].map((checklist, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 border rounded-md dark:border-gray-700"
                    >
                      <div>
                        <p className="font-medium dark:text-white">{checklist.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {checklist.items} items • Last used: {checklist.lastUsed}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Documentation Templates</CardTitle>
                  <CardDescription>Standardized forms for emergency documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "Patient Triage Form",
                      "Incident Report Template",
                      "Resource Request Form",
                      "Staff Assignment Log",
                      "Patient Tracking Sheet",
                    ].map((template, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 border rounded-md dark:border-gray-700"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <span className="dark:text-white">{template}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Reference Guides</CardTitle>
                  <CardDescription>Essential information for emergency response</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "Triage Color Coding System",
                      "Emergency Contact Directory",
                      "Medication Dosage Chart",
                      "Decontamination Procedures",
                      "Communication Codes",
                    ].map((guide, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 border rounded-md dark:border-gray-700"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <span className="dark:text-white">{guide}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="drills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Response Drills</CardTitle>
                <CardDescription>Practice scenarios for emergency preparedness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Active Shooter Response",
                      type: "Virtual Drill",
                      date: "Mar 3, 2025",
                      time: "10:00 AM",
                      participants: 45,
                      status: "Scheduled",
                    },
                    {
                      name: "Mass Casualty Triage",
                      type: "On-site Drill",
                      date: "Mar 15, 2025",
                      time: "2:00 PM",
                      participants: 60,
                      status: "Scheduled",
                    },
                    {
                      name: "Chemical Exposure Response",
                      type: "Virtual Drill",
                      date: "Feb 10, 2025",
                      time: "9:00 AM",
                      participants: 38,
                      status: "Completed",
                    },
                    {
                      name: "Hospital Evacuation",
                      type: "On-site Drill",
                      date: "Jan 25, 2025",
                      time: "1:00 PM",
                      participants: 75,
                      status: "Completed",
                    },
                  ].map((drill, index) => (
                    <div key={index} className="border rounded-lg p-4 dark:border-gray-700">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold dark:text-white">{drill.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{drill.type}</p>
                        </div>
                        <Badge variant={drill.status === "Scheduled" ? "outline" : "secondary"}>{drill.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="dark:text-gray-300">
                            {drill.date}, {drill.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="dark:text-gray-300">{drill.participants} participants</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          variant={drill.status === "Scheduled" ? "default" : "outline"}
                          className={drill.status === "Scheduled" ? "bg-red-600 hover:bg-red-700" : ""}
                        >
                          {drill.status === "Scheduled" ? "Join Drill" : "View Results"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function ProtocolCard({ protocol }: { protocol: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1">{protocol.title}</CardTitle>
          {protocol.tag && (
            <Badge className={protocol.tag === "Critical" ? "bg-red-600" : "bg-amber-600" } style={{color:"white"}}>{protocol.tag}</Badge>
          )}
        </div>
        <CardDescription className="line-clamp-2">{protocol.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm mb-4">
          <div className="flex items-center gap-1">
            <AlertCircle className="h-4 w-4 text-gray-500" />
            <span>{protocol.steps} steps</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>Updated: {protocol.lastUpdated}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Preview
        </Button>
        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
          <Play className="h-4 w-4 mr-2" /> Start Protocol
        </Button>
      </CardFooter>
    </Card>
  )
}

