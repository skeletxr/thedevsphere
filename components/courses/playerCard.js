"use client";

import React, { useState } from "react";

const PlayerCard = ({
  courseData,
  handleSubCourseField,
  subCourseData,
  setShowVideo,
}) => {
  const [openStates, setOpenStates] = useState(
    Array(courseData.length).fill(false)
  );
  //console.log("sub",subCourseData)
  const toggleDropdown = (index) => {
    setOpenStates(
      openStates.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <div className="flex w-[90vw] flex-col mt-10 items-center overflow-y-scroll bg-black min-h-screen">
      {courseData.map((course, index) => (
        <div
          key={index}
          className="relative w-[90vw] mb-3 flex flex-col min-h-[58px] border border-purple-500 rounded-lg bg-purple-800 overflow-hidden transition-all duration-300"
        >
          <input
            hidden
            checked={openStates[index]}
            onChange={async () => {
              handleSubCourseField(course);
              toggleDropdown(index);
            }}
            className="sr-only"
            name={`state-dropdown-${index}`}
            id={`state-dropdown-${index}`}
            type="checkbox"
          />

          <label
            aria-label="dropdown scrollbar"
            htmlFor={`state-dropdown-${index}`}
            className="trigger text-white cursor-pointer list-none select-none font-semibold text-inherit w-full flex items-center gap-4 p-4 h-max relative z-10 rounded-lg bg-black"
          >
            {course}
          </label>

          <ul
            className={`list ${
              openStates[index]
                ? "opacity-100 translate-y-0 max-h-80"
                : "opacity-0 translate-y-[3rem] mt-[-100%]"
            } overflow-hidden auto-scroll gap-4 p-4 transition-all duration-500 ease-out flex items-center flex-col justify-between bg-black`}
            role="list"
          >
            {subCourseData &&
              subCourseData.data &&
              subCourseData.data.map((subCourse, index) => (
                <li
                  className="listitem w-[95%]"
                  role="listitem"
                  key={index}
                  onClick={() => setShowVideo(subCourse.video_id)}
                >
                  <article className="article p-4 rounded-lg text-sm font-medium text-white text-justify border border-purple-500 inline-block w-full bg-black">
                    {subCourse.title}
                  </article>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PlayerCard;

// "use client";

// import React, { useState } from 'react';

// const PlayerCard = ({courseData, handleSubCourseField,subCourseData, setShowVideo}) => {
//   const [openStates, setOpenStates] = useState(Array(courseData.length).fill(false));
// //console.log("sub",subCourseData)
//   const toggleDropdown = (index) => {
//     setOpenStates(openStates.map((isOpen, i) => (i === index ? !isOpen : isOpen)));
//   };

//   return (
//     <div className="flex w-[90vw] flex-col mt-10 text-black items-center overflow-y-scroll">
//       {courseData.map((course, index) => (
//         <div key={index} className="relative w-[90vw] mb-3 text-black flex flex-col min-h-[58px] border-green-300 rounded-lg bg-white overflow-hidden transition-all duration-300">
//           <input hidden checked={openStates[index]} onChange={async() => {
//             handleSubCourseField(course);
//             toggleDropdown(index)}} className="sr-only" name={`state-dropdown-${index}`} id={`state-dropdown-${index}`} type="checkbox" />

//           <label
//             aria-label="dropdown scrollbar"
//             htmlFor={`state-dropdown-${index}`}
//             className="trigger text-black cursor-pointer list-none select-none font-semibold text-inherit w-full flex items-center gap-4 p-4 h-max relative z-10 rounded-lg bg-white"
//           >
//             {course}
//           </label>

//           <ul
//             className={`list ${openStates[index] ? 'opacity-100 translate-y-0 max-h-80' : 'opacity-0 translate-y-[3rem] mt-[-100%]'} overflow-hidden auto-scroll gap-4 p-4 transition-all ration-500 ease-out flex items-center flex-col justify-between`}
//             role="list"
//           >
//                {subCourseData && subCourseData.data &&  subCourseData.data.map((subCourse,index) => (
//           <li className="listitem" role="listitem" key={index} onClick={() => setShowVideo(subCourse.video_id)}>
//           <article className="article p-4 rounded-lg text-sm font-medium text-justify border border-gray-300 inline-block w-full bg-white">
//             {subCourse.title}
//           </article>
//         </li>
//           ))}

//           {/* <ChevronDownIcon className="h-5 w-5 text-gray-500" /> */}
//         </ul>

//       </div>
//       ))}
//     </div>
//   );
// };

// export default PlayerCard;
