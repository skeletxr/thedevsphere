"use client";

import { pricingOptions } from "@/constants";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Pricing = ({ scrollToPrice }) => {
  return (
    <div className="mt-20 px-4 mx-auto max-w-7xl min-h-[100vh]" ref={scrollToPrice}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide font-medium">
          Internship and Training{" "}
          <span className="bg-gradient-to-r from-purple-400 to-purple-800 text-transparent bg-clip-text">
            Programs
          </span>
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg mt-4">
          Choose the perfect plan to accelerate your coding journey.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
        {pricingOptions.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative p-8 rounded-2xl border flex flex-col h-full backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]
              ${
                option.title === "Full Stack Web Development" || option.title === "Pro"
                  ? "border-purple-500/30 bg-purple-900/5 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
                  : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700"
              }
            `}
          >
            {(option.title === "Pro" || option.title === "Full Stack Web Development") && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-purple-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wide">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2 text-neutral-100">
                {option.title}
              </h3>
              <div className="flex items-end gap-2 my-4">
                {option.price.includes("INR") ? (
                  <>
                    <span className="text-2xl font-medium text-neutral-400 mb-1">
                      INR
                    </span>
                    <span className="text-5xl font-bold text-white tracking-tight">
                      {option.price.replace("INR", "").trim()}
                    </span>
                  </>
                ) : (
                  <span className="text-5xl font-bold text-white tracking-tight">
                    {option.price}
                  </span>
                )}
                <span className="text-neutral-500 mb-1 ml-1 text-lg">/Month</span>
              </div>
            </div>

            <ul className="flex-grow space-y-4 mb-8">
              {option.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-neutral-300">
                  <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/Courses" className="mt-auto">
              <button
                className={`w-full group relative overflow-hidden rounded-xl py-3 px-6 transition-all duration-300
                  ${
                    option.title === "Full Stack Web Development" 
                      ? "bg-white text-black hover:bg-neutral-200"
                      : "bg-neutral-800 text-white hover:bg-neutral-700"
                  }
                `}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
                  {option.title === "Full Stack Web Development"
                    ? "Subscribe Now"
                    : "Coming Soon"}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                {option.title === "Full Stack Web Development" && (
                   <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
