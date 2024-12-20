import React from "react";
 
const ReferralData = ({ data }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Payment Remaining Data</h1>
      <div className="space-y-6">
      {data && Object.entries(data).map(([_, item], index) => {
          return (
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
              {item.OwnedCourses && (
                <p className="text-gray-700">
                  Owned Courses: {item.OwnedCourses.join(", ")}
                </p>
              )}
              {item.ReferedBy && (
                <p className="text-gray-700">
                  Referred By: {item.ReferedBy}
                </p>
              )}

{item.referUser && (
                <div className="text-gray-700">
                refered User Id's: <ul>
               
                    {item.referUser.map((item, index) => (
                      <li key={index}>{index+1}{')'} {item}</li>
                    ))}
                 
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReferralData;