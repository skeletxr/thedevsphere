"use client"
 
import Tabs from '@/components/ui/tabs';
import { useParams } from 'next/navigation'
import React from 'react'


function page() {

  const params = useParams();

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

     </>
  )
}

export default page