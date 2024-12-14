"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconHomeShare,
  IconSettings,
  IconBook,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import CourseDetails from "./CourseDetails";
import { ThreeDCard } from "./CourseCard";

const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  // Add more items as needed
];

export function SidebarDemo({ setShowScanner }) {
  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconHomeShare
          stroke={2}
          className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
        />
      ),
    },
    {
      label: "Courses",
      href: "",
      icon: (
        <IconBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        " flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen flex-1   mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-[91vh] overflow-hidden  "
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody
          className="justify-between gap-10 bg-black  dark:bg-black"
          style={{ background: "black" }}
        >
          <div
            className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden background-color:black  "
            style={{ background: "black" }}
          >
            {/* {open ? <Logo /> : <LogoIcon />} */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, index) => (
                <SidebarLink key={index} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard setShowScanner={setShowScanner} />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Logo
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const CoursesSideBar = () => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default CoursesSideBar;

// Dummy dashboard component with content
const Dashboard = ({ setShowScanner }) => {
  return (
    <div className="flex flex-1 ">
      <div className="p-2 md:p-10 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">
        <div className="w-full ">
          <h1 className="text-gray-400 text-5xl font-sans">
            Full Stack Web Development
          </h1>
        </div>
        <div className="flex flex-col md:flex-row  h-screen overflow-y-auto  no-scrollbar">
          <div className="md:fixed md:top-6 md:right-10">
            <ThreeDCard setShowScanner={setShowScanner} />
          </div>
          <div>
            <CourseDetails />
          </div>
        </div>
      </div>
    </div>
  );
};
