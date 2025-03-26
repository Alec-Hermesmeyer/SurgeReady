import { Brain, Shield, Zap } from "lucide-react"

export default function TreatmentInfo() {
  return (
    <section className="bg-white py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Approach to Treatment</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            It starts with a state-of-the-art brainwave analysis where we isolate specific areas of the brain that are
            not fully functioning or communicating as they should.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
              <Brain size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Treatment</h3>
            <p className="text-gray-600">
              Each treatment plan is highly customized based on your unique brainwave patterns.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Non-invasive</h3>
            <p className="text-gray-600">
              Our treatments are completely non-invasive and drug-free, with minimal to no side effects.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
            <p className="text-gray-600">
              MeRT has shown significant improvements in patients with various neurological conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

