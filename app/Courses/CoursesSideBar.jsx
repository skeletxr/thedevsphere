"use client";
import React, { useContext, useState } from "react";
import { IconArrowLeft, IconHomeShare, IconBook } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
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
}) {
  const { user, userDetails, isCoursePurchased } = useContext(GlobalContext);
  const [showVideo, setShowVideo] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [open, setOpen] = useState(false);
  const [subCourseData, setSubCourseData] = useState([]);
  const [subDropdowns, setSubDropdowns] = useState({}); // For sub-dropdowns

  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconHomeShare
          stroke={2}
          className="text-neutral-700 cursor-pointer dark:text-neutral-200 h-5 w-5 flex-shrink-0"
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
        <IconBook className="text-neutral-700 cursor-pointer dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "My Courses",
      href: "",
      icon: (
        <IconBook className="text-neutral-700 cursor-pointer dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
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
                        if (isCoursePurchased) {
                          toast.error(
                            "Payment Verification Pending (this may take up to 24 Hours)"
                          );
                        } else if (
                          userDetails &&
                          userDetails.OwnedCourses &&
                          userDetails.OwnedCourses.includes("SSJWEBDEVCOURSE")
                        ) {
                          handleFetchData(
                            "CourseData",
                            userDetails.OwnedCourses[0]
                          ).then((data) => {
                            console.log("data", data);
                            setCourseData(data.data.titles);
                            setCoursesOpen(!coursesOpen);
                          });
                        }
                      }}
                    >
                      {link.icon}
                      <span className="ml-3">{link.label}</span>
                    </div>

                    {/* Dropdown Content */}
                    {link.label === "My Courses" && coursesOpen && (
                      <div className="ml-6 mt-2 flex flex-col gap-2">
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

                            {/* Sub-dropdown Content */}
                            {subDropdowns[secIndex] && (
                              <div className="ml-6 mt-1 flex flex-col gap-1">
                                {courseData.map((sub, subIndex) => (
                                  <div key={subIndex}>
                                    {/* Inner Dropdown */}
                                    <div
                                      className="flex items-center cursor-pointer"
                                      onClick={() => {
                                        handleFetchData("CourseList", [
                                          user.uid,
                                          sub,
                                        ]).then((data) => {
                                          console.log("data subdrop", subDropdowns);

                                          // if(!subDropdowns[0-0]){
                                          //   console.log("data subdrop6566");
                                          setSubCourseData(data);
                                          // }
                                          toggleSubDropdown(
                                            `${secIndex}-${subIndex}`
                                          );
                                        });
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
                                           
                                              {(subCourseData.data[0] && subCourseData.data[0].video_type === sub || subCourseData.data.some(data => data.video_type === sub)) && subCourseData.data.map(
                                                (data, index) => (
                                                  <div
                                                    className="text-gray-500"
                                                    key={index}
                                                    onClick={() => setShowVideo(data.video_id)}
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
        setShowScanner={setShowScanner}
        setRefer={setRefer}
        showVideo={showVideo}
      />
    </div>
  );
}

const Dashboard = ({ setShowScanner, setRefer, showVideo }) => {
  return (
    <div className="flex flex-1">
      <div className={` border border-neutral-200 dark:border-neutral-700  dark:bg-black flex flex-col gap-2 flex-1 w-full h-full ${!showVideo ? "overflow-y-auto p-2 bg-white md:p-10" : " bg-black flex overflow-hidden h-[70vh] w-auto "}`}>
        {!showVideo ? (
          <>
            <div className="w-full">
              <h1 className="text-gray-400 text-5xl font-sans">
                Full Stack Web Development
              </h1>
            </div>
            <div className="flex flex-col md:flex-row h-screen overflow-y-auto no-scrollbar">
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
          <HLSPlayer showVideo={showVideo}/>
          </> 
        )}
      </div>
    </div>
  );
};

export default SidebarDemo;

// "use client";
// import React, { useContext, useState } from "react";

// import {
//   IconArrowLeft,
//   IconHomeShare,
//   IconSettings,
//   IconBook,
// } from "@tabler/icons-react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { cn } from "@/lib/utils";
// import CourseDetails from "./CourseDetails";
// import { ThreeDCard } from "./CourseCard";
// import { GlobalContext } from "@/context/GlobalContext";
// import toast from "react-hot-toast";
// import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sideBar";
// import VideoList from "@/components/ui/videoList";

// const items = [
//   { id: 1, name: "Item 1" },
//   { id: 2, name: "Item 2" },
//   // Add more items as needed
// ];

// export function SidebarDemo({ setShowScanner, setRefer, setCoursesOpen, coursesOpen, handleFetchData }) {
//   const { user, userDetails, isCoursePurchased } = useContext(GlobalContext);
//   const [showVideo, setShowVideo] = useState(false);
//   const [courseData, setCourseData] = useState([])
//   const [open, setOpen] = useState(false);
//   const [subDropdowns, setSubDropdowns] = useState({}); // For sub-dropdowns

//   const links = [
//     {
//       label: "Home",
//       href: "/",
//       icon: (
//         <IconHomeShare
//           stroke={2}
//           className="text-neutral-700 cursor-pointer dark:text-neutral-200 h-5 w-5 flex-shrink-0"
//         />
//       ),
//       onClick: () => {
//         window.location.href = "/";
//       }, // Added onClick for redirection
//     },
//     {
//       label: "Courses",
//       href: "/Courses",
//       icon: (
//         <IconBook className="text-neutral-700 cursor-pointer dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: "My Courses",
//       href: "",
//       icon: (
//         <IconBook className="text-neutral-700 cursor-pointer dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//       isDropdown: true,
//       sections: [
//         {
//           label: "Web Development",
//           // subsections: ["HTML & CSS", "JavaScript", "React"],
//         },
//         // {
//         //   label: "Data Science",
//         //   subsections: ["Python Basics", "Data Analysis", "Machine Learning"],
//         // },
//         // {
//         //   label: "Design",
//         //   subsections: ["UI/UX Basics", "Figma", "Prototyping"],
//         // },
//       ],
//     },
//   ];

//   const toggleSubDropdown = (index) => {
//     setSubDropdowns((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   return (
//     <div
//       className={cn(
//         "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
//         "h-[91vh] overflow-hidden"
//       )}
//     >
//       <Sidebar open={open} setOpen={setOpen}>
//         <SidebarBody
//           className="justify-between gap-10 bg-black dark:bg-black"
//           style={{ background: "black" }}
//         >
//           <div
//             className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden background-color:black"
//             style={{ background: "black" }}
//           >
//             <div className="mt-8 flex flex-col cursor-pointer gap-2">
//               {links.map((link, index) => {
//                 if (!link.isDropdown) {
//                   return (
//                     <SidebarLink
//                       key={index}
//                       link={link}
//                       onClick={link.onClick} // Ensure SidebarLink handles this
//                     />
//                   );
//                 }

//                 return (
//                   <div key={index}>
//                     {/* Dropdown Toggle */}
//                     <div
//                       className="flex items-center cursor-pointer"
//                       onClick={() => {
//                         if (isCoursePurchased) {
//                           toast.error(
//                             "Payment Verification Pending (this may take up to 24 Hours)"
//                           );
//                         } else if (
//                           userDetails &&
//                           userDetails.OwnedCourses &&
//                           userDetails.OwnedCourses.includes(
//                             "SSJWEBDEVCOURSE"
//                           )
//                         ) {

//                            handleFetchData("CourseData",userDetails.OwnedCourses[0]).then((data) => {
//                           console.log("data",data);
//                           setCourseData(data.data.titles);

//                           setCoursesOpen(!coursesOpen);
//                            });
//                         }
//                       }}
//                     >
//                       {link.icon}
//                       <span className="ml-3">{link.label}</span>
//                     </div>

//                     {/* Dropdown Content */}
//                     {link.label === "My Courses" && coursesOpen && (
//                       <div className="ml-6 mt-2 flex flex-col gap-2">
//                         {link.sections.map((section, secIndex) => (
//                           <div key={secIndex}>
//                             {/* Sub-dropdown Toggle */}
//                             <div
//                               className="flex items-center cursor-pointer"
//                               onClick={() => {
//                                 toggleSubDropdown(secIndex);
//                               }}
//                             >
//                               <IconArrowLeft
//                                 className={`transform ${
//                                   subDropdowns[secIndex]
//                                     ? "rotate-90"
//                                     : "rotate-0"
//                                 } text-neutral-500 h-4 w-4`}
//                               />
//                               <span className="ml-2">{section.label}</span>
//                             </div>

//                             {/* Sub-dropdown Content */}
//                             {subDropdowns[secIndex] && (
//                               <div className="ml-6 mt-1 flex flex-col gap-1">
//                                 {courseData.map(
//                                   (sub, subIndex) => (
//                                     <div
//                                       key={subIndex}
//                                       // className="text-neutral-700 dark:text-neutral-200"
//                                     >

//                                       {/* {sub} */}
//                                       <div
//                               className="flex items-center cursor-pointer"
//                               onClick={() => {
//                                 toggleSubDropdown(secIndex);
//                               }}
//                             >

//                               <IconArrowLeft
//                                 className={`transform ${
//                                   subDropdowns[secIndex]
//                                     ? "rotate-90"
//                                     : "rotate-0"
//                                 } text-neutral-500 h-4 w-4`}
//                               />
//                               <span className="ml-2">{sub}</span>
//                             </div>

//                             {subDropdowns[secIndex] && (
//                               <div className="ml-6 mt-1 flex flex-col gap-1">
//                                 {courseData.map((sub, subIndex) => (
//                                   <div key={subIndex}>
//                                     <span>{sub}</span>
//                                   </div>
//                                 ))}
//                               </div>
//                             )}
//                                     </div>
//                                   )
//                                 )}
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//           <div>
//             <SidebarLink
//               link={{
//                 label: `${
//                   user && user.displayName ? user.displayName : "User"
//                 }`,
//                 href: "#",
//                 icon: (
//                   <Image
//                     src={
//                       user && user.photoURL
//                         ? user.photoURL
//                         : "/avatar.png"
//                     }
//                     className="h-7 w-7 flex-shrink-0 rounded-full"
//                     width={50}
//                     height={50}
//                     alt="Avatar"
//                   />
//                 ),
//               }}
//             />
//           </div>
//         </SidebarBody>
//       </Sidebar>
//       <Dashboard setShowScanner={setShowScanner} setRefer={setRefer} showVideo={showVideo}/>
//     </div>
//   );
// }

// export const Logo = () => {
//   return (
//     <Link
//       href="#"
//       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
//     >
//       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//       <motion.span
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         Logo
//       </motion.span>
//     </Link>
//   );
// };

// export const LogoIcon = () => {
//   return (
//     <Link
//       href="#"
//       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
//     >
//       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//     </Link>
//   );
// };

// const Dashboard = ({ setShowScanner, setRefer, showVideo }) => {
//   return (
//     <div className="flex flex-1">
//       <div className="p-2 md:p-10 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">
//     {
//       !showVideo ? (
//         <>
//             <div className="w-full">
//           <h1 className="text-gray-400 text-5xl font-sans">
//             Full Stack Web Development
//           </h1>
//         </div>
//         <div className="flex flex-col md:flex-row h-screen overflow-y-auto no-scrollbar">
//           <div className="md:fixed md:top-6 md:right-10">
//             <ThreeDCard
//               setShowScanner={setShowScanner}
//               setRefer={setRefer}
//             />
//           </div>
//           <div>
//             <CourseDetails />
//           </div>
//         </div>
//         </>
//       ) :(
//         <>
//         <VideoList/>
//         </>
//       )
//     }
//       </div>
//     </div>
//   );
// };

// export default SidebarDemo;
