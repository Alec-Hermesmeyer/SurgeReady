import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FeatureSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Ask Dr. Miller</h2>
            <p className="text-gray-600 mb-6">
              Our new patient portal allows you to ask questions directly to Dr. Spenser Miller. Get answers about
              treatments, conditions, and care options from the comfort of your home.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Ask medical questions about your condition</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Review your question history anytime</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Receive expert responses approved by Dr. Miller</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Prepare for your in-person visits more effectively</span>
              </li>
            </ul>
            <Link href="/register">
              <Button size="lg">Create Your Account</Button>
            </Link>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Patient using the Ask Dr. Miller feature"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

