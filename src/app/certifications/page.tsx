import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Award, Calendar, Check, Clock, Download, Filter, Search, Star, Users } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import Image from "next/image"

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Certifications</h1>
            <p className="text-gray-600 dark:text-gray-400">Track and manage your emergency response certifications</p>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input placeholder="Search certifications..." className="pl-10 w-full md:w-64" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">My Certifications</TabsTrigger>
            <TabsTrigger value="available">Available Certifications</TabsTrigger>
            <TabsTrigger value="inprogress">In Progress</TabsTrigger>
            <TabsTrigger value="team">Team Certifications</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Basic Emergency Response",
                  level: "Level 1",
                  issueDate: "Jan 15, 2025",
                  expiryDate: "Jan 15, 2027",
                  issuer: "SurgeReady Solutions",
                  credentialId: "BER-2025-0042",
                  skills: ["Triage", "Patient Assessment", "Emergency Communication"],
                },
                {
                  title: "Triage Specialist",
                  level: "Intermediate",
                  issueDate: "Dec 10, 2024",
                  expiryDate: "Dec 10, 2026",
                  issuer: "SurgeReady Solutions",
                  credentialId: "TS-2024-1187",
                  skills: ["Advanced Triage", "Resource Allocation", "Mass Casualty Management"],
                },
                {
                  title: "Mass Casualty Management",
                  level: "Basic",
                  issueDate: "Oct 5, 2024",
                  expiryDate: "Oct 5, 2026",
                  issuer: "SurgeReady Solutions",
                  credentialId: "MCM-2024-0356",
                  skills: ["Incident Command", "Resource Management", "Multi-Agency Coordination"],
                },
                {
                  title: "Emergency Communication",
                  level: "Advanced",
                  issueDate: "Aug 22, 2024",
                  expiryDate: "Aug 22, 2026",
                  issuer: "SurgeReady Solutions",
                  credentialId: "EC-2024-0089",
                  skills: ["Crisis Communication", "Radio Operations", "Documentation"],
                },
              ].map((cert, index) => (
                <CertificationCard key={index} certification={cert} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="available" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold dark:text-white">Recommended For You</h2>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Advanced Triage Management",
                  description: "Master complex triage scenarios and leadership in mass casualty events",
                  level: "Advanced",
                  duration: "8 weeks",
                  prerequisites: ["Triage Specialist"],
                  popularity: 4.8,
                  enrollments: 342,
                  image: "/placeholder.svg?height=200&width=400",
                },
                {
                  title: "Emergency Department Leadership",
                  description: "Develop leadership skills for managing emergency departments during crises",
                  level: "Expert",
                  duration: "12 weeks",
                  prerequisites: ["3+ certifications", "5+ years experience"],
                  popularity: 4.9,
                  enrollments: 156,
                  image: "/placeholder.svg?height=200&width=400",
                },
                {
                  title: "Hazardous Materials Response",
                  description: "Learn to safely manage incidents involving hazardous materials",
                  level: "Intermediate",
                  duration: "6 weeks",
                  prerequisites: ["Basic Emergency Response"],
                  popularity: 4.7,
                  enrollments: 289,
                  image: "/placeholder.svg?height=200&width=400",
                },
                {
                  title: "Disaster Medical Response",
                  description: "Comprehensive training for medical response in disaster scenarios",
                  level: "Advanced",
                  duration: "10 weeks",
                  prerequisites: ["Basic Emergency Response", "Medical Background"],
                  popularity: 4.8,
                  enrollments: 215,
                  image: "/placeholder.svg?height=200&width=400",
                },
                {
                  title: "Emergency Preparedness Coordinator",
                  description: "Learn to develop and implement emergency preparedness programs",
                  level: "Expert",
                  duration: "14 weeks",
                  prerequisites: ["Multiple certifications", "Leadership experience"],
                  popularity: 4.9,
                  enrollments: 124,
                  image: "/placeholder.svg?height=200&width=400",
                },
                {
                  title: "Pediatric Disaster Response",
                  description: "Specialized training for managing pediatric patients in disasters",
                  level: "Advanced",
                  duration: "8 weeks",
                  prerequisites: ["Basic Emergency Response", "Pediatric experience"],
                  popularity: 4.8,
                  enrollments: 178,
                  image: "/placeholder.svg?height=200&width=400",
                },
              ].map((cert, index) => (
                <AvailableCertificationCard key={index} certification={cert} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inprogress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Advanced Emergency Response",
                  level: "Advanced",
                  progress: 65,
                  dueDate: "Apr 15, 2025",
                  completedModules: 7,
                  totalModules: 12,
                  nextModule: "Crisis Leadership",
                  estimatedCompletion: "Mar 20, 2025",
                },
                {
                  title: "Hospital Incident Command",
                  level: "Intermediate",
                  progress: 40,
                  dueDate: "May 30, 2025",
                  completedModules: 4,
                  totalModules: 10,
                  nextModule: "Resource Management",
                  estimatedCompletion: "Apr 25, 2025",
                },
              ].map((cert, index) => (
                <InProgressCertificationCard key={index} certification={cert} />
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Certification Requirements</CardTitle>
                <CardDescription>Track your progress towards certification completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold dark:text-white">Advanced Emergency Response</h3>
                      <Badge>7/12 Requirements</Badge>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "Complete all course modules", completed: true },
                        { name: "Pass final assessment with 80% or higher", completed: true },
                        { name: "Complete practical exercises", completed: true },
                        { name: "Submit case study analysis", completed: true },
                        { name: "Participate in virtual simulation", completed: true },
                        { name: "Complete peer review exercise", completed: true },
                        { name: "Submit emergency response plan", completed: true },
                        { name: "Complete on-site evaluation", completed: false },
                        { name: "Pass oral examination", completed: false },
                        { name: "Complete team leadership exercise", completed: false },
                        { name: "Submit final reflection paper", completed: false },
                        { name: "Receive supervisor endorsement", completed: false },
                      ].map((req, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div
                            className={`rounded-full p-1 ${req.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
                          >
                            {req.completed ? <Check className="h-4 w-4" /> : <div className="h-4 w-4" />}
                          </div>
                          <span className={`${req.completed ? "dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                            {req.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Certification Status</CardTitle>
                <CardDescription>Overview of team members&apos; certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      name: "Sarah Johnson",
                      role: "ER Nurse",
                      certifications: [
                        { name: "Basic Emergency Response", expiry: "Jan 2027" },
                        { name: "Triage Specialist", expiry: "Dec 2026" },
                        { name: "Mass Casualty Management", expiry: "Oct 2026" },
                        { name: "Emergency Communication", expiry: "Aug 2026" },
                        { name: "Advanced Triage Management", expiry: "Mar 2027" },
                      ],
                    },
                    {
                      name: "Michael Chen",
                      role: "ER Physician",
                      certifications: [
                        { name: "Basic Emergency Response", expiry: "Feb 2027" },
                        { name: "Mass Casualty Management", expiry: "Nov 2026" },
                        { name: "Disaster Medical Response", expiry: "Jul 2026" },
                        { name: "Emergency Department Leadership", expiry: "May 2027" },
                      ],
                    },
                    {
                      name: "David Rodriguez",
                      role: "Triage Specialist",
                      certifications: [
                        { name: "Basic Emergency Response", expiry: "Mar 2027" },
                        { name: "Triage Specialist", expiry: "Jan 2027" },
                        { name: "Emergency Communication", expiry: "Sep 2026" },
                      ],
                    },
                    {
                      name: "Emily Wilson",
                      role: "ER Technician",
                      certifications: [
                        { name: "Basic Emergency Response", expiry: "Apr 2027" },
                        { name: "Mass Casualty Management", expiry: "Dec 2026" },
                      ],
                    },
                  ].map((member, index) => (
                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0 dark:border-gray-700">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold dark:text-white">{member.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                        </div>
                        <Badge variant="outline">{member.certifications.length} Certifications</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {member.certifications.map((cert, certIndex) => (
                          <div
                            key={certIndex}
                            className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs flex items-center gap-1"
                          >
                            <Award className="h-3 w-3 text-red-600" />
                            <span className="dark:text-gray-300">{cert.name}</span>
                            <span className="text-gray-500 dark:text-gray-400">({cert.expiry})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Team Certification Report</CardTitle>
                  <CardDescription>Download detailed certification reports</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold dark:text-white">18</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Certifications</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold dark:text-white">4.5</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Avg. per Member</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-amber-600">2</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Expiring Soon</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-green-600">5</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">New This Month</p>
                    </div>
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

function CertificationCard({ certification }: { certification: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-red-600" />
              {certification.title}
            </CardTitle>
            <CardDescription>{certification.level}</CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Issued</p>
              <p className="font-medium dark:text-white">{certification.issueDate}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Expires</p>
              <p className="font-medium dark:text-white">{certification.expiryDate}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Issuer</p>
              <p className="font-medium dark:text-white">{certification.issuer}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">ID</p>
              <p className="font-medium dark:text-white">{certification.credentialId}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {certification.skills.map((skill: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Verify
        </Button>
        <Button size="sm">View Details</Button>
      </CardFooter>
    </Card>
  )
}

function AvailableCertificationCard({ certification }: { certification: any }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          height={200}
          width={400}
          src={certification.image || "/placeholder.svg"}
          alt={certification.title}
          className="h-full w-full object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-red-600 text-white">{certification.level}</Badge>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{certification.title}</CardTitle>
        <CardDescription className="line-clamp-2">{certification.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{certification.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-gray-500" />
            <span>{certification.enrollments.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{certification.popularity}</span>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Prerequisites</p>
          <ul className="space-y-1">
            {certification.prerequisites.map((prereq: string, index: number) => (
              <li key={index} className="text-sm flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                <span className="dark:text-gray-300">{prereq}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Enroll Now</Button>
      </CardFooter>
    </Card>
  )
}

function InProgressCertificationCard({ certification }: { certification: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">{certification.title}</CardTitle>
            <CardDescription>{certification.level}</CardDescription>
          </div>
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800"
          >
            In Progress
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
            <span className="font-medium dark:text-white">{certification.progress}%</span>
          </div>
          <Progress value={certification.progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Due Date</p>
            <p className="font-medium dark:text-white flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {certification.dueDate}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Est. Completion</p>
            <p className="font-medium dark:text-white">{certification.estimatedCompletion}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Modules Completed</p>
            <p className="font-medium dark:text-white">
              {certification.completedModules}/{certification.totalModules}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Next Module</p>
            <p className="font-medium dark:text-white">{certification.nextModule}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          View Details
        </Button>
        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
          Continue
        </Button>
      </CardFooter>
    </Card>
  )
}

