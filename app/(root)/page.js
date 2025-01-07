"use client";
import dynamic from "next/dynamic";

import SignUp from "@/components/Auth/signUp";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
// const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
import Pricing from "@/components/Pricing";
import ReqCall from "@/components/ReqCall/reqcall";
import { GlobalContext } from "@/context/GlobalContext";
import Testimonials from "@/components/Testimonials";
import Workflow from "@/components/Workflow";
import React, { useRef, useState, useContext } from "react";
import Loader from "@/components/ui/loading";



function page() {
  const { showAuth, setShowAuth } = useContext(GlobalContext);
  const scrollToPrice = useRef(null);
  const scrollToFeatures = useRef(null);
  const scrollToRequestCallBack = useRef(null);
  const scrollToTestimonials = useRef(null);

  return (
    <>
      <Navbar
        scrollToFeatures={scrollToFeatures}
        scrollToTestimonials={scrollToTestimonials}
        setShowAuth={setShowAuth}
        showAuth={showAuth}
        scrollToPrice={scrollToPrice}
        scrollToRequestCallBack={scrollToRequestCallBack}
      />
      <div className="max-w-7xl mx-auto  pt-19 px-6">
        <HeroSection  
        scrollToPrice={scrollToPrice}
        
        />
        <FeatureSection scrollToFeatures={scrollToFeatures} />
        <Pricing scrollToPrice={scrollToPrice} />
        {/* <Loader /> */}
        <Workflow />
        <div ref={scrollToRequestCallBack}>
        <ReqCall scollToRequestCallBack={scrollToRequestCallBack} />
        </div>
        <Testimonials scrollToTestimonials={scrollToTestimonials} />
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>

        <Footer
        scrollToFeatures={scrollToFeatures}
        scrollToTestimonials={scrollToTestimonials}
        scrollToPrice={scrollToPrice}
        scrollToRequestCallBack={scrollToRequestCallBack}
        />
        </div>
      </div>
      {showAuth && (
        <div className="flex fixed top-0 right-20">
          <SignUp showAuth={showAuth} setShowAuth={setShowAuth} />
        </div>
      )}
    </>
  );
}

export default page;
