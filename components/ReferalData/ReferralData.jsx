import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "../ui/button";
import toast from "react-hot-toast";

const MySwal = withReactContent(Swal);

const ReferralData = ({ data }) => {

  function alertInput(email) {

    MySwal.fire({
      title: <p>Add Amount </p>,
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Substract",
      showLoaderOnConfirm: true,
      preConfirm: async (amount) =>{
       const type = "UpdatePaymentInfo";
        try {
          toast.loading("Updating Payment...");
          const res = await fetch(`/api/adminRoute`, {
            // Removed dynamic ID from URL
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ type, email, amount }), // Include ID in the request body
          });
    
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
    
          const data = await res.json();
          toast.dismiss();
          toast.success("Payment Updated Successfully! please refresh the page to see the changes");
        } catch (error) {
          toast.dismiss();
          console.error("Error updating data:", error);
        }
      }

    })
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Payment Remaining Data</h1>
      <div className="space-y-6">
        {data && Object.entries(data).map(([_, item], index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2">
              Name: {item.name || "Not Provided"}
            </h2>
            <p className="text-gray-700">Email: {item.email}</p>
            <p className="text-gray-700">Refer ID: {item.referId || "Not Provided"}</p>
            <p className="text-gray-700">Total Amount Remaining from Referral: ₹{item.totalAmountRemainingFromReferral}</p>
            <p className="text-gray-700">Total Amount Paid for Referral: ₹{item.totalAmountPaidForReferral}</p>
            {item.OwnedCourses && (
              <p className="text-gray-700">Owned Courses: {item.OwnedCourses.join(", ")}</p>
            )}
            {item.ReferedBy && (
              <p className="text-gray-700">Referred By: {item.ReferedBy}</p>
            )}
            {item.referUser && (
              <div className="text-gray-700">
                Referred User IDs:
                <ul>
                  {item.referUser.map((user, index) => (
                    <li key={index}>{index + 1}) {user}</li>
                  ))}
                </ul>
                
              </div>
            )}
            <div onClick={() =>alertInput(item.email)}>
          <Button name="Pay Now"/>
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferralData;





// import React from "react";
// import Swal from "sweetalert2";
// const ReferralData = ({ data }) => {

//   function alertInput() {
//     Swal.fire({
//       title: "Submit your Github username",
//       input: "text",
//       inputAttributes: {
//         autocapitalize: "off"
//       },
//       showCancelButton: true,
//       confirmButtonText: "Look up",
//       showLoaderOnConfirm: true,
//       preConfirm: async (login) => {
//         try {
//           const githubUrl = `
//             https://api.github.com/users/${login}
//           `;
//           const response = await fetch(githubUrl);
//           if (!response.ok) {
//             return Swal.showValidationMessage(`
//               ${JSON.stringify(await response.json())}
//             `);
//           }
//           return response.json();
//         } catch (error) {
//           Swal.showValidationMessage(`
//             Request failed: ${error}
//           `);
//         }
//       },
//       allowOutsideClick: () => !Swal.isLoading()
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           title: `${result.value.login}'s avatar`,
//           imageUrl: result.value.avatar_url
//         });
//       }
//     });
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold text-center mb-6">Payment Remaining Data</h1>
//       <div className="space-y-6">
//       {data && Object.entries(data).map(([_, item], index) => {
//           return (
//             <div
//               key={index}
//               className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
//             >
              
//               <h2 className="text-xl font-semibold mb-2">
//                 Name: {item.name || "Not Provided"}
//               </h2>
//               <p className="text-gray-700">Email: {item.email}</p>
//               <p className="text-gray-700">
//                 Refer ID: {item.referId || "Not Provided"}
//               </p>
//               <p className="text-gray-700">
//                 Total Amount Remaining from Referral: ₹{item.totalAmountRemainingFromReferral}
//               </p>
//               <p className="text-gray-700">
//                 Total Amount Paid for Referral: ₹{item.totalAmountPaidForReferral}
//               </p>
//               {item.OwnedCourses && (
//                 <p className="text-gray-700">
//                   Owned Courses: {item.OwnedCourses.join(", ")}
//                 </p>
//               )}
//               {item.ReferedBy && (
//                 <p className="text-gray-700">
//                   Referred By: {item.ReferedBy}
//                 </p>
//               )}

// {item.referUser && (
//                 <div className="text-gray-700">
//                 refered User Id's: <ul>
               
//                     {item.referUser.map((item, index) => (
//                       <li key={index}>{index+1}{')'} {item}</li>
//                     ))}
                 
//                   </ul>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ReferralData;