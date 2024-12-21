"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { GlobalContext } from "@/context/GlobalContext";
import toast from "react-hot-toast";

export function ThreeDCard({ setShowScanner}) {

  const {user, isCoursePurchased, userDetails} = useContext(GlobalContext);
 console.log(userDetails);
  
 const [checkStatus, setCheckStatus] = useState("Buy Now");

 useEffect(() => {
   if (isCoursePurchased) {
     setCheckStatus("Pending");
   } else if (userDetails && userDetails.OwnedCourses && userDetails.OwnedCourses.includes("SSJWEBDEVCOURSE")) {
     setCheckStatus("Purchased");
   } else {
     setCheckStatus("Buy Now");
   }
 }, [isCoursePurchased, userDetails]);


 console.log(checkStatus)
   
  const handleClick = () => {
     if(user){
       setShowScanner('not done');
     }else{
      toast.error("Please login to continue");
     }
  }

  return (
    <CardContainer className="inter-var">
      <CardBody
        className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border"
        >
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white">
          Full Stack Web Development
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4" 
        >
          <Image
            src="https://d502jbuhuh9wk.cloudfront.net/courses/64eebdb8e4b0a14befedc15d/64eebdb8e4b0a14befedc15d_scaled_cover.jpg?v=6"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail" />
        </CardItem>
        <div className="flex justify-between items-center mt-20" 
        >
          <CardItem
                        onClick={() => checkStatus === "Buy Now" && handleClick()}


            translateZ={20}
            // as={Link}
            // href=""
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
            Try now →
          </CardItem>
          <CardItem 
            onClick={() => checkStatus === "Buy Now" && handleClick()}
             
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
              {checkStatus}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
