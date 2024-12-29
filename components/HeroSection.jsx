"use client";

import React, {useContext} from "react";
import { FlipWords } from "./ui/textEffect";
import { GlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
const words = [
  "Developer",
  "Innovator",
  "Creator",
  "Programmer",
];
const HeroSection = ({scrollToPrice}) => {
  const {   userDetails } = useContext(GlobalContext);
  const Routers = useRouter();
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <div className="flex flex-row" >
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Master Full-Stack Development and Become a <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
          {"     "}
          <FlipWords words={words} />
        </span> <br />
        
      </h1>
      </div>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Join a community of learners, tackle exciting projects, and earn your
        certificate of completion!
      </p>
      <div className="flex justify-center my-10 cursor-pointer">
        <div
       onClick={() => {
        if (userDetails && userDetails.OwnedCourses && userDetails.OwnedCourses.includes("SSJWEBDEVCOURSE")) {
          Routers.push(`/Courses?starter=mycourses`);
        } else {
          scrollToPrice.current.scrollIntoView({
            behavior: "smooth",
          });
        }
      }}
          className="bg-gradient-to-r from-purple-500 to-purple-800 py-3 px-4 mx-3 rounded-md text-white"
        >
         {userDetails ?   userDetails.OwnedCourses ?
      userDetails.OwnedCourses.includes("SSJWEBDEVCOURSE") && "My Courses" : "Explore Courses" : "Explore Now"}
        </div>
        <div
          className="py-3 px-4 mx-3 rounded-md border text-neutral-500"
        >
          Documentation
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
