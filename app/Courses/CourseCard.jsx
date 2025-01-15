"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

import Link from "next/link";
import { GlobalContext } from "@/context/GlobalContext";
import toast from "react-hot-toast";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-Card";
import { checkReferralCodeExists } from "@/constants/serverLogic";

// Function to check if the referral code exists (assuming it's already imported or added as shown earlier)
// const checkReferralCodeExists = async (referralCode) => {
//   try {
//     const { data, error } = await supabase
//       .from("users")
//       .select("referral_code")
//       .eq("referral_code", referralCode)
//       .single(); // Using .single() to expect only one result

//     if (error) {
//       // console.error("Error checking referral code:", error);
//       return { success: false, message: "Error checking referral code. Please try again." };
//     }

//     if (data) {
//       return { success: true, message: "Referral code is valid!" };
//     } else {
//       return { success: false, message: "Referral code is not valid." };
//     }
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     return { success: false, message: "An unexpected error occurred." };
//   }
// };

export function ThreeDCard({ setShowScanner, setRefer }) {
  const { user, isCoursePurchased, userDetails } = useContext(GlobalContext);
  const [checkStatus, setCheckStatus] = useState("Buy Now");
  const [showReferralInput, setShowReferralInput] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralMessage, setReferralMessage] = useState(""); // New state for showing the referral message

  useEffect(() => {
    if (isCoursePurchased) {
      setCheckStatus("Pending");
    } else if (
      userDetails &&
      userDetails.OwnedCourses &&
      userDetails.OwnedCourses.includes("SSJWEBDEVCOURSE")
    ) {
      setCheckStatus("Purchased");
    } else {
      setCheckStatus("Buy Now");
    }
  }, [isCoursePurchased, userDetails]);

  const handleClick = () => {
    if (user) {
      setShowReferralInput(true);
    } else {
      toast.error("Please login to continue");
    }
  };

  const handleDone = async () => {
    const result = await checkReferralCodeExists(referralCode);

    if (result.success) {
      // If referral code is valid, proceed
      setRefer(referralCode);
      setShowReferralInput(false);
      setShowScanner("not done");
      toast.success(result.message);
    } else {
      // If referral code is invalid, show message
      // setReferralMessage(result.message); // Set the error message
      setReferralMessage("Please Enter a Valid Referral Code"); // Set the error message

    }
  };

  const handleSkip = () => {
    setShowReferralInput(false);
    setShowScanner("not done");
  };

  return (
    <CardContainer className="inter-var">
      <CardBody
        className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border"
      >
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Full Stack Web Development
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          This course will start on 1st January 2025
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="https://d502jbuhuh9wk.cloudfront.net/courses/64eebdb8e4b0a14befedc15d/64eebdb8e4b0a14befedc15d_scaled_cover.jpg?v=6"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            onClick={() => checkStatus === "Buy Now" && handleClick()}
            translateZ={20}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            onClick={() => checkStatus === "Buy Now" && handleClick()}
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            {checkStatus}
          </CardItem>
        </div>

        {showReferralInput && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter Referral Code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            {referralMessage && (
              <p className="text-red-500 text-sm mt-2">{referralMessage}</p>
            )}
            <div className="flex justify-between mt-2">
              <button
                onClick={handleDone}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Done
              </button>
              <button
                onClick={handleSkip}
                className="px-4 py-2 underline text-white rounded-lg"
              >
                Skip
              </button>
            </div>
          </div>
        )}
      </CardBody>
    </CardContainer>
  );
}
