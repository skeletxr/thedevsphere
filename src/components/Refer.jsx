import React from 'react';
import Navbar from './Navbar';
import loginuniquecode from '../assets/login-unique-code.png';
import getrewarded from '../assets/get-rewarded.png';
import shareyourcode from '../assets/share-your-code.png';
import refereeshops from '../assets/referee-shops.png';

const Refer = () => {
  return (
    <>
      <Navbar />

      <section   className="text-gray-400 bg-[#1c1b22] body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-white text-2xl">Phoebe Caulfield</h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                  <p className=" text-gray-400 text-xl">
                    Raclette knausgaard hella meggs normcore williamsburg enamel pin sartorial venmo tbh hot chicken gentrify portland.
                  </p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <h1 className="font-extrabold title-font text-white text-2xl">Refer & Earn up to INR 2000</h1>
                <p className="leading-relaxed text-xl mb-4">
                  Meggings portland fingerstache lyft, post-ironic fixie man bun banh mi umami everyday carry hexagon locavore direct trade art party. Locavore small batch listicle gastropub farm-to-table lumbersexual salvia messenger bag.
                </p>
                <a className="text-indigo-400 inline-flex items-center text-xl" href="#learn-more">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section  style={{ backgroundColor: '#1c1b22' }} className="bg-gray-900">
        <div className="hero h-20vh"></div>
        <div className="text-gray-600 body-font">
          <div className="container px-5 py-2 mx-auto">
            <div className="flex flex-wrap">
              <div className="w-1/4 mb-10 px-4">
                <div className="rounded-lg h-64 overflow-hidden flex items-center justify-center">
                  <img
                    alt="Login unique code"
                    className="w-3/4 h-3/4 rounded-full"
                    src={loginuniquecode}
                  />
                </div>
                <h2 className="title-font text-2xl text-center font-medium text-white mt-6 mb-3">
                  Step 1
                </h2>
                <p className="leading-relaxed text-green-500 text-center text-xl">
                  Login/ Sign up and get your unique code and referral link on 'Refer and Earn' page.
                </p>
              </div>

              <div className="w-1/4 mb-10 px-4">
                <div className="rounded-lg h-64 overflow-hidden flex items-center justify-center">
                  <img
                    alt="Share your code"
                    className="object-cover object-center w-3/4 h-3/4 rounded-full"
                    src={shareyourcode}
                  />
                </div>
                <h2 className="title-font text-2xl font-medium text-center text-white mt-6 mb-3">
                  Step 2
                </h2>
                <p className="leading-relaxed text-green-500 text-center text-xl">
                  Refer a friend/family to our website with the help of a code.
                </p>
              </div>

              <div className="w-1/4 mb-10 px-4">
                <div className="rounded-lg h-64 overflow-hidden flex items-center justify-center">
                  <img
                    alt="Referee shops"
                    className="object-cover object-center w-3/4 h-3/4 rounded-full"
                    src={refereeshops}
                  />
                </div>
                <h2 className="title-font text-2xl font-medium text-center text-white mt-6 mb-3">
                  Step 3
                </h2>
                <p className="leading-relaxed text-green-500 text-center text-xl">
                  When the person makes a purchase, you will be eligible for up to INR 2000.
                </p>
              </div>

              <div className="w-1/4 mb-10 px-4">
                <div className="rounded-lg h-64 overflow-hidden flex items-center justify-center">
                  <img
                    alt="Get rewarded"
                    className="w-3/4 h-3/4 rounded-full"
                    src={getrewarded}
                  />
                </div>
                <h2 className="title-font text-2xl font-medium text-center text-white mt-6 mb-3">
                  Step 4
                </h2>
                <p className="leading-relaxed text-green-500 text-center text-base">
                  Finally, contact our associates - you will receive the payment through UPI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Refer;
