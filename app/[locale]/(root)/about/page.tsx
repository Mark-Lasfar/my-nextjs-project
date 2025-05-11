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
      <section className="text-center py-16 bg-blue-50">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">About Us</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          We are a tech-driven company focused on building smart e-commerce solutions. 
          Our mission is to empower sellers and simplify the shopping experience for users. 
          We aim to provide seamless integration with leading platforms to enhance business efficiency and growth.
        </p>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-6">
          Our platform integrates with major e-commerce platforms like Amazon, Shopify, ShipBob, AliExpress, and 4PX, 
          helping businesses optimize their operations and reach a global audience.
        </p>
      </section>


      {/* Developer Info */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-6">Development Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {[
            {
              name: 'Ibrahim Al-Aafar',
              role: 'Full-stack Developer',
              email: 'ibrahim@company.com',
              image: 'https://raw.githubusercontent.com/Mark-Lasfar/MGZon/refs/heads/main/public/images/ibrahim_elasfar.png',
            },
            {
              name: 'Sarah James',
              role: 'Frontend Developer',
              email: 'sarah@company.com',
              image: 'https://ui-avatars.com/api/?name=Sarah+James&background=random',
            },
            {
              name: 'Michael Zane',
              role: 'Backend Developer',
              email: 'michael@company.com',
              image: 'https://ui-avatars.com/api/?name=Michael+Zane&background=random',
            },
          ].map((dev, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="relative w-[150px] h-[150px]">
                <div className="absolute inset-0 rounded-full animate-spin bg-gradient-to-tr from-blue-500 via-pink-500 to-purple-500 p-[4px]" />
                <div className="absolute inset-0 rounded-full bg-white z-10 m-[4px]" />
                <Image
                  src={dev.image}
                  alt={dev.name}
                  width={150}
                  height={150}
                  className="rounded-full z-20 relative object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">{dev.name}</h3>
              <p className="text-gray-600">{dev.role}</p>
              <p className="text-blue-600">{dev.email}</p>
            </div>
          ))}
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
          {[...Array(8)].map((_, index) => {
            const isManager = index === 0
      
            return (
              <div key={index}>
                <Image
                  src={
                    isManager
                      ? 'https://raw.githubusercontent.com/Mark-Lasfar/Online-Shop/main/media/images/manager.jpg'
                      : `https://ui-avatars.com/api/?name=Staff+${index + 1}&background=random`
                  }
                  alt={isManager ? 'Hagar Elshamy' : `Staff ${index + 1}`}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto"
                />
                <p className="mt-2 font-medium">
                  {isManager ? 'Hagar Elshamy' : `Staff Member ${index + 1}`}
                </p>
                <p className="text-sm text-gray-600">
                  {isManager ? 'Product Manager' : `staff${index + 1}@company.com`}
                </p>
              </div>
            )
          })}
        </div>
      </section>


{/* Platform Integrations Section */}
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
      Our Platform Integrations
    </h2>
    <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-600">
      Seamlessly connect with the world's leading e-commerce platforms
    </p>

    <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
      {/* Amazon Integration */}
      <div className="group">
        <a 
          href="https://www.amazon.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex justify-center h-16">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt="Amazon"
              width={120}
              height={40}
              className="h-full w-auto object-contain"
            />
          </div>
          <p className="mt-4 text-center text-lg font-medium text-gray-900 group-hover:text-orange-500 transition-colors">
            Amazon
          </p>
        </a>
      </div>

      {/* Shopify Integration */}
      <div className="group">
        <a 
          href="https://www.shopify.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex justify-center h-16">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg"
              alt="Shopify"
              width={120}
              height={40}
              className="h-full w-auto object-contain"
            />
          </div>
          <p className="mt-4 text-center text-lg font-medium text-gray-900 group-hover:text-green-600 transition-colors">
            Shopify
          </p>
        </a>
      </div>

      {/* ShipBob Integration */}
      <div className="group">
        <a 
          href="https://www.shipbob.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex justify-center items-center h-16">
            <div className="bg-blue-600 text-white font-bold text-xl py-3 px-4 rounded w-full max-w-[120px] text-center">
              ShipBob
            </div>
          </div>
          <p className="mt-4 text-center text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
            ShipBob
          </p>
        </a>
      </div>

      {/* AliExpress Integration */}
      <div className="group">
        <a 
          href="https://www.aliexpress.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex justify-center items-center h-16">
            <div className="bg-red-600 text-white font-bold text-xl py-3 px-4 rounded w-full max-w-[120px] text-center">
              AliExpress
            </div>
          </div>
          <p className="mt-4 text-center text-lg font-medium text-gray-900 group-hover:text-red-600 transition-colors">
            AliExpress
          </p>
        </a>
      </div>

      {/* 4PX Integration */}
      <div className="group">
        <a 
          href="https://www.4px.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex justify-center items-center h-16">
            <div className="bg-green-600 text-white font-bold text-xl py-3 px-4 rounded w-full max-w-[120px] text-center">
              4PX
            </div>
          </div>
          <p className="mt-4 text-center text-lg font-medium text-gray-900 group-hover:text-green-600 transition-colors">
            4PX Logistics
          </p>
        </a>
      </div>
    </div>

    <div className="mt-12 text-center">
      <p className="text-gray-600">
        Don't see your platform? <a href="#contact" className="text-blue-600 hover:underline">Contact us</a> about custom integrations.
      </p>
    </div>
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
