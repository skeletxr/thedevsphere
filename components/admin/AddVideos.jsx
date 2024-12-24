"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

const CheckboxGroup = ({data,tabSwitch ,setTabSwitch,setCheckedCount ,checkedCount, handlePlaylist}) => {

const [videoId, setVideoId] = useState([])

  const handleCheckboxChange = (e, title) => {
    
    const { id, checked } = e.target;
if(tabSwitch === 3){
  
    if (checked) {
      setCheckedCount((prevCount) => [...prevCount, id]);
    } else {
      setCheckedCount((prevCount) =>
        prevCount.filter((optionId) => optionId !== id)
      );
    }
  }else{
    
    if (checked) {
 
      setVideoId((prevVideoIds) => [...prevVideoIds, { id, title }]);
 

    } else {
      setVideoId((prevVideoIds) =>
        prevVideoIds.filter((video) => video.id !== id)
      );
    }

  }
  };

  return (
    <div className="check-group bg-white max-w-[13rem] p-6 rounded-md shadow-sm flex flex-col gap-3">
  {data &&tabSwitch === 3 ? (
    <>


     { Object.entries(data).map(([_,option], index) => (
        <label
          key={index}
          htmlFor={option.id}
          className="checkbox flex items-center cursor-pointer"
        >
      
          <input
            id={option.id}
            type="checkbox"
            className="absolute w-[1.375em] h-[1.375em] opacity-0 peer"
            onChange={handleCheckboxChange}
          />
          {/* SVG for box and tick */}
            <svg
              className="w-[1.375em] h-[1.375em] flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 22"
            >
          {checkedCount.includes(option.id) && (
            <>
              <rect
                width="21"
                height="21"
                x=".5"
                y=".5"
                fill="#FFF"
                stroke="#006F94"
                rx="3"
              />
              {/* Tick mark (conditionally shown only for checked boxes) */}
              <path
                className="tick stroke-green-500 stroke-dasharray-[20px] stroke-dashoffset-[20px] transition-all duration-200 ease-out peer-checked:stroke-dashoffset-0"
                fill="none"
                strokeLinecap="round"
                strokeWidth="4"
                d="M4 10l5 5 9-9"
              />
            </>
          )}

            </svg>

          <span className="ml-2">{option.email}</span>
        </label>
      ))}
    
    </>
  ): (
    <>
   
       { data && data.map((option, index) => (
        <label
          key={index}
          htmlFor={option.id}
          className="checkbox flex items-center cursor-pointer"
        >
      
          <input
            id={option.id}
            type="checkbox"
            className="absolute w-[1.375em] h-[1.375em] opacity-0 peer"
            onChange={(e) =>handleCheckboxChange(e, option.name)}
          />
          {/* SVG for box and tick */}
            <svg
              className="w-[1.375em] h-[1.375em] flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 22"
            >
          {videoId.some(video => video.id === option.id) && (
            <>
              <rect
                width="21"
                height="21"
                x=".5"
                y=".5"
                fill="#FFF"
                stroke="#006F94"
                rx="3"
              />
              {/* Tick mark (conditionally shown only for checked boxes) */}
              <path
                className="tick stroke-green-500 stroke-dasharray-[20px] stroke-dashoffset-[20px] transition-all duration-200 ease-out peer-checked:stroke-dashoffset-0"
                fill="none"
                strokeLinecap="round"
                strokeWidth="4"
                d="M4 10l5 5 9-9"
              />
            </>
          )}

            </svg>

          <span className="ml-2">{option.name}</span>
        </label>
      ))}
    
    </>
  )}
     
      <div className="font-bold pt-3 border-t border-black/20">
        Options chosen: {checkedCount.length} / {data && data.length}
      </div>
      <div className="flex" onClick={() => {tabSwitch === 3 ? setTabSwitch(4) : handlePlaylist(videoId)}} >
        <Button name={tabSwitch === 3 ? "Next" : "Add to Playlist"} />
      </div>
    </div>
  );
};

export default CheckboxGroup;
