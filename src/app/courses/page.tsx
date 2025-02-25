import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, Filter, Play, Search, Star, Users } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import Image from "next/image"
interface Course {
  title: string
  description: string
  level: string
  duration: string
  students: number
  rating: number
  image: string
  tag?: string
}
export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Course Catalog</h1>
            <p className="text-gray-600 dark:text-gray-400">Browse and enroll in emergency response training</p>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input placeholder="Search courses..." className="pl-10 w-full md:w-64" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="certification">Certification Paths</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Mass Casualty Triage Protocol",
                  description: "Learn to efficiently assess and prioritize patients during mass casualty events",
                  level: "Intermediate",
                  duration: "8 hours",
                  students: 1245,
                  rating: 4.8,
                  image: "/placeholder.svg?height=200&width=400",
                  tag: "Popular",
                },
                {
                  title: "Emergency Department Surge Response",
                  description: "Strategies for managing sudden influxes of patients in emergency departments",
                  level: "Advanced",
                  duration: "12 hours",
                  students: 987,
                  rating: 4.7,
                  image: "/placeholder.svg?height=200&width=400",
                  tag: "Certification",
                },
                {
                  title: "Chemical Exposure Management",
                  description: "Protocols for handling patients exposed to hazardous chemicals",
                  level: "Intermediate",
                  duration: "6 hours",
                  students: 756,
                  rating: 4.6,
                  image: "/placeholder.svg?height=200&width=400",
                },
                {
                  title: "Active Shooter Response",
                  description: "Safety protocols and response procedures during active shooter events",
                  level: "All Levels",
                  duration: "4 hours",
                  students: 1876,
                  rating: 4.9,
                  image: "/placeholder.svg?height=200&width=400",
                  tag: "Essential",
                },
                {
                  title: "Hospital Evacuation Planning",
                  description: "Develop and implement effective hospital evacuation plans",
                  level: "Advanced",
                  duration: "10 hours",
                  students: 543,
                  rating: 4.5,
                  image: "/placeholder.svg?height=200&width=400",
                },
                {
                  title: "Emergency Communication Systems",
                  description: "Learn to use and maintain emergency communication systems",
                  level: "Beginner",
                  duration: "5 hours",
                  students: 892,
                  rating: 4.4,
                  image: "/placeholder.svg?height=200&width=400",
                  tag: "New",
                },
              ].map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommended">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Recommended courses would be displayed here */}
              <p className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                Recommended courses based on your role and progress would appear here
              </p>
            </div>
          </TabsContent>

          <TabsContent value="certification">
            <div className="space-y-8">
              <CertificationPath
                title="Emergency Response Specialist"
                description="Complete certification path for emergency response specialists"
                courses={[
                  "Mass Casualty Triage Protocol",
                  "Emergency Department Surge Response",
                  "Hospital Evacuation Planning",
                  "Emergency Communication Systems",
                ]}
                duration="30 hours"
                level="Advanced"
              />

              <CertificationPath
                title="Triage Management"
                description="Specialized certification for triage management during emergencies"
                courses={[
                  "Mass Casualty Triage Protocol",
                  "Patient Assessment Fundamentals",
                  "Triage Documentation Systems",
                  "Multi-Agency Coordination",
                ]}
                duration="24 hours"
                level="Intermediate"
              />

              <CertificationPath
                title="Hazardous Materials Response"
                description="Certification for handling hazardous materials emergencies"
                courses={[
                  "Chemical Exposure Management",
                  "Decontamination Procedures",
                  "Personal Protective Equipment",
                  "Hazardous Materials Identification",
                ]}
                duration="28 hours"
                level="Advanced"
              />
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* New courses would be displayed here */}
              <p className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                Newly added courses would appear here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full p-12">
        <Image height={200} width={400} src={course.image || "/placeholder.svg"} alt={course.title} className="h-full w-full object-cover" />
        {course.tag && <Badge className="absolute  top-3 right-3 bg-red-600 text-white">{course.tag}</Badge>}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-gray-500" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{course.rating}</span>
          </div>
        </div>
        <Badge variant="outline" className="mr-2">
          {course.level}
        </Badge>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">{course.level} Level</span>
        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
          <Play className="h-4 w-4 mr-2" /> Enroll
        </Button>
      </CardFooter>
    </Card>
  )
}

function CertificationPath({
  title,
  description,
  courses,
  duration,
  level,
}: {
  title: string
  description: string
  courses: string[]
  duration: string
  level: string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant="outline">{level}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="font-medium mb-2 dark:text-white">Included Courses:</h4>
        <ul className="space-y-2 mb-4">
          {courses.map((course, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-600"></div>
              <span className="dark:text-gray-300">{course}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Total Duration: {duration}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Enroll in Certification Path</Button>
      </CardFooter>
    </Card>
  )
}

