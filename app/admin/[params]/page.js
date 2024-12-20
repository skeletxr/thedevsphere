"use client";

import AcceptApplication from "@/components/admin/AcceptApplication";
import Tabs from "@/components/ui/tabs";
import { realTimeDataBase } from "@/firebaseConfig";
import { ref, remove } from "firebase/database";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function page() {
  const params = useParams();
  const [showLoading, setShowLoading] = useState(false);
  const [disable, setDisable] = React.useState(false);

  const [tabSwitch, setTabSwitch] = useState(1);

  const [data, setData] = useState(null);
  if (params.key !== process.env.ADMINKEY) {
    return <p>Unauthorized</p>;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/adminRoute?tab=${tabSwitch}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
 
        
        const text = await res.json();
        console.log("Text:", text.data);
        // const data = text ? JSON.parse(text) : {};
        // console.log("Data:", data);
        // setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [tabSwitch]);


  const handleAccept = async (doc, id) => {
    setDisable(true);
    setShowLoading(true);
    console.log("Document:", doc);
    console.log("ID:", id);

    try {
      const res = await fetch(`/api/adminRoute`, {
        // Removed dynamic ID from URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...doc }), // Include ID in the request body
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.status === 200) {
        setData((prevData) =>
          Array.isArray(prevData)
            ? prevData.filter((item) => item.id !== id)
            : []
        );
        toast.success("Application Accepted");
        setShowLoading(false);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }

    setDisable(false);
  };

  const handleReject = async (id) => {
    setDisable(true);
    console.log("ID:", id);
    if(!id) return;
    const deleteRef = ref(realTimeDataBase, `users/${id}`); // Adjust the path based on your database structure
    await remove(deleteRef);
    setData((prevData) =>
      Array.isArray(prevData) ? prevData.filter((item) => item.id !== id) : []
    );
    toast.success("Application Rejected");
    setDisable(false);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <Tabs setTabSwitch={setTabSwitch} />
        </div>
        <div className="flex w-full "></div>
      </div>
      {tabSwitch === 1 ? (
        
        <AcceptApplication
        disable={disable}
          data={data}
          handleAccept={handleAccept}
          handleReject={handleReject}


        />
      ) : (
        <div>Tab 2</div>
      )}
    </>
  );
}

export default page;






















// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const res = await fetch(`/api/adminRoute?tab=${tabSwitch}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
      

   
//       const data = await res.json();
//       console.log("Data:", data);
//       setData(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   fetchData();
// }, [tabSwitch]);