// "use client";

import React from 'react';

const Table = ({userDetails}) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{userDetails && userDetails.referUser.length > 0 ? 1 : 0}</h2>
            <p className="leading-relaxed text-purple-300">Your purchased course(s)</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{userDetails && userDetails.referUser.length > 0 ? userDetails.referUser.length : 0}</h2>
            <p className="leading-relaxed text-purple-300">Verified Referrals</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{userDetails && userDetails.totalAmountRemainingFromReferral > 0 ? userDetails.totalAmountRemainingFromReferral : 0}</h2>
            <p className="leading-relaxed text-purple-300">Pending Amount</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{userDetails && userDetails.totalAmountPaidForReferral > 0 ? userDetails.totalAmountPaidForReferral : 0}</h2>
            <p className="leading-relaxed text-purple-300">Amount Paid</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Table;
