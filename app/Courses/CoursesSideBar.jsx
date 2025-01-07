"use client";
import React, { useContext, useState } from "react";
import { IconArrowLeft, IconHomeShare, IconBook } from "@tabler/icons-react";
import Link from "next/link";

import Image from "next/image";
import { cn } from "@/lib/utils";
import CourseDetails from "./CourseDetails";
import { ThreeDCard } from "./CourseCard";
import { GlobalContext } from "@/context/GlobalContext";
import toast from "react-hot-toast";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sideBar";
import VideoList from "@/components/ui/videoList";
import HLSPlayer from "@/components/courses/player";

export function SidebarDemo({
  setShowScanner,
  setRefer,
  setCoursesOpen,
  coursesOpen,
  handleFetchData,
  handleMobileMyCourses,
  setCourseData,
  courseData,
  showVideo,
  setShowVideo,
  setOpen,
  open,
}) {
  const { user, userDetails, isCoursePurchased } = useContext(GlobalContext);
  // const [courseData, setCourseData] = useState([]);
  const [subCourseData, setSubCourseData] = useState([]);
  const [subDropdowns, setSubDropdowns] = useState({}); // For sub-dropdowns

  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconHomeShare
          stroke={2}
          className="text-neutral-700 cursor-pointer h-5 w-5 flex-shrink-0"
        />
      ),
      onClick: () => {
        window.location.href = "/";
      },
    },
    {
      label: "Courses",
      href: "/Courses",
      icon: (
        <IconBook className="text-neutral-700 cursor-pointer h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "My Courses",
      href: "",
      icon: (
        <IconBook className="text-neutral-700 cursor-pointer h-5 w-5 flex-shrink-0" />
      ),
      isDropdown: true,
      sections: [
        {
          label: "Web Development",
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

  // const handleMobileMyCourses = (params) => {
  //   if (isCoursePurchased) {
  //     toast.error(
  //       "Payment Verification Pending (this may take up to 24 Hours)"
  //     );
  //   } else if (
  //     userDetails &&
  //     userDetails.OwnedCourses &&
  //     userDetails.OwnedCourses.includes("SSJWEBDEVCOURSE")
  //   ) {
  //     handleFetchData("CourseData", userDetails.OwnedCourses[0]).then(
  //       (data) => {
  //         console.log("data", data);
  //         setCourseData(data.data.titles);
  //         setCoursesOpen(!coursesOpen);
  //         if(params && params === "mobile"){
  //           setShowVideo(true)
  //           setOpen(false)
  //         }
  //       }
  //     );
  //   }
  // };

  const handleSubCourseField = (sub) => {
    handleFetchData("CourseList", [user.uid, sub]).then((data) => {
      setSubCourseData(data);
    });
  };

  return (
    <div
      //  className={cn(
      //       "flex flex-col md:flex-row bg-neutral-800 w-screen flex-1 mx-auto border border-neutral-700 overflow-hidden",
      //       "h-[91vh] overflow-hidden"
      //     )}
      className={cn(
        "flex flex-col md:flex-row bg-neutral-800 w-screen flex-1 mx-auto border border-neutral-700 overflow-hidden",
        "h-[91vh] overflow-hidden"
      )}
      style={{ backgroundColor: "black", color: "white" }}
    >
      <Sidebar
        open={open}
        setOpen={setOpen}
        handleMobileMyCourses={handleMobileMyCourses}
      >
        <SidebarBody
          className="justify-between gap-10 bg-black "
          style={{ background: "black" }}
        >
          <div
            className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden background-color:black"
            style={{ background: "black" }}
          >
            <div className="mt-8 flex flex-col cursor-pointer gap-2">
              {links.map((link, index) => {
                if (!link.isDropdown) {
                  return (
                    <SidebarLink
                      key={index}
                      link={link}
                      onClick={link.onClick}
                    />
                  );
                }

                return (
                  <div key={index}>
                    {/* Dropdown Toggle */}
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => {
                        handleMobileMyCourses();
                      }}
                    >
                      {link.icon}
                      <span className="ml-3">{link.label}</span>
                    </div>

                    {/* Dropdown Content */}
                    {link.label === "My Courses" && coursesOpen && (
                      <div className="ml-6 mt-2  md:flex flex-col hidden gap-2">
                        {link.sections.map((section, secIndex) => (
                          <div key={secIndex}>
                            {/* Sub-dropdown Toggle */}
                            <div
                              className="flex items-center cursor-pointer"
                              onClick={() => {
                                toggleSubDropdown(secIndex);
                              }}
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

                            {subDropdowns[secIndex] && (
                              <div className="ml-6 mt-1 flex flex-col gap-1">
                                {courseData.map((sub, subIndex) => (
                                  <div key={subIndex}>
                                    {/* Inner Dropdown */}
                                    <div
                                      className="flex items-center cursor-pointer"
                                      onClick={() => {
                                        handleSubCourseField(sub);
                                        toggleSubDropdown(
                                          `${secIndex}-${subIndex}`
                                        );
                                        // });
                                      }}
                                    >
                                      <IconArrowLeft
                                        className={`transform ${
                                          subDropdowns[
                                            `${secIndex}-${subIndex}`
                                          ]
                                            ? "rotate-90"
                                            : "rotate-0"
                                        } text-neutral-500 h-4 w-4`}
                                      />
                                      <span className="ml-2">{sub}</span>
                                    </div>

                                    {/* Inner Dropdown Content */}
                                    {subDropdowns[
                                      `${secIndex}-${subIndex}`
                                    ] && (
                                      <div className="ml-6 mt-1 flex flex-col gap-1">
                                        {subCourseData &&
                                          console.log(
                                            "subCourseData",
                                            subCourseData.data
                                          )}
                                        {subCourseData &&
                                          Array.isArray(subCourseData.data) && (
                                            <>
                                              {((subCourseData.data[0] &&
                                                subCourseData.data[0]
                                                  .video_type === sub) ||
                                                subCourseData.data.some(
                                                  (data) =>
                                                    data.video_type === sub
                                                )) &&
                                                subCourseData.data.map(
                                                  (data, index) => (
                                                    <div
                                                      className="text-gray-500"
                                                      key={index}
                                                      onClick={() =>
                                                        setShowVideo(
                                                          data.video_id
                                                        )
                                                      }
                                                    >
                                                      {data.title}
                                                    </div>
                                                  )
                                                )}
                                            </>
                                          )}
                                      </div>
                                    )}
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
                label: `${
                  user && user.displayName ? user.displayName : "User"
                }`,
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
      <Dashboard
        setShowVideo={setShowVideo}
        subCourseData={subCourseData}
        handleSubCourseField={handleSubCourseField}
        courseData={courseData}
        setShowScanner={setShowScanner}
        setRefer={setRefer}
        showVideo={showVideo}
      />
    </div>
  );
}

const Dashboard = ({
  setShowScanner,
  setRefer,
  showVideo,
  courseData,
  setShowVideo,
  handleSubCourseField,
  subCourseData,
}) => {
  return (
    <div className="flex flex-1">
      <div
        className={`bg-black border border-neutral-700    flex flex-col gap-2 flex-1 w-full h-full ${
          !showVideo
            ? "overflow-y-auto p-2 bg-black md:p-10 "
            : " bg-black flex overflow-hidden h-[70vh] w-auto "
        }`}
      >
        {!showVideo ? (
          <>
            <div className=" hidden md:block ">
              <div className="w-full">
                <h1 className="text-gray-400 text-5xl font-sans">
                  Full Stack Web Development
                </h1>
              </div>
            </div>
            <div className="flex flex-col md:flex-row h-screen overflow-y-auto no-scrollbar ">
              <div className="md:fixed md:top-6 md:right-10">
                <ThreeDCard
                  setShowScanner={setShowScanner}
                  setRefer={setRefer}
                />
              </div>
              <div>
                <CourseDetails />
              </div>
            </div>
          </>
        ) : (
          <>
            <HLSPlayer
              showVideo={showVideo}
              courseData={courseData}
              handleSubCourseField={handleSubCourseField}
              subCourseData={subCourseData}
              setShowVideo={setShowVideo}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarDemo;
