"use client";
import React, { useContext, useState } from "react";
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
import { GlobalContext } from "@/context/GlobalContext";
import toast from "react-hot-toast";

const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  // Add more items as needed
];

export function SidebarDemo({ setShowScanner }) {
  const {user, userDetails, isCoursePurchased} = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false); // For "My Courses" dropdown
  const [subDropdowns, setSubDropdowns] = useState({}); // For sub-dropdowns

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
      href: "/Courses",
      icon: (
        <IconBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "My Courses",
      href: "",
      icon: (
        <IconBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      isDropdown: true,
      sections: [
        {
          label: "Web Development",
          subsections: ["HTML & CSS", "JavaScript", "React"],
        },
        {
          label: "Data Science",
          subsections: ["Python Basics", "Data Analysis", "Machine Learning"],
        },
        {
          label: "Design",
          subsections: ["UI/UX Basics", "Figma", "Prototyping"],
        },
      ],
    },
  ];

  const toggleSubDropdown = (index) => {
    setSubDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[91vh] overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody
          className="justify-between gap-10 bg-black dark:bg-black"
          style={{ background: "black" }}
        >
          <div
            className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden background-color:black"
            style={{ background: "black" }}
          >
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, index) => {
                if (!link.isDropdown) {
                  return <SidebarLink key={index} link={link} />;
                }

                return (
                  <div key={index}>

                    {/* Dropdown Toggle */}
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => {
                          if (isCoursePurchased) {
                            toast.error("Payment Verification Pending (this may take upto 24 Hours)");
                          } else if (userDetails && userDetails.OwnedCourses.includes("SSJWEBDEVCOURSE")) {
                            setCoursesOpen(!coursesOpen);
                          }
                        }}
                    >
                      {link.icon}
                      <span className="ml-3">{link.label}</span>
                    </div>

                    {/* Dropdown Content */}
                    {link.label === "My Courses" && coursesOpen &&  (
                      <div className="ml-6 mt-2 flex flex-col gap-2">
                        {link.sections.map((section, secIndex) => (
                          <div key={secIndex}>
                            {/* Sub-dropdown Toggle */}
                            <div
                              className="flex items-center cursor-pointer"
                              onClick={() => {
                                
                                toggleSubDropdown(secIndex)}}
                            >
                              <IconArrowLeft
                                className={`transform ${
                                  subDropdowns[secIndex]
                                    ? "rotate-90"
                                    : "rotate-0"
                                } text-neutral-500 h-4 w-4`}
                              />
                              <span className="ml-2">{section.label}</span>
                            </div>

                            {/* Sub-dropdown Content */}
                            {subDropdowns[secIndex] && (
                              <div className="ml-6 mt-1 flex flex-col gap-1">
                                {section.subsections.map((sub, subIndex) => (
                                  <div
                                    key={subIndex}
                                    className="text-neutral-700 dark:text-neutral-200"
                                  >
                                    {sub}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: `${user && user.displayName ? user.displayName : "User"}`,
                href: "#",
                icon: (
                  <Image
                  src={user && user.photoURL ? user.photoURL : "/avatar.png"}
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

const Dashboard = ({ setShowScanner }) => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">
        <div className="w-full">
          <h1 className="text-gray-400 text-5xl font-sans">
            Full Stack Web Development
          </h1>
        </div>
        <div className="flex flex-col md:flex-row h-screen overflow-y-auto no-scrollbar">
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

export default SidebarDemo;
