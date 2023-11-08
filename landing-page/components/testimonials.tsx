import Image from 'next/image'

import Bruce from '@/public/images/Bruce.jpeg'
import Jeanine from '@/public/images/Jeanine.png'
import Lisandro from '@/public/images/Lisandro.jpeg'
import Vicky from '@/public/images/Vicky.jpeg'
import Zai from '@/public/images/Zai.jpeg'

export default function Testimonials() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Meet the Engineers</h2>
            <p className="text-xl text-gray-400">Meet the team that brought this product to life!</p>
          </div>

          {/* Testimonials */}
          <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none">

            {/* 1st testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800 " data-aos="fade-up">
              <div>
                <div className="relative inline-flex flex-col mb-4">
                  <Image className="rounded-full" src={Bruce} width={100} height={100} alt="Testimonial 01" />
                </div>
              </div>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <p className="text-gray-200 not-italic">Bruce Onuigbo -</p><p className="text-purple-600">Fullstack Software Engineer</p>
              </div>
            </div>


            {/* 2nd testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800 " data-aos="fade-up">
              <div>
                <div className="relative inline-flex flex-col mb-4 ">
                  <Image className="rounded-full" src={Jeanine} width={100} height={100} alt="Testimonial 01" />
                </div>
              </div>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <p className="text-gray-200 not-italic">Jeanine Peters -</p><p className="text-purple-600">Fullstack Software Engineer</p>
              </div>
            </div>


            {/* 3rd testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800 " data-aos="fade-up">
              <div>
                <div className="relative inline-flex flex-col mb-4 ">
                  <Image className="rounded-full" src={Lisandro} width={100} height={100} alt="Testimonial 01" />
                </div>
              </div>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <p className="text-gray-200 not-italic">Lisandro Olivares -</p><p className="text-purple-600">Fullstack Software Engineer</p>
              </div>
            </div>


            {/* 4th testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800 " data-aos="fade-up">
              <div>
                <div className="relative inline-flex flex-col mb-4 ">
                  <Image className="rounded-full" src={Vicky} width={100} height={100} alt="Testimonial 01" />
                </div>
              </div>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <p className="text-gray-200 not-italic">Vicky Liu -</p><p className="text-purple-600">Fullstack Software Engineer</p>
              </div>
            </div>


            {/* 5th testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800 " data-aos="fade-up">
              <div>
                <div className="relative inline-flex flex-col mb-4 ">
                  <Image className="rounded-full" src={Zai} width={100} height={100} alt="Testimonial 01" />
                </div>
              </div>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <p className="text-gray-200 not-italic">Zai Sugino -</p><p className="text-purple-600">Fullstack Software Engineer</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
