import React from 'react';
import toast from 'react-hot-toast';

const ReqCall = ({ scrollToRequestCallBack }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const formData1 = new FormData();
    formData1.append('type', 'reqcallback');
    formData1.append('subject', 'Request Callback');
    formData1.append('text',  "Request Callback");
    formData1.append('html', `<ul><li>First Name = ${data.firstName} </li><li>Last Name = ${data.lastName}</li><li>Email = ${data.email}</li><li>Phone = ${data.phone}</li> <li>gender = ${data.gender} </li> <li> age = ${data.age} </li> </ul>`);
    const res = await fetch('/api/sendMail', {
      method: 'POST',
      body: formData1,
    });
    console.log(res);
   if(res.status == 200){
    e.target.reset();
    toast.success("Request sended successfully");
   }else{
    toast.error(`Failed to send request ${res.status}`);
    }

  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-between items-center gap-8" ref={scrollToRequestCallBack}>
      <div className="flex flex-col items-center ml-6 justify-center h-screen dark p-4">
        <div className="w-full min-w-[38vw] max-w-md bg-[rgba(54,29,151,0.5)] rounded-lg shadow-md p-6">
          <h2 className="text-2xl flex pb-2 font-bold text-gray-200 mb-4 justify-center">Request Callback</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex space-x-4 mb-4 pb-2">
              <input
                required
                placeholder="First Name"
                name='firstName'
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
              <input
                name='lastName'
                required
                placeholder="Last Name"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <input
              name='email'
              placeholder="Email"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out pb-2 duration-150"
              type="email"
            />
            <input
              name='phone'
              placeholder="Enter Phone Number"
              required
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 pb-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="number"
            />
            <label className="text-sm mb-2 pb-2 text-gray-200 cursor-pointer">
              Gender
            </label>
            <select
              name="gender"
              className="bg-gray-700 pb-2 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              id="gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label className="text-sm mb-2 text-gray-200 cursor-pointer">
              Age
            </label>
            <input
              name="age"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
              id="age"
              type="date"
            />
            <button
              className="bg-gradient-to-r from-purple-500 to-purple-800 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="flex w-full max-w-[500px] h-auto mr-6 lg:mr-0 lg:ml-6">
        <img src="/images/contact-us.png" alt="Picture of the author" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default ReqCall;