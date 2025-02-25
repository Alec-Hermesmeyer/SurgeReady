import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GraduationCap, Shield, Award, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">SurgeReady Solutions</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mb-8">
              Comprehensive Emergency Response Training and Management Platform for Hospitals
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

      {/* Platform Features */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Complete Training & Response Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<GraduationCap className="h-8 w-8 text-red-600" />}
              title="Interactive Training Modules"
              description="Comprehensive courses with real-world scenarios and certifications"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-red-600" />}
              title="Emergency Response System"
              description="Real-time management tools for mass casualty events"
            />
            <FeatureCard
              icon={<Award className="h-8 w-8 text-red-600" />}
              title="Certification Tracking"
              description="Monitor staff certifications and training progress"
            />
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Subscription Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Essential"
              price="999"
              features={["Up to 50 users", "Basic training modules", "Emergency response system", "Email support"]}
              buttonText="Start Free Trial"
            />
            <PricingCard
              title="Professional"
              price="1,999"
              features={[
                "Up to 200 users",
                "Advanced training modules",
                "Custom scenarios",
                "24/7 phone support",
                "Analytics dashboard",
              ]}
              buttonText="Most Popular"
              highlighted={true}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              features={[
                "Unlimited users",
                "Custom training content",
                "Dedicated support team",
                "Advanced analytics",
                "API access",
              ]}
              buttonText="Contact Sales"
            />
          </div>
        </div>
      </section>

      {/* Training Preview */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Training Platform Preview
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold dark:text-white">Interactive Learning Experience</h3>
              <ul className="space-y-4">
                {[
                  "Scenario-based training modules",
                  "Progress tracking and assessments",
                  "Downloadable resources and guides",
                  "Mobile-friendly interface",
                  "Certification management",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 dark:text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="bg-red-600 hover:bg-red-700 text-white">Preview Platform</Button>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 aspect-video">
              {/* Replace with actual platform preview image */}
              <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                Platform Preview
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Emergency Preparedness?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join leading hospitals in implementing SurgeReady Solutions for comprehensive training and emergency
            response.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary">
              Start Free Trial
            </Button>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-red-600"
              >
                Login to Platform
              </Button>
            </Link>
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
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="p-6 dark:bg-gray-800">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </Card>
  )
}

function PricingCard({
  title,
  price,
  features,
  buttonText,
  highlighted = false,
}: {
  title: string
  price: string
  features: string[]
  buttonText: string
  highlighted?: boolean
}) {
  return (
    <Card className={`p-6 ${highlighted ? "border-2 border-red-600 shadow-lg" : ""}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold dark:text-white">{title}</h3>
        <div className="mt-4">
          <span className="text-4xl font-bold dark:text-white">${price}</span>
          {price !== "Custom" && <span className="text-gray-600 dark:text-gray-400">/month</span>}
        </div>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 dark:text-gray-300">
            <CheckCircle className="h-5 w-5 text-green-600" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        className={`w-full ${highlighted ? "bg-red-600 hover:bg-red-700 text-white" : ""}`}
        variant={highlighted ? "default" : "outline"}
      >
        {buttonText}
      </Button>
    </Card>
  )
}

