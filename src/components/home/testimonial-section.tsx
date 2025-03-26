export default function TestimonialSection() {
    const testimonials = [
      {
        quote:
          "The treatment at Brain Treatment Center Dallas has been life-changing for our son with autism. We've seen remarkable improvements in his communication and social skills.",
        author: "Sarah M., Parent",
      },
      {
        quote:
          "After struggling with PTSD for years, the MeRT treatment has given me a new lease on life. Dr. Miller and his team are compassionate and truly care about their patients.",
        author: "James T., Veteran",
      },
      {
        quote:
          "The personalized approach to my depression treatment made all the difference. For the first time in years, I feel hopeful about my future.",
        author: "Emily R., Patient",
      },
    ]
  
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Patient Success Stories</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="text-primary text-4xl font-serif mb-4">"</div>
                <p className="text-gray-700 mb-4 italic">{testimonial.quote}</p>
                <p className="text-gray-600 font-medium">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  