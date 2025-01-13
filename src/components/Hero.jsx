//React Import
import React from 'react'

//Clerk Import
import { SignedIn, SignedOut } from '@clerk/clerk-react';

//Image Import
import dashboard from "../assets/dashboard image.png";
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="bg-gray-50 flex lg:flex-row items-center md:flex-col sm:flex-col">
        <div className="mx-5 max-w-screen-xl px-4 py-32 lg:flex">
            <div className="mx-auto max-w-xl lg:text-left md:text-center sm:text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
            Each Rupee Counts
                <strong className="font-extrabold text-indigo-600 sm:block"> Save Money </strong>
            </h1>
            <p className="mt-4 sm:text-xl/relaxed">
            Empower your financial journey with clarity and control—track, manage, and achieve your goals with ease.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <SignedOut>
                  <Link to="sign-in/" className="block w-full rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto">Get Started</Link>
                </SignedOut>
                <SignedIn>
                  <Link to="/dashboard" className="block w-full rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto" >Dashboard</Link>
                </SignedIn>
            </div>
            </div>
        </div>
        <img className="m-5 rounded-xl border-2" src={dashboard} alt="Dashboard" />
    </section>
  )
}

export default Hero;