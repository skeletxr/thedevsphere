"use client"; // Ensure this is present for client-side rendering

import React, { useState, useContext, useEffect, Suspense } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { SidebarDemo } from "./CoursesSideBar";
import SignUp from "@/components/Auth/signUp";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/fileUpload";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loading";
import dynamic from "next/dynamic";

// Define client-side only components with dynamic import
const ClientSideComponent = () => {
  const { showAuth, setShowAuth, user, userDetails, checkCoursePurchasedPending } =
    useContext(GlobalContext);
    const [coursesOpen, setCoursesOpen] = useState(false); // For "My Courses" dropdown

  const searchParams = useSearchParams(); // Using useSearchParams in client component
  const [refer, setRefer] = useState(searchParams.get("referral") || null);

  const notify = (text) => {
    toast.success(text);
  };
  // const [coursesData, setCoursesData] = useState([]);
  const [showScanner, setShowScanner] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const updateToRealTimeDateBase = async () => {
    if (userDetails.referId && userDetails.referId === refer) setRefer(null);

    const formData = new FormData();
    formData.append("referCode", userDetails.referId === refer ? null : refer);
    formData.append("userId", user.uid);
    formData.append("email", user.email);
    formData.append("name", user.displayName);

    const res = await fetch("/api/referDatabase", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.status;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".image-container")) return;
      setShowScanner(false);
    };

    if (showScanner) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showScanner]);

  const handleFileUpload = async (e) => {
    setShowSpinner(true);

    if (userDetails && userDetails.referId && userDetails.referId === refer)
      setRefer(null);

    const up = await updateToRealTimeDateBase();

    const formData = new FormData();
    formData.append("type", "notify");
    formData.append("file", e[0]);
    formData.append("subject", "Payment Proof");
    formData.append("text", user.email);
    formData.append(
      "html",
      `<ul><li>refer code = ${refer} </li><li>user id = ${user.uid}</li><li>name = ${user.displayName}</li><li>email = ${user.email}</li></ul> refer code is ${refer}`
    );

    const res = await fetch("/api/sendMail", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    setShowSpinner(false);
    if (data.status === 200 && up === 200) {
      checkCoursePurchasedPending(user.uid);
      setShowScanner(false);
      notify("Payment Proof uploaded successfully");
    } else {
      toast.error("Payment Proof not uploaded successfully");
    }
  };


  const handleFetchData = async (type, data) => {
    toast.loading("Getting Things Ready...");
    console.log("Data", {data, type})
    try{
      const res = await fetch(`/api/Courses`, {
        // Removed dynamic ID from URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, data }),
      });
      const courses = await res.json();
      // setCoursesData(courses);
      toast.dismiss();
      return courses;
    }catch(err){
      toast.dismiss();
      toast.error("Error Fetching Data")
      console.log(err)
    }
  }

  return (
    <div className="h-screen overflow-hidden">
      {/* Suspense wrapper here */}
      <Suspense fallback={<Loader />}>
        <div className="hidden md:block overflow-hidden">
          <Navbar />
        </div>

        <SidebarDemo showScanner={showScanner} setShowScanner={setShowScanner} setRefer={setRefer} setCoursesOpen={setCoursesOpen} coursesOpen={coursesOpen}  handleFetchData={handleFetchData}/>
        
        {showAuth && (
          <div className="flex fixed top-0 right-20">
            <SignUp showAuth={showAuth} setShowAuth={setShowAuth} />
          </div>
        )}

        {!showSpinner ? showScanner && showScanner === "not done" ? (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="image-container">
              <Image src="/payQR.jpg" alt="QR Code" width={400} height={400} />
            </div>
            <div className="max-w-[190px]"></div>

            <div
              className="absolute bottom-16"
              onClick={() => {
                notify(
                  "Payment Successful so you can now upload proof of payment"
                );
                setShowScanner("Done");
              }}
            >
              <Button name="Done" />
            </div>
          </div>
        ) : (
          showScanner === "Done" && (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
              <div className="image-container">
                <FileUpload onChange={handleFileUpload} />
              </div>
            </div>
          )
        ) : (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <Loader />
          </div>
        )}
      </Suspense>
    </div>
  );
};

// Dynamically import the ClientSideComponent to ensure it renders on the client
export default dynamic(() => Promise.resolve(ClientSideComponent), { ssr: false });
