import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="hero-gradient text-white py-16">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Take the First Step?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our patient portal today to connect with Dr. Miller and begin your journey to better brain health.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 w-full sm:w-auto">
              Register Now
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

