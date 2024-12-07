import Image from 'next/image'
import Link from 'next/link'
import { FaUserGraduate } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";


export default function HeroSect() {
  return (
    <section className="relative px-4 py-5 overflow-hidden" id='home'>
      {/* Background triangle decoration */}
      <div className="absolute right-0 top-0 transform translate-x-1/3 -translate-y-1/3">
        <div className="w-full h-full border-2 border-zinc-800 transform rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Introduce label */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 backdrop-blur-sm lg:mb-4">
          <p className="w-4 h-4 text-emerald-500"><FaUserGraduate /></p>
          <span className="text-sm font-medium text-zinc-100">INTORODUCTION</span>
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-12 items-top">
          <div className="space-y-4 xl:space-y-8 order-2 lg:order-1">
            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              I Craft The{' '}
              <span className="text-emerald-500">Digital Landscape</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-slate-800">
              I am a{' '}
              <span className="text-black font-semibold">Programmer</span>{' '}
              at heart and, i create features that are best suited for the job at
              hand.
            </p>

            {/* Status indicators */}
            <div className="flex flex-wrap  xl:gap-6">
              <div className="inline-flex items-center xl:gap-2 ">
                <p className="text-emerald-500 font-bold text-2xl"><IoCheckmarkDoneSharp /></p>
                <span className="text-zinc-900">Available for work</span>
              </div>
              <div className="inline-flex items-center gap-2">
              <p className="text-emerald-500 font-bold text-2xl"><IoCheckmarkDoneSharp /></p>
                <span className="text-zinc-900">Full Time Job</span>
              </div>
            </div>

            {/* CTA button */}
            <button
              className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all"
            >
              <Link href="#contact" >
                <span className="flex items-center gap-2 px-5 py-3">
                  HIRE ME
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </Link>
            </button>
          </div>

          {/* Image section */}
          <div className="order-1 lg:order-2 scale-[.8] lg:scale-1">
            <div className="flex justify-center items-start">
              <Image
                src="/pic-one.png"
                alt="Professional portrait"
                width={380}
                height={380}
                className="object-cover rounded-lg w-auto h-auto"
                priority
              />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}

