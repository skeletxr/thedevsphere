import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export function ContactUs() {
  return (
    <BackgroundBeamsWithCollision>
      <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-black dark:text-white font-sans tracking-tight mt-[10vh]">
        Want a way to contact us?{" "}
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="">Here it is!</span>
          </div>
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <span className="">Here it is!</span>
          </div>
        </div>
      </h2>

      <div className="flex flex-col mt-4">
        <p className="text-lg mt-4">We'd love to hear from you. Whether you have a question, feedback, or just want to say hello, feel free to reach out!</p>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default ContactUs;
