


import React from 'react';

const ReqCall = ({scrollToRequestCallBack}) => {
  return (
    <div className="min-h-screen  flex flex-row justify-between items-center gap-8" ref={scrollToRequestCallBack}>
   
<div className="flex  flex-col items-center ml-6 justify-center h-screen dark p-4">
  <div className="w-full min-w-[38vw] max-w-md bg-[rgba(54,29,151,0.5)] rounded-lg shadow-md p-6">
    <h2 className="text-2xl flex pb-2 font-bold text-gray-200 mb-4 justify-center">Request Callback</h2>
    <form className="flex flex-col">
      <div className="flex space-x-4 mb-4 pb-2">
        <input
          placeholder="First Name"
          className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          type="text"
        />
        <input
          placeholder="Last Name"
          className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          type="text"
        />
      </div>
      <input
        placeholder="Email"
        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 
        mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out pb-2 duration-150"
        type="email"
      />
      <input
        placeholder="Confirm Email"
        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 pb-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
        type="email"
      />
      {/* <input
        placeholder="Password"
        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
        type="password"
      />
      <input
        placeholder="Confirm Password"
        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
        type="password"
      /> */}
      <label className="text-sm mb-2 pb-2 text-gray-200 cursor-pointer" for="gender">
        Gender
      </label>
      <select
        className="bg-gray-700 pb-2 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
        id="gender"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <label className="text-sm mb-2 text-gray-200 cursor-pointer" for="age">
        Age
      </label>
      <input
        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
        id="age"
        type="date"
      />
      {/* <p className="text-white mt-4">
        Already have an account?
        <a className="text-sm text-blue-500 -200 hover:underline mt-4" href="#"
          >Login</a
        >
      </p> */}
      <button
        className="bg-gradient-to-r from-purple-500 to-purple-800 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
        type="submit" 
      >
        Submit
      </button>
    </form>
  </div>
</div>
<div className="flex  w-[500] h-[506px] mr-6">
      <img  src="/images/contact-us.png" alt="Picture of the author" />
    </div>
  </div>

  );
}
export default ReqCall;




 