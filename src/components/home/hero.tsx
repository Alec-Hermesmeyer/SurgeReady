import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white text-white py-20 md:py-32">
      <div className="container text-center md:text-left">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Welcome to the Brain Treatment Center Dallas</h1>
          <h2 className="text-xl md:text-2xl mb-8">Magnetic Resonance Therapy, MeRT</h2>
          <p className="text-lg mb-8">A Highly Customized, Non-invasive, Drug-free Treatment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 w-full sm:w-auto">
                Register as a Patient
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

