import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, BadgeIcon as Certificate, Clock, Play, User, Users, Award, BarChart } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">Dashboard</h1>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="team">Team Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Courses In Progress"
                value="3"
                icon={<BookOpen className="h-5 w-5" />}
                description="2 due this week"
              />
              <StatsCard
                title="Certifications"
                value="4"
                icon={<Certificate className="h-5 w-5" />}
                description="1 expiring soon"
              />
              <StatsCard
                title="Team Completion"
                value="68%"
                icon={<Users className="h-5 w-5" />}
                description="12 team members"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your training completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <CourseProgressItem title="Mass Casualty Triage Protocol" progress={75} dueDate="Feb 28, 2025" />
                  <CourseProgressItem
                    title="Emergency Department Surge Response"
                    progress={45}
                    dueDate="Mar 15, 2025"
                  />
                  <CourseProgressItem title="Chemical Exposure Management" progress={20} dueDate="Apr 10, 2025" />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Drills</CardTitle>
                  <CardDescription>Scheduled emergency response drills</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center">
                      <div>
                        <p className="font-medium dark:text-white">Active Shooter Response</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Virtual Drill</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium dark:text-white">Mar 3, 2025</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">10:00 AM</p>
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <div>
                        <p className="font-medium dark:text-white">Mass Casualty Triage</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">On-site Drill</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium dark:text-white">Mar 15, 2025</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">2:00 PM</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Certifications</CardTitle>
                  <CardDescription>Your completed certifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium dark:text-white">Basic Emergency Response</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Level 1</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Jan 15, 2025</p>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium dark:text-white">Triage Specialist</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Intermediate</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Dec 10, 2024</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Your assigned and in-progress courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      title: "Mass Casualty Triage Protocol",
                      description: "Learn to efficiently assess and prioritize patients during mass casualty events",
                      progress: 75,
                      modules: 8,
                      completedModules: 6,
                    },
                    {
                      title: "Emergency Department Surge Response",
                      description: "Strategies for managing sudden influxes of patients in emergency departments",
                      progress: 45,
                      modules: 10,
                      completedModules: 4,
                    },
                    {
                      title: "Chemical Exposure Management",
                      description: "Protocols for handling patients exposed to hazardous chemicals",
                      progress: 20,
                      modules: 6,
                      completedModules: 1,
                    },
                    {
                      title: "Active Shooter Response",
                      description: "Safety protocols and response procedures during active shooter events",
                      progress: 0,
                      modules: 5,
                      completedModules: 0,
                    },
                  ].map((course, index) => (
                    <div key={index} className="border rounded-lg p-4 dark:border-gray-700">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold dark:text-white">{course.title}</h3>
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <Play className="h-4 w-4" />
                          {course.progress > 0 ? "Continue" : "Start"}
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{course.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="font-medium dark:text-white">
                            {course.completedModules}/{course.modules} modules
                          </span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Certifications</CardTitle>
                  <CardDescription>Your current certifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      {
                        name: "Basic Emergency Response",
                        level: "Level 1",
                        issued: "Jan 15, 2025",
                        expires: "Jan 15, 2027",
                      },
                      {
                        name: "Triage Specialist",
                        level: "Intermediate",
                        issued: "Dec 10, 2024",
                        expires: "Dec 10, 2026",
                      },
                      {
                        name: "Mass Casualty Management",
                        level: "Basic",
                        issued: "Oct 5, 2024",
                        expires: "Oct 5, 2026",
                      },
                      {
                        name: "Emergency Communication",
                        level: "Advanced",
                        issued: "Aug 22, 2024",
                        expires: "Aug 22, 2026",
                      },
                    ].map((cert, index) => (
                      <li key={index} className="border rounded-lg p-3 dark:border-gray-700">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <Award className="h-5 w-5 text-green-600" />
                              <p className="font-medium dark:text-white">{cert.name}</p>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{cert.level}</p>
                          </div>
                          <div className="text-right text-sm">
                            <p className="dark:text-white">Expires: {cert.expires}</p>
                            <p className="text-gray-500 dark:text-gray-400">Issued: {cert.issued}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Certifications</CardTitle>
                  <CardDescription>Certifications you can pursue</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      {
                        name: "Advanced Triage Management",
                        level: "Advanced",
                        prerequisites: "Triage Specialist",
                        duration: "8 weeks",
                      },
                      {
                        name: "Emergency Department Leadership",
                        level: "Expert",
                        prerequisites: "3+ certifications",
                        duration: "12 weeks",
                      },
                      {
                        name: "Hazardous Materials Response",
                        level: "Intermediate",
                        prerequisites: "Basic Emergency Response",
                        duration: "6 weeks",
                      },
                    ].map((cert, index) => (
                      <li key={index} className="border rounded-lg p-3 dark:border-gray-700">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium dark:text-white">{cert.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{cert.level}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Prereq: {cert.prerequisites}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm dark:text-white">{cert.duration}</p>
                            <Button size="sm" variant="outline" className="mt-2">
                              Enroll
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Progress</CardTitle>
                <CardDescription>Training completion for your team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      name: "Sarah Johnson",
                      role: "ER Nurse",
                      progress: 92,
                      certifications: 5,
                    },
                    {
                      name: "Michael Chen",
                      role: "ER Physician",
                      progress: 78,
                      certifications: 4,
                    },
                    {
                      name: "David Rodriguez",
                      role: "Triage Specialist",
                      progress: 85,
                      certifications: 3,
                    },
                    {
                      name: "Emily Wilson",
                      role: "ER Technician",
                      progress: 45,
                      certifications: 2,
                    },
                    {
                      name: "James Taylor",
                      role: "ER Nurse",
                      progress: 60,
                      certifications: 3,
                    },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-10 w-10 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{member.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-blue-600" />
                          <span className="text-sm font-medium dark:text-white">{member.certifications}</span>
                        </div>
                        <div className="w-32">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="font-medium dark:text-white">{member.progress}%</span>
                          </div>
                          <Progress value={member.progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Completion</CardTitle>
                <CardDescription>Training completion by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Department completion chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function StatsCard({
  title,
  value,
  icon,
  description,
}: {
  title: string
  value: string
  icon: React.ReactNode
  description: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-3xl font-bold mt-1 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          </div>
          <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function CourseProgressItem({
  title,
  progress,
  dueDate,
}: {
  title: string
  progress: number
  dueDate: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <p className="font-medium dark:text-white">{title}</p>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400">Due: {dueDate}</span>
        </div>
      </div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 dark:text-gray-400">Progress</span>
        <span className="font-medium dark:text-white">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

