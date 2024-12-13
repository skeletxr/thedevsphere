"use client";
import dynamic from "next/dynamic";
import SignUp from '@/components/Auth/signUp';
import FeatureSection from '@/components/FeatureSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
import Pricing from '@/components/Pricing';
import ReqCall from '@/components/ReqCall/reqcall';
import { GlobalContext } from '@/context/GlobalContext';
import Testimonials from '@/components/Testimonials';
import Workflow from '@/components/Workflow';
import React, { useRef, useState, useContext } from 'react'

function page() {
 const { showAuth ,setShowAuth} = useContext(GlobalContext)
  const scrollToPrice = useRef(null);
const scrollToFeatures = useRef(null)
  const scrollToRequestCallBack = useRef(null)
  const scrollToTestimonials = useRef(null)
  return (
    <>
        <Navbar scrollToFeatures={scrollToFeatures} scrollToTestimonials={scrollToTestimonials} setShowAuth={setShowAuth} showAuth={showAuth} scrollToPrice={scrollToPrice}
        scrollToRequestCallBack={scrollToRequestCallBack}
        />

        <div className="max-w-7xl mx-auto pt-20 px-6">
          <HeroSection />
          <FeatureSection scrollToFeatures={scrollToFeatures}/>
          <ReqCall  scrollToRequestCallBack={scrollToRequestCallBack}/>

          <Workflow />
          <Pricing scrollToPrice={scrollToPrice}/>
          <Testimonials scrollToTestimonials={scrollToTestimonials}/>
          <Footer />
           
        </div>
        {showAuth && (
          <div className="flex fixed top-0 right-20">
            <SignUp showAuth={showAuth} setShowAuth={setShowAuth} />
          </div>
        )}
    </>
  );
}

export default page