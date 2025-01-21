// app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Phone, MapPin, Facebook, Instagram } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://www.peluker.com/blog/wp-content/uploads/2024/02/La-Evolucion-del-Barbershop-De-Clasico-a-Moderno.jpg"
            alt="Barber Shop Interior"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Classic Cuts Barber Shop</h1>
          <p className="text-xl mb-8">Where Style Meets Tradition</p>
          <Link
            href="/appointments"
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-md font-semibold transition-colors"
          >
            Book Appointment
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-amber-600 font-semibold">${service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Classic Cuts</h2>
              <p className="text-gray-600 mb-4">
                With over 15 years of experience, Classic Cuts has been providing
                premium grooming services to gentlemen who appreciate quality and style.
                Our skilled barbers combine traditional techniques with modern trends
                to give you the perfect look.
              </p>
              <div className="flex gap-6 mt-8">
                <Link href="#" className="text-amber-600 hover:text-amber-700">
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-amber-600 hover:text-amber-700">
                  <Instagram className="w-6 h-6" />
                </Link>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/api/placeholder/600/400"
                alt="Barber at work"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Hours Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Hours & Location</h2>
              <div className="flex items-center gap-4 mb-4">
                <Clock className="text-amber-600 w-5 h-5" />
                <div>
                  <p className="font-semibold">Monday - Friday: 9am - 8pm</p>
                  <p className="font-semibold">Saturday: 10am - 6pm</p>
                  <p className="font-semibold">Sunday: Closed</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <MapPin className="text-amber-600 w-5 h-5" />
                <p>123 Main Street, City, State 12345</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-amber-600 w-5 h-5" />
                <p>(555) 123-4567</p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Quick Contact</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
                ></textarea>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md font-semibold transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const services = [
  {
    name: "Classic Haircut",
    description: "Traditional haircut with attention to detail and personal style preferences.",
    price: "30"
  },
  {
    name: "Beard Trim",
    description: "Professional beard grooming and shaping for the perfect facial hair style.",
    price: "20"
  },
  {
    name: "Hot Towel Shave",
    description: "Luxurious straight razor shave with hot towel treatment.",
    price: "35"
  }
]