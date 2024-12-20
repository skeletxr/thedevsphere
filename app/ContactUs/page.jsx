"use client";

import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export function ContactUs() {
  const openGmail = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=contact.thedevsphere@gmail.com`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <BackgroundBeamsWithCollision>
      <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-black dark:text-white font-sans tracking-tight">
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
        <p className="text-lg mt-4">
          We'd love to hear from you. Whether you have a question, feedback, or just want to say hello, feel free to reach out!
        </p>
        <p className="text-lg mt-4 text-center text-blue-600 dark:text-blue-400 font-semibold">
          Email: <a href="mailto:contact.thedevsphere@gmail.com">contact.thedevsphere@gmail.com</a>
        </p>
        <button
          className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-75"
          onClick={openGmail}
        >
          Open Gmail
        </button>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default ContactUs;
