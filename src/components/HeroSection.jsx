import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-[#212121] p-4 rounded-xl">
        <div className="text-gray-500 font-medium text-lg flex h-10 p-2 rounded-md relative">
          <p>loading</p>
          <div className="overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#212121] via-transparent to-[#212121] z-20"></div>
            <div className="pl-1 text-[#956afa] animate-spin-text">
              <span className="block h-full">buttons</span>
              <span className="block h-full">forms</span>
              <span className="block h-full">switches</span>
              <span className="block h-full">cards</span>
              <span className="block h-full">buttons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Master Web Development with
        <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
      <Loader/>
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
