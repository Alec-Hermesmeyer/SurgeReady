import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  BarChart,
  FileText,
  Handshake,
  Smartphone,
} from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-red-600 mr-8">
                SurgeReady
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
              <div className="flex items-center space-x-4 justify-between">
                <Link href="/login">
                  <Button variant="outline">Log In</Button>
                </Link>
                <Link href="#try-tools">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Try Our Tools</Button>
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
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">SurgeReady Solutions</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mb-8">
              Streamlining Emergency Response for Mass Casualty Events
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline">
                Schedule Demo
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <CardTitle>Large Medical Centers</CardTitle>
                  <BuildingIcon className="h-6 w-6 text-red-600" />
                </div>
                <CardDescription>300+ beds</CardDescription>
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
                <Button className="w-full">Learn More</Button>
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
          <div className="mb-20  rounded-xl overflow-hidden py-12">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
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
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
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

            <div className="bg-gray-50 dark:bg-gray-700 p-6 pb-8 rounded-lg flex items-start gap-4">
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
              <Button size="lg" className="bg-red-600 hover:bg-red-700 my-12 text-white">
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
              A team of emergency medicine experts and technology specialists dedicated to improving emergency response
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-video rounded-xl bg-gray-200 dark:bg-gray-700">
                {/* Team image would go here */}
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Team Image
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                SurgeReady Solutions was founded by emergency medicine professionals who experienced firsthand the
                challenges of managing mass casualty events. We understand that these situations create inefficiencies
                in emergency department processes, which can result in delays to critical patient care.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our mission is to enhance emergency response through streamlining, automation, and training, enabling
                hospitals to rapidly assess and prioritize treatment during overwhelming events.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold dark:text-white">Improved Communication</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Enhancing departmental coordination during crisis events
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold dark:text-white">Comprehensive Education</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Providing ongoing training for emergency preparedness
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold dark:text-white">Reproducible Documentation</h4>
                    <p className="text-gray-600 dark:text-gray-300">Ensuring consistent and thorough record-keeping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Try Our Tools Section */}
      <section id="try-tools" className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Emergency Preparedness?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience how SurgeReady Solutions can transform your emergency response capabilities with a free trial.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle>Free Demo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Schedule a personalized demonstration of our platform with one of our specialists.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">
                  Schedule Demo
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-white text-gray-900">
              <CardHeader>
                <CardTitle>30-Day Free Trial</CardTitle>
                <Badge className="bg-red-600 text-white">Most Popular</Badge>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  Full access to all features for 30 days with guided onboarding support.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-red-600 hover:bg-red-700">Start Free Trial</Button>
              </CardFooter>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle>Contact Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Discuss custom solutions and enterprise pricing with our sales team.</p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
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
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
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

