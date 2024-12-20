import React from "react";

const ReferralData = ({ data }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Referral Data</h1>
      <div className="space-y-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2">
              Name: {item.name || "Not Provided"}
            </h2>
            <p className="text-gray-700">Email: {item.email}</p>
            <p className="text-gray-700">
              Refer ID: {item.referId || "Not Provided"}
            </p>
            <p className="text-gray-700">
              Total Amount Remaining from Referral: ₹{item.totalAmountRemainingFromReferral}
            </p>
            <p className="text-gray-700">
              Total Amount Paid for Referral: ₹{item.totalAmountPaidForReferral}
            </p>
            {item.ReferedBy && (
              <p className="text-gray-700">Referred By: {item.ReferedBy}</p>
            )}
            <div className="flex space-x-4 mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Pay
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferralData;