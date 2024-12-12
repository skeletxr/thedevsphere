import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import loginuniquecode from "../assets/login-unique-code.png";
import getrewarded from "../assets/get-rewarded.png";
import shareyourcode from "../assets/share-your-code.png";
import refereeshops from "../assets/referee-shops.png";
import { useState } from "react";
import Footer from "./Footer";
import { referLogic } from "../constants/logic";
import { GlobalContext } from "../context/GlobalContext";

const Refer = () => {
const {user , userDetails} = useContext(GlobalContext);
console.log(user)
const [isReferralCodeAvailable, setIsReferralCodeAvailable] = useState('pending');

useEffect(() => {
   if (user && userDetails && userDetails.referId) {
     setIsReferralCodeAvailable(userDetails.referId);
   }else{
     setIsReferralCodeAvailable(false);
   }
}, [user, userDetails]);


  console.log(isReferralCodeAvailable);
  const handleClick = async () => {
    const res = await referLogic(user);
    setIsReferralCodeAvailable(res);
  };
  return (
    <>
      <Navbar />

      {/* --------HERO SECTION------- */}

      <div
        style={{ backgroundColor: "#1D232A" }}
        className="flex min-h-[65vh] flex-col items-center justify-center mt-6  max-w-[75vw] mx-auto lg:mt-20"
      >
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
          JITU SEXY
          <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
            {" "}
            Hands-On Projects
          </span>
        </h1>
        <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
          Join a community of learners, tackle exciting projects, and earn your
          certificate of completion!
        </p>
        <div className="flex justify-center my-10">
          <a
            href="#"
            className="bg-gradient-to-r from-purple-500 to-purple-800 py-3 px-4 mx-3 rounded-md max-w-[75vw] mx-auto text-white"
          >
            Get your refferal link
          </a>
        </div>
        {/* <div className="flex mt-10 justify-center"></div> */}
      </div>

      {/* --------REFER STEPS SECTION------- */}

      <section
        style={{ backgroundColor: "#1D232A" }}
        className="bg-gray-900 max-w-[85vw] mx-auto"
      >
        <div className="hero h-20vh"></div>
        <div className="text-gray-600 body-font">
          <div className="container px-5 py-2 mx-auto">
            <div className="flex flex-wrap">
              <div className="w-1/4 mb-10 px-4">
                <div className=" overflow-hidden flex items-center justify-center">
                  <img
                    alt="Login unique code"
                    className="w-3/4 h-3/4 rounded-full"
                    src={loginuniquecode}
                  />
                </div>
                <h2 className="title-font text-2xl text-center font-medium text-white mt-6 mb-3">
                  Step 1
                </h2>
                <p className="leading-relaxed text-purple-300 text-center text-xl">
                  Login/ Sign up and get your unique code and referral link on
                  'Refer and Earn' page.
                </p>
              </div>

              <div className="w-1/4 mb-10 px-4">
                <div className=" overflow-hidden flex items-center justify-center">
                  <img
                    alt="Share your code"
                    className="object-cover object-center w-3/4 h-3/4 rounded-full"
                    src={shareyourcode}
                  />
                </div>
                <h2 className="title-font text-2xl font-medium text-center text-white mt-6 mb-3">
                  Step 2
                </h2>
                <p className="leading-relaxed text-purple-300 text-center text-xl">
                  Refer a friend/family to our website with the help of a code.
                </p>
              </div>

              <div className="w-1/4 mb-10 px-4">
                <div className="overflow-hidden flex items-center justify-center">
                  <img
                    alt="Referee shops"
                    className="object-cover object-center w-3/4 h-3/4 rounded-full"
                    src={refereeshops}
                  />
                </div>
                <h2 className="title-font text-2xl font-medium text-center text-white mt-6 mb-3">
                  Step 3
                </h2>
                <p className="leading-relaxed text-purple-300 text-center text-xl">
                  When the person makes a purchase, you will be eligible for up
                  to INR 2000.
                </p>
              </div>

              <div className="w-1/4 mb-10 px-4">
                <div className="overflow-hidden flex items-center justify-center">
                  <img
                    alt="Get rewarded"
                    className="w-3/4 h-3/4 rounded-full"
                    src={getrewarded}
                  />
                </div>
                <h2 className="title-font text-2xl font-medium text-center text-white mt-6 mb-3">
                  Step 4
                </h2>
                <p className="leading-relaxed text-purple-300 text-center text-base">
                  Finally, contact our associates - you will receive the payment
                  through UPI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------GENERATE LINK SECTION------- */}

      <section>
        <div
          style={{ backgroundColor: "#1D232A" }}
          className="flex flex-col items-center justify-center max-h-[50vh] px-4 bg-gray-900 text-white"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-purple-200 mb-2 text-center">
            Ready to earn cash rewards?
          </h1>
          <p className="text-lg md:text-xl text-purple-300 mb-6 text-center">
            Invite your friends now and get upto INR 2000!
          </p>
          <div className="flex  flex-col md:flex-row w-full max-w-lg">
            {isReferralCodeAvailable === 'pending' || isReferralCodeAvailable ? (
              <>
                
                  <input
                    disabled
                    value={`http://localhost:5173/course?referralCode=${isReferralCodeAvailable}`}
                    type="text"
                    placeholder="your link will appear here"
                    className="flex-grow px-4 py-3 rounded-t-lg md:rounded-l-lg md:rounded-t-none text-gray-900 bg-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500"
                    // value={emails}
                    // onChange={(e) => setEmails(e.target.value)}
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(`http://localhost:5173/course?referralCode=${isReferralCodeAvailable}`)}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-b-lg md:rounded-r-lg md:rounded-b-none transition duration-300"
                  >
                    Copy link
                  </button>
                         
                  <input
                    value={isReferralCodeAvailable}
                    disabled
                    type="text"
                    placeholder="your code will appear here"
                    className="flex-grow px-4 py-3 rounded-t-lg md:rounded-l-lg md:rounded-t-none text-gray-900 bg-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500"
                    // value={emails}
                    // onChange={(e) => setEmails(e.target.value)}
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(isReferralCodeAvailable)}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-b-lg md:rounded-r-lg md:rounded-b-none transition duration-300"
                  >
                    Copy Code
                  </button>
                
              </>
            ) : (
              <>
                <div>
                  <div class="flex items-center justify-center m-auto"    >
                    <div class="relative group">
                      <button  onClick={handleClick} class="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                        <span class="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

                        <span class="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                          <div class="relative z-10 flex items-center space-x-2">
                            <span class="transition-all duration-500 group-hover:translate-x-1">
                              Generate Link
                            </span>
                            <svg
                              class="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                              data-slot="icon"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                clip-rule="evenodd"
                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                fill-rule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      By using our service you agree with our{" "}
                      <a href="#" className="text-purple-400 underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-purple-400 underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Refer;
