"use client";

import React from 'react';
import { FlipWords } from './ui/textEffect';

 
const words = ["Mordern Stack", "Our Team", "beautiful", "modern"];
const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Master  Development with<br/>
        <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
          {"     "}
       <FlipWords words={words}/>
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Join a community of learners, tackle exciting projects, and earn your
        certificate of completion!
      </p>
      <div className="flex justify-center my-10">
        <a
          href="#"
          className="bg-gradient-to-r from-purple-500 to-purple-800 py-3 px-4 mx-3 rounded-md text-white"
        >
          Start for free
        </a>
        <a href="#" className="py-3 px-4 mx-3 rounded-md border text-neutral-500">
          Documentation
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
