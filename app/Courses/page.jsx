"use client"

import Navbar from '@/components/Navbar';
import React, { useState, useContext, useEffect } from 'react';
import { SidebarDemo } from './CoursesSideBar';
import { GlobalContext } from '@/context/GlobalContext';
import SignUp from '@/components/Auth/signUp';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { FileUpload } from '@/components/ui/fileUpload';
import toast from 'react-hot-toast';
import Loader from '@/components/ui/loading';
 

import { Toaster } from 'react-hot-toast';
import { sendEmailWithAttachment } from '@/server/mailer';
const Courses = () => {

 
  const notify = (text) =>{ 
    toast.success(text);
  }
  const {showAuth, setShowAuth, user} = useContext(GlobalContext)
  const [showScanner, setShowScanner] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);


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

  const handleFileUpload = async(e) =>{
   
    try{
        const res = await sendEmailWithAttachment('info.thedevsphere@gmail.com', 'Payment Proof', 'Payment Proof',user ,e[0]);
        console.log(res);
    } catch (e) {
      console.log(e);
    }
}

  return (
    <div className='h-screen overflow-hidden'>
  {/* <Toaster/> */}
   
      <div className="hidden md:block overflow-hidden">
      <Navbar />
      </div>
    
      <SidebarDemo showScanner={showScanner} setShowScanner={setShowScanner}/>
      {showAuth && (
          <div className="flex fixed top-0 right-20">
            <SignUp showAuth={showAuth} setShowAuth={setShowAuth} />
          </div>
        )}
      {showScanner && showScanner === "not done" ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="image-container">
            <Image src="/payQR.jpg" alt="QR Code" width={400} height={400}  />
        
          </div>
          <div className="absolute bottom-16" onClick={() =>{
            notify('Payment Successful so you can now upload proof of payment')
            setShowScanner("Done")
          
          } }>
            <Button name="Done" />

            </div>
        </div>
      ) : showScanner === "Done" && (
     
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
             <div className='image-container'>
           {!showSpinner ? <FileUpload onChange={handleFileUpload} /> : (
            <Loader/>
           )}
             
      </div>
      </div>
      )}
    </div>
  );
};

export default Courses;
 



