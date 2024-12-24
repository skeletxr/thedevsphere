"use client";

import { pricingOptions } from "@/constants";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const Pricing = ({ scrollToPrice }) => {
  const cardContainerRef = useRef(null);

  const scrollCards = (direction) => {
    const scrollAmount = 300; // Adjust scroll amount based on your preference
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  return (
    <div className="mt-20 mx-auto w-full h-auto min-h-[100vh]" ref={scrollToPrice}>
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
        Internship and Training Programs
      </h2>

      {/* Mobile Layout: Horizontal scroll with arrows */}
      <div className="relative sm:hidden">
        <div
          ref={cardContainerRef}
          className="overflow-x-auto flex space-x-4 pb-4 snap-x snap-mandatory"
        >
          {pricingOptions.map((option, index) => (
            <div key={index} className="flex-shrink-0 w-[320px] sm:w-[320px] md:w-[350px] p-2 snap-start">
              <div className="p-6 sm:p-10 border border-neutral-700 rounded-xl flex flex-col justify-between h-full">
                <p className="text-3xl sm:text-4xl mb-6 sm:mb-8">
                  {option.title}
                  {option.title === "Pro" && (
                    <span className="bg-gradient-to-r from-purple-500 to-purple-400 text-transparent bg-clip-text text-xl mb-4 ml-2">
                      (Most Popular)
                    </span>
                  )}
                </p>
                <p className="mb-6 sm:mb-8">
                  <span className="text-4xl sm:text-5xl mt-6 mr-2">{option.price}</span>
                  <span className="text-neutral-400 tracking-tight">/Month</span>
                </p>
                <ul className="flex-grow">
                  {option.features.map((feature, index) => (
                    <li key={index} className="mt-4 flex items-center">
                      <CheckCircle2 />
                      <span className="ml-2">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/Courses"
                  className={`inline-flex justify-center items-center text-center w-full h-12 p-5 mt-8 sm:mt-20 tracking-tight text-xl ${option.title === "Web Development" ? "bg-gradient-to-r from-purple-500 to-purple-400 text-white" : "bg-neutral-800"} border border-purple-900 rounded-lg transition duration-200 hover:bg-purple-400 hover:text-black`}
                >
                  {option.title === "Full Stack Web Development" ? "Subscribe" : "Coming soon"}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Left and Right Arrows for mobile */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
          <button
            onClick={() => scrollCards(-1)}
            className="bg-purple-500 text-white p-2 rounded-full shadow-lg hover:bg-purple-400 transition duration-200"
          >
            &#8592;
          </button>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
          <button
            onClick={() => scrollCards(1)}
            className="bg-purple-500 text-white p-2 rounded-full shadow-lg hover:bg-purple-400 transition duration-200"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Desktop Layout: Cards should come side by side with increased width */}
      <div className="hidden sm:flex flex-wrap justify-center w-full max-w-full gap-8">
        {pricingOptions.map((option, index) => (
          <div key={index} className="flex-grow-0 w-[32%] p-4"> {/* Increased width with gap */}
            <div className="p-10 border border-neutral-700 rounded-xl">
              <p className="text-4xl mb-8">
                {option.title}
                {option.title === "Pro" && (
                  <span className="bg-gradient-to-r from-purple-500 to-purple-400 text-transparent bg-clip-text text-xl mb-4 ml-2">
                    (Most Popular)
                  </span>
                )}
              </p>
              <p className="mb-8">
                <span className="text-5xl mt-6 mr-2">{option.price}</span>
                <span className="text-neutral-400 tracking-tight">/Month</span>
              </p>
              <ul>
                {option.features.map((feature, index) => (
                  <li key={index} className="mt-8 flex items-center">
                    <CheckCircle2 />
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/Courses"
                className={`inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl ${option.title === "Web Development" ? "bg-gradient-to-r from-purple-500 to-purple-400 text-white" : "bg-neutral-800"} border border-purple-900 rounded-lg transition duration-200 hover:bg-purple-400 hover:text-black`}
              >
                {option.title === "Full Stack Web Development" ? "Subscribe" : "Coming soon"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
