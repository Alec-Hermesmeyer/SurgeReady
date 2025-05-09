import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import {
  AlertCircle,
  ArrowRight,
  Building,
  Building2,
  BuildingIcon,
  CheckCircle,
  Clock,
  Hospital,
  Shield,
  Users,
  Zap,
  BarChart,
  FileText,
  Handshake,
  Smartphone,
  Heart,
  BookOpen,
  Award,
  Quote,
  Calendar,
  CheckCircle2,
  Headset,
  LifeBuoy,
  Presentation,
  Settings,
  Star,
  Timer,
  Globe,
} from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-red-600 mr-8">
                <Image src="/SRLogo.png" alt="SurgeReady Solutions" width={200} height={100} />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <nav className="flex items-center space-x-4">
                <Link
                  href="#who-we-serve"
                  className="text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-white"
                >
                  Who We Serve
                </Link>
                <Link
                  href="#hospital-size"
                  className="text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-white"
                >
                  Hospital Size
                </Link>
                <Link
                  href="#solutions"
                  className="text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-white"
                >
                  Solutions
                </Link>
                <Link
                  href="#about-us"
                  className="text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-white"
                >
                  About Us
                </Link>
              </nav>
              <div className="flex items-center space-x-2">
                <Link href="/toolkit">
                  <Button variant="outline">Toolkit</Button>
                </Link>
                <Link href="#try-tools">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Request Demo</Button>
                </Link>
              </div>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center">
          <Image src="/SRLogo.png" alt="SurgeReady Solutions" width={600} height={600} />
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mb-8">
              Streamlining Emergency Response for Mass Casualty Events
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                Request Demo
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section id="who-we-serve" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Who We Serve</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              SurgeReady Solutions is designed for emergency departments that need to be prepared for mass casualty
              events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Hospital className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Emergency Departments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive tools for emergency departments to manage patient surge during crisis events
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Healthcare Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Training and certification programs for healthcare professionals to respond effectively to emergencies
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Hospital Administrators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Management tools and analytics to ensure hospital-wide preparedness and compliance
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We streamline hospital emergency response to benefit the communities served by our customers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hospital Size Section */}
      <section id="hospital-size" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Solutions for Every Hospital Size</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Customizable emergency response solutions that scale with your facility
            </p>
          </div>

          {/* Note: This section may need rethinking as the same tools will likely be offered for all hospital sizes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Small Hospitals</CardTitle>
                  <Building className="h-6 w-6 text-red-600" />
                </div>
                <CardDescription>Under 100 beds</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Streamlined emergency protocols",
                    "Essential staff training modules",
                    "Basic documentation templates",
                    "Core emergency response tools",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Learn More</Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-red-600 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Mid-Size Hospitals</CardTitle>
                  <Building2 className="h-6 w-6 text-red-600" />
                </div>
                <CardDescription>100-300 beds</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Comprehensive emergency protocols",
                    "Advanced staff training & certification",
                    "Custom documentation systems",
                    "Department-specific response tools",
                    "Basic analytics and reporting",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Learn More</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Enterprise Solutions</CardTitle>
                  <BuildingIcon className="h-6 w-6 text-red-600" />
                </div>
                <CardDescription>Customized for your needs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Enterprise-grade emergency protocols",
                    "Comprehensive training ecosystem",
                    "Advanced documentation & integration",
                    "Multi-department coordination tools",
                    "Advanced analytics and reporting",
                    "Custom API access & integrations",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Request Quote</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions We Offer Section */}
      <section id="solutions" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Solutions We Offer</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive tools to prepare for and manage mass casualty events
            </p>
          </div>

          {/* Featured Solution */}
          <div className="mb-16 bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <Badge className="mb-4 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 w-fit">
                  Featured Solution
                </Badge>
                <h3 className="text-2xl font-bold mb-4 dark:text-white">Emergency Response System</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our flagship solution provides step-by-step guidance for hospital staff during mass casualty events,
                  ensuring efficient patient care and resource allocation when every second counts.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Real-time patient tracking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Resource management tools</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Staff assignment system</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Communication protocols</span>
                  </div>
                </div>
                <Button className="w-fit bg-red-600 hover:bg-red-700 text-white">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="bg-gray-200 dark:bg-gray-600 h-64 lg:h-auto">
                {/* Image would go here */}
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Emergency Response System Image
                </div>
              </div>
            </div>
          </div>

          {/* Other Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Training & Certification</CardTitle>
                <CardDescription className="text-base">
                  Comprehensive training modules and certification programs to prepare staff for emergency situations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                    <span className="text-gray-600 dark:text-gray-300">Interactive learning modules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                    <span className="text-gray-600 dark:text-gray-300">Scenario-based training</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                    <span className="text-gray-600 dark:text-gray-300">Certification tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                    <span className="text-gray-600 dark:text-gray-300">Compliance management</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Explore Training
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Mass Casualty Protocols</CardTitle>
                <CardDescription className="text-base">
                  Customizable protocols for different types of mass casualty events, from active shooters to chemical
                  exposures.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                    <span className="text-gray-600 dark:text-gray-300">Event-specific response plans</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                    <span className="text-gray-600 dark:text-gray-300">Triage management systems</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                    <span className="text-gray-600 dark:text-gray-300">Documentation templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                    <span className="text-gray-600 dark:text-gray-300">After-action reporting</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Protocols
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Drill & Exercise Management</CardTitle>
                <CardDescription className="text-base">
                  Tools to plan, execute, and evaluate emergency drills and exercises to ensure readiness.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                    <span className="text-gray-600 dark:text-gray-300">Drill scheduling system</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                    <span className="text-gray-600 dark:text-gray-300">Scenario generation tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                    <span className="text-gray-600 dark:text-gray-300">Performance evaluation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                    <span className="text-gray-600 dark:text-gray-300">Improvement tracking</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Schedule Drills
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Additional Solutions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg flex items-start gap-4">
              <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Documentation System</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Streamlined documentation tools that ensure accurate record-keeping during chaotic situations, with
                  templates designed specifically for mass casualty events.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg flex items-start gap-4">
              <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
                <BarChart className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Analytics & Reporting</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive analytics tools to evaluate response effectiveness, identify areas for improvement, and
                  track staff readiness and certification status.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg flex items-start gap-4">
              <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
                <Smartphone className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Mobile Response Tools</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Mobile applications that provide critical information and guidance to staff during emergencies, even
                  when traditional communication systems are compromised.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg flex items-start gap-4">
              <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
                <Handshake className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Multi-Agency Coordination</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Tools to facilitate seamless coordination between hospitals, emergency services, and government
                  agencies during large-scale emergencies and disasters.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/solutions">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                Explore All Solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="about-us" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Who We Are</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A team of emergency health care specialists dedicated to improving emergency response
            </p>
          </div>

          <Tabs defaultValue="story" className="max-w-5xl mx-auto ">
            <TabsList className="grid w-full grid-cols-3 mb-8 flex align-center justify-evenly">
              <TabsTrigger value="story">Our Story</TabsTrigger>
              <TabsTrigger value="team">Our Team</TabsTrigger>
              <TabsTrigger value="impact">Our Impact</TabsTrigger>
            </TabsList>

            <TabsContent value="story" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image
                      width={600}
                      height={400}
                      src="/placeholder.svg?height=400&width=600"
                      alt="Emergency medical team in action"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 dark:text-white">Founded by ER Nurse Practitioners</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    SurgeReady Solutions was founded by ER Nurse Practitioners with decades of experience and training
                    in mass casualty response. After responding to a major transportation accident that overwhelmed
                    their hospital&apos;s resources, they recognized the critical need for better emergency response systems.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Our founding team combines over 75 years of emergency healthcare experience with cutting-edge
                    technology expertise to create solutions that address real-world challenges faced by emergency
                    departments during crisis situations.
                  </p>

                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                    <Quote className="h-8 w-8 text-red-600 flex-shrink-0" />
                    <blockquote className="italic text-gray-700 dark:text-gray-300">
                      &quote;We built the system we wished we had during those critical moments when every second counts and
                      lives hang in the balance.&quote;
                    </blockquote>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
                      <Heart className="h-5 w-5 text-red-600" />
                    </div>
                    <h4 className="text-lg font-semibold dark:text-white">Our Mission</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    To enhance emergency response through streamlining, automation, and training, enabling hospitals to
                    rapidly assess and prioritize treatment during overwhelming events.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-red-600" />
                    </div>
                    <h4 className="text-lg font-semibold dark:text-white">Our Values</h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                      <span className="text-gray-600 dark:text-gray-300">Patient-centered solutions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                      <span className="text-gray-600 dark:text-gray-300">Evidence-based approaches</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                      <span className="text-gray-600 dark:text-gray-300">Continuous improvement</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
                      <Award className="h-5 w-5 text-red-600" />
                    </div>
                    <h4 className="text-lg font-semibold dark:text-white">Our Approach</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    We combine clinical expertise with technological innovation to create practical solutions that work
                    in real-world emergency scenarios, not just in theory.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
  {/* Dr. Misha Turner */}
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex items-center gap-4 mb-6">
      <Avatar className="h-16 w-16">
        <AvatarImage src="/placeholder.svg" alt="Dr. Misha Turner" />
        <AvatarFallback>MT</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="text-lg font-semibold dark:text-white">Dr. Misha Turner</h4>
        <p className="text-gray-600 dark:text-gray-400">Co-Founder & Chief Medical Officer</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      With over 15 years of experience in nursing, hospital leadership, emergency management, and disaster
      response, Dr. Misha Turner is a dedicated leader in healthcare disaster preparedness. Holding a
      Doctorate of Nursing Practice, an MBA, and an RN license, she brings a unique combination of
      clinical expertise, strategic leadership and operational efficiency to crisis management.
    </p>
    <p className="text-gray-600 dark:text-gray-300">
      FEMA-trained and deeply experienced in coordinating emergency response efforts, she specializes in
      developing resilient healthcare systems, ensuring hospitals and healthcare facilities are prepared
      for disasters of all scales. Passionate about safeguarding communities and strengthening disaster
      response frameworks, she is committed to advancing practices that enhance healthcare readiness and
      patient safety in times of crisis.
    </p>
    <div className="flex items-center gap-2 mt-4">
      <Badge variant="outline">Emergency Medicine</Badge>
      <Badge variant="outline">Disaster Response</Badge>
    </div>
  </div>

  {/* Mark Stanley */}
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex items-center gap-4 mb-6">
      <Avatar className="h-16 w-16">
        <AvatarImage src="/placeholder.svg" alt="Mark Stanley" />
        <AvatarFallback>MS</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="text-lg font-semibold dark:text-white">Mark Stanley</h4>
        <p className="text-gray-600 dark:text-gray-400">Subject Expert</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      Mark Stanley holds a Bachelor of Science in Nursing (BSN) and brings over 15 years of hospital
      leadership experience, with a decade dedicated to emergency management and disaster response. His
      extensive training, including FEMA certifications, Hospital Incident Command and emergency
      management, positions him as a critical asset to SurgeReady.
    </p>
    <div className="mt-4">
      <h5 className="font-medium mb-2 dark:text-white">Key Responsibilities:</h5>
      <ul className="space-y-1 text-gray-600 dark:text-gray-300 list-disc pl-5">
        <li>
          Developing and implementing educational tools to enhance staff preparedness for mass casualty
          events
        </li>
        <li>
          Streamlining the throughput process to improve efficiency during chaotic emergency situations
        </li>
        <li>
          Collaborating with the leadership team to establish best practices for emergency room logistics
        </li>
        <li>
          Conducting training sessions and simulations to ensure staff are well-versed in emergency
          protocols
        </li>
        <li>
          Evaluating and refining the logistics tool to adapt to evolving needs in emergency management
        </li>
      </ul>
    </div>
    <div className="flex items-center gap-2 mt-4">
      <Badge variant="outline">Healthcare IT</Badge>
      <Badge variant="outline">Emergency Management</Badge>
    </div>
  </div>

  {/* John Jones */}
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex items-center gap-4 mb-6">
      <Avatar className="h-16 w-16">
        <AvatarImage src="/placeholder.svg" alt="John Jones" />
        <AvatarFallback>JJ</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="text-lg font-semibold dark:text-white">John Jones</h4>
        <p className="text-gray-600 dark:text-gray-400">Healthcare Safety and Emergency Preparedness Professional</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      John Jones brings over 35 years of healthcare industry experience as a Safety Officer and Security Director. His comprehensive career includes oversight of Safety, Security, Hazardous Materials, Fire Safety, Emergency Management, Medical Equipment, and OSHA compliance.
    </p>
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      His extensive background spans 23 years in the Emergency Department, 15 years as an Advanced EMT, and 12 years in leadership as a Safety Officer. John holds advanced certifications including Master Level Certified Healthcare Safety Professional and Master Level Certified Healthcare Emergency Professional.
    </p>
    <p className="text-gray-600 dark:text-gray-300">
      As a Division Emergency Preparedness Coordinator for 11 hospitals across three states, John has chaired multiple regional committees and worked with the Utah Department of Health and Human Services. He is passionate about fostering cross-sector partnerships and developing comprehensive emergency response plans, particularly for special needs schools.
    </p>
    <div className="flex items-center flex-wrap gap-2 mt-4">
      <Badge variant="outline">Emergency Preparedness</Badge>
      <Badge variant="outline">Healthcare Safety</Badge>
      <Badge variant="outline">Disaster Planning</Badge>
    </div>
  </div>
</div>

              <div className="text-center">
                <h3 className="text-xl font-bold mb-6 dark:text-white">Join Our Expert Team</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We&apos;re always looking for passionate individuals who share our mission to improve emergency response
                  capabilities.
                </p>
                <Button variant="outline">View Open Positions</Button>
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 dark:text-white">Making a Difference</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Since our founding, SurgeReady Solutions has helped over 200 hospitals improve their emergency
                    response capabilities. Our systems have been used in more than 50 real-world mass casualty events,
                    helping coordinate care for thousands of patients.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-red-600">94%</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Reduction in triage time</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-red-600">87%</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Staff confidence increase</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-red-600">12K+</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Healthcare staff trained</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-red-600">200+</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Hospital partners</p>
                    </div>
                  </div>

                  <Button className="bg-red-600 hover:bg-red-700 text-white">Read Case Studies</Button>
                </div>

                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      <Quote className="h-5 w-5 text-red-600" />
                      <h5 className="font-semibold dark:text-white">Memorial Hospital</h5>
                    </div>
                    <blockquote className="text-gray-600 dark:text-gray-300">
                      &quot;SurgeReady&apos;s system was instrumental during our response to a multi-vehicle accident that brought
                      in 27 patients simultaneously. The streamlined triage process saved critical minutes for our most
                      severely injured patients.&quot;
                    </blockquote>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                      — Dr. Robert Chen, Emergency Department Director
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      <Quote className="h-5 w-5 text-red-600" />
                      <h5 className="font-semibold dark:text-white">County General Hospital</h5>
                    </div>
                    <blockquote className="text-gray-600 dark:text-gray-300">
                      &quot;The training modules prepared our staff for a real-world chemical exposure event. Everyone knew
                      their role and executed the response plan flawlessly, resulting in zero secondary exposures to
                      staff.&quot;
                    </blockquote>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                      — Maria Gonzalez, Emergency Preparedness Coordinator
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mt-8">
                <h4 className="text-xl font-bold mb-4 dark:text-white">Our Partners & Certifications</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-gray-100 dark:bg-gray-700 h-20 rounded flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Partner Logo
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 h-20 rounded flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Partner Logo
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 h-20 rounded flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Partner Logo
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 h-20 rounded flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Partner Logo
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              Meet Our Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Try Our Tools Section */}
      <section id="try-tools" className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Emergency Preparedness?</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Experience how SurgeReady Solutions can transform your emergency response capabilities with a personalized
              approach tailored to your hospital&apos;s needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white text-gray-900 overflow-hidden h-full flex flex-col">
              <div className="bg-red-50 p-6 text-center">
                <h3 className="text-2xl font-bold text-red-600 mb-2">Sign Up Here</h3>
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-xl text-gray-500">Get Started Today</span>
                </div>
                <p className="text-gray-600">Access to our emergency response platform</p>
              </div>
              <CardContent className="flex-grow p-6">
                <ul className="space-y-3">
                  {[
                    { feature: "Emergency response protocols", included: true },
                    { feature: "Basic training modules", included: true },
                    { feature: "Documentation templates", included: true },
                    { feature: "Single department access", included: true },
                    { feature: "Email support", included: true },
                    { feature: "Advanced analytics", included: false },
                    { feature: "Custom integrations", included: false },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {item.included ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <div className="h-5 w-5 border border-gray-300 rounded-full mt-0.5 flex-shrink-0" />
                      )}
                      <span className={item.included ? "text-gray-800" : "text-gray-400"}>{item.feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Sign Up Now</Button>
              </div>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white h-full flex flex-col">
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">Guided Demo</h3>
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-5xl font-extrabold">Free</span>
                </div>
                <p className="text-white/80">Personalized walkthrough</p>
              </div>
              <CardContent className="flex-grow p-6">
                <ul className="space-y-3">
                  {[
                    { feature: "1-hour personalized demo", icon: <Presentation className="h-5 w-5 text-red-300" /> },
                    {
                      feature: "Tailored to your hospital's needs",
                      icon: <Settings className="h-5 w-5 text-red-300" />,
                    },
                    { feature: "Q&A with product specialists", icon: <Headset className="h-5 w-5 text-red-300" /> },
                    { feature: "Implementation roadmap", icon: <Calendar className="h-5 w-5 text-red-300" /> },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {item.icon}
                      <span className="text-white/90">{item.feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <p className="text-sm italic">
                    &quote;The demo was incredibly helpful in understanding how SurgeReady could be customized for our
                    specific needs.&quote;
                  </p>
                  <p className="text-xs mt-2">— Emergency Department Director</p>
                </div>
              </CardContent>
              <div className="p-6 pt-0">
                <Button variant="outline" className="w-full border-white hover:bg-white/20">
                  Schedule Demo
                </Button>
              </div>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white h-full flex flex-col">
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-xl text-white/80">Custom Pricing</span>
                </div>
                <p className="text-white/80">For hospital networks</p>
              </div>
              <CardContent className="flex-grow p-6">
                <ul className="space-y-3">
                  {[
                    { feature: "All features included", icon: <CheckCircle2 className="h-5 w-5 text-green-400" /> },
                    { feature: "Multi-hospital deployment", icon: <Building className="h-5 w-5 text-red-300" /> },
                    { feature: "Dedicated account manager", icon: <Users className="h-5 w-5 text-red-300" /> },
                    { feature: "Custom integrations", icon: <Settings className="h-5 w-5 text-red-300" /> },
                    { feature: "24/7 priority support", icon: <LifeBuoy className="h-5 w-5 text-red-300" /> },
                    { feature: "On-site training", icon: <Presentation className="h-5 w-5 text-red-300" /> },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {item.icon}
                      <span className="text-white/90">{item.feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button variant="outline" className="w-full border-white hover:bg-white/20">
                  Contact Sales
                </Button>
              </div>
            </Card>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white/10 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Why Choose SurgeReady?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/20 p-3 rounded-full mb-4">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Quick Implementation</h4>
                  <p className="text-white/80">
                    Get up and running in as little as 2 weeks with our streamlined onboarding process.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/20 p-3 rounded-full mb-4">
                    <Star className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">98% Satisfaction Rate</h4>
                  <p className="text-white/80">
                    Join hundreds of satisfied hospitals that trust SurgeReady for emergency preparedness.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/20 p-3 rounded-full mb-4">
                    <Timer className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">ROI in 6 Months</h4>
                  <p className="text-white/80">
                    See measurable improvements in response times and resource utilization within months.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg mb-6">
                Have questions? Our team is ready to help you find the right solution for your hospital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-red-600 hover:bg-white/90">
                  Schedule a Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white hover:bg-white/20">
                  View Pricing Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login CTA Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2 dark:text-white">Already a SurgeReady Customer?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access your training modules and emergency response tools
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Log In
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">SurgeReady Solutions</h3>
              <p className="text-gray-400">Empowering Emergency Departments</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Training Modules</li>
                <li>Certifications</li>
                <li>Emergency Response</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Support</li>
                <li>Blog</li>
                <li>Case Studies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sales: (555) 123-4567</li>
                <li>Support: (555) 123-4568</li>
                <li>Email: info@surgeready.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 SurgeReady Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

