import React from 'react'

//Image Import
import dashboard from "../assets/dashboard image.png";

function Hero() {
  return (
    <section className="bg-gray-50 flex flex-col items-center">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
            <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
            Each Rupee Counts
                <strong className="font-extrabold text-indigo-600 sm:block"> Save Money </strong>
            </h1>
            <p className="mt-4 sm:text-xl/relaxed">
            Empower your financial journey with clarity and control—track, manage, and achieve your goals with ease.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                className="block w-full rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="#"
                >
                Get Started
                </a>
            </div>
            </div>
        </div>
        <img className="-mt-9 rounded-xl border-2" src={dashboard} alt="Dashboard Image" />
    </section>
  )
}

export default Hero;