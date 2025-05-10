import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our mission and team',
}

export default function AboutPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-16">
      {/* Intro Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          We are a tech-driven company focused on building smart e-commerce solutions.
          Our mission is to empower sellers and simplify the shopping experience for users.
        </p>
      </section>

      {/* Developer Info */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Lead Developer</h2>
        <div className="flex flex-col items-center space-y-2">
          <Image
            src="https://raw.githubusercontent.com/Mark-Lasfar/MGZon/refs/heads/main/public/images/ibrahim_elasfar.png"
            alt="Lead Developer"
            width={150}
            height={150}
            className="rounded-full border-4 border-blue-600"
          />
          <h3 className="text-xl font-bold">Ibrahim Al-Aafar</h3>
          <p className="text-gray-600">Full-stack Developer</p>
          <p className="text-blue-600">markklasfar@gmail.com</p>
        </div>
      </section>

      {/* Partners */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Partners</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {['partner1.jpg', 'partner2.jpg', 'partner3.jpg'].map((img, index) => (
            <div key={index}>
              <Image
                src={`/images/${img}`}
                alt={`Partner ${index + 1}`}
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
              <p className="mt-2 font-medium">Partner {index + 1}</p>
              <p className="text-sm text-gray-600">partner{index + 1}@gmail.com</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Members */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Team</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index}>
              <Image
                src={`/images/staff${index + 1}.jpg`}
                alt={`Staff ${index + 1}`}
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
              <p className="mt-2 font-medium">Staff Member {index + 1}</p>
              <p className="text-sm text-gray-600">staff{index + 1}@company.com</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Info */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Contact & Support</h2>
        <p className="text-lg text-gray-700">Have questions or need help?</p>
        <p className="text-blue-600">support@yourcompany.com</p>
        <div className="mt-4 flex justify-center space-x-6 text-blue-500">
          <a href="https://www.facebook.com/profile.php?id=100095308061447" target="_blank" className="hover:underline">Facebook</a>
          <a href="https://x.com/marklasfar" target="_blank" className="hover:underline">Twitter</a>
          <a href="https://linkedin.com" target="_blank" className="hover:underline">LinkedIn</a>
        </div>
      </section>
    </div>
  )
}
