"use client"
 
import AcceptApplication from '@/components/admin/AcceptApplication';
import Tabs from '@/components/ui/tabs';
import { useParams } from 'next/navigation'
import React, {useState, useEffect} from 'react'


function page() {

  const params = useParams();

  const [data, setData] = useState(null)
if (params.key !== process.env.ADMINKEY) {
  return <p>Unauthorized</p>;
}

  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const res = await fetch("/api/adminRoute",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setData(data);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  
  const handleAccept = async (doc, id) => {
    console.log("Document:", doc);
    console.log("ID:", id);
  
    try {
      const res = await fetch(`/api/adminRoute`, { // Removed dynamic ID from URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...doc }), // Include ID in the request body
      });
  
      console.log("Response status:", res.status);
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  
  
  return (
     <>
     <div className="flex flex-col">
     <div className="flex justify-center"
      onClick={() => fetchData()}
     >
      <Tabs/>
      </div>
      <div className="flex w-full ">  
      </div>
     </div>

     <AcceptApplication data={data} handleAccept={handleAccept}/>

     </>
  )
}

export default page