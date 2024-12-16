"use client"
 
import AcceptApplication from '@/components/admin/AcceptApplication';
import Tabs from '@/components/ui/tabs';
import { useParams } from 'next/navigation'
import React, {useState, useEffect} from 'react'


function page() {

  const params = useParams();
  const [Data, setData] = useState([])
  
  useEffect(() => {
    fetch("/api/referDatabase", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Network response was not ok.');
    }).then((data) => {
      if (data) {
        console.log("admin data", data);
        setData(data);
      } else {
        console.log("admin data is undefined");
      }
    }).catch((error) => {
      console.error('Fetch error:', error);
    });
  }, [])

  if(params.params !== process.env.ADMINKEY) return;

  return (
     <>
     <div className="flex flex-col">
     <div className="flex justify-center">
      <Tabs/>
      </div>
      <div className="flex w-full ">  
      </div>
     </div>

     <AcceptApplication/>

     </>
  )
}

export default page