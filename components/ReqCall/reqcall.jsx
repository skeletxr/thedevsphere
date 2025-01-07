import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';

const ReqCall = ({ scrollToRequestCallBack }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Sending Request...");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const formData1 = new FormData();
    formData1.append('type', 'reqcallback');
    formData1.append('subject', 'Request Callback');
    formData1.append('text', "Request Callback");
    formData1.append('html', `<ul><li>First Name = ${data.firstName} </li><li>Last Name = ${data.lastName}</li><li>Email = ${data.email}</li><li>Phone = ${data.phone}</li> <li>gender = ${data.gender} </li> <li> age = ${data.age} </li> </ul>`);
    const res = await fetch('/api/sendMail', {
      method: 'POST',
      body: formData1,
    });
    console.log(res);
    if (res.status === 200) {
      e.target.reset();
      toast.dismiss();
      toast.success("Request sent successfully");
    } else {
      toast.dismiss();
      toast.error(`Failed to send request ${res.status}`);
    }
  };

  return (
    <div className="min-h-screen border-purple-400 flex flex-col lg:flex-row justify-between items-center md:gap-8" >
      <div  className="flex flex-col items-center  md:ml-6 justify-center h-screen dark  md:p-4">
        <div className="w-full min-w-[38vw] max-w-md bg-black p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl text-white flex pb-4 font-bold justify-center mb-6">Request Callback from Us</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {/* First Name and Last Name Inputs */}
            <div className="flex space-x-4 mb-4 pb-2">
              <div className="flex items-center border border-purple-500 rounded-md px-3 py-2 mt-1 w-1/2">
                <input
                  required
                  placeholder="First Name"
                  name="firstName"
                  className="w-full bg-transparent text-white p-2 outline-none"
                  type="text"
                />
              </div>
              <div className="flex items-center border border-purple-500 rounded-md px-3 py-2 mt-1 w-1/2">
                <input
                  required
                  placeholder="Last Name"
                  name="lastName"
                  className="w-full bg-transparent text-white p-2 outline-none"
                  type="text"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="flex items-center border border-purple-500 rounded-md px-3 py-2 mt-1 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 32 32"
                className="mr-2"
              >
                <g data-name="Layer 3" id="Layer_3">
                  <path
                    fill="#FFFFFF"
                    d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"
                  />
                </g>
              </svg>
              <input
                required
                name="email"
                placeholder="Email"
                className="w-full bg-transparent text-white p-2 outline-none"
                type="email"
              />
            </div>

            <div className="flex items-center border border-purple-500 rounded-md px-3 py-2 mt-1 mb-4">
              <input
                required
                name="phone"
                placeholder="Enter Phone Number"
                className="w-full bg-transparent text-white p-2 outline-none"
                type="number"
                style={{
                  WebkitAppearance: 'none',
                  MozAppearance: 'textfield',
                }}
              />
            </div>

            {/* Gender Select */}
            <label className="text-sm mb-2 text-white cursor-pointer">Gender</label>
            <div className="flex items-center border border-purple-500 rounded-md px-3 py-2 mt-1 mb-4">
              <select
                name="gender"
                className="w-full bg-transparent text-white p-2 outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Age Input */}
            <label className="text-sm mb-2 text-white cursor-pointer">Age</label>
            <div className="flex items-center border border-purple-500 rounded-md px-3 py-2 mt-1 mb-4">
              <input
                required
                name="age"
                className="w-full bg-transparent text-white p-2 outline-none"
                type="date"
              />
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold mt-4 hover:bg-purple-700 transition ease-in-out duration-150"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Image on the right for larger screens */}
      <div className="flex hidden md:block w-full max-w-[500px] h-auto mr-6 lg:mr-0 lg:ml-6">
        <Image width={500} height={500} src="/images/contact-us.png" alt="Contact Us" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default ReqCall;
