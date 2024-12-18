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
        const res = await fetch("/api/adminRoute");
        const data = await res.json();
        setData(data);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  
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

     <AcceptApplication data={data}/>

     </>
  )
}

export default page