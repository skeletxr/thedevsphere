"use client";

import AcceptApplication from "@/components/admin/AcceptApplication";
import Tabs from "@/components/ui/tabs";
import { realTimeDataBase } from "@/firebaseConfig";
import { ref, remove } from "firebase/database";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ReferralData from "@/components/ReferalData/ReferralData";
import Loader from "@/components/ui/loading";
import CheckboxGroup from "@/components/admin/AddVideos";
import { alertInput } from "@/constants/alertInput";

function page() {
  const params = useParams();
  const [showLoading, setShowLoading] = useState(false);
  const [disable, setDisable] = React.useState(false);
  const [checkedCount, setCheckedCount] = useState([]);
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
        console.log("Text:", {text, tabSwitch});
       
        {tabSwitch === 1 ? setData(text) : tabSwitch === 2 ? setData(text.data) : tabSwitch === 3 ? setData(text.data) : setData(text.data)}
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [tabSwitch]);


  const handleAccept = async (doc, id, typos, videoT) => {
    setDisable(true);
    setShowLoading(true);
    const videoType = videoT ? videoT : null;
    const type = typos ? typos : "application";
    try {
      toast.loading("Accepting Application so please don't Refresh The Page and please wait for while...");
      const res = await fetch(`/api/adminRoute`, {
        // Removed dynamic ID from URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, type, ...doc, videoType }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if(type === "application"){
        setData((prevData) =>
          Array.isArray(prevData)
            ? prevData.filter((item) => item.id !== id)
            : []
        );
      }
        toast.dismiss();
        toast.success("Application Accepted");
        setShowLoading(false);
       
    } catch (error) {
      toast.dismiss();
      setShowLoading(false);

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



  const handlePlaylist = async (videoData) => {
    const type = await alertInput("Enter Playlist Name", "text", "Create Playlist");
    if (type === "cancel") return;

    handleAccept(videoData, checkedCount, "playlist", type);
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <Tabs setTabSwitch={setTabSwitch} />
        </div>
        <div className="flex w-full "></div>
      </div>

      {!showLoading ? tabSwitch === 1 ? (
        <AcceptApplication
          disable={disable}
          data={data}
          handleAccept={handleAccept}
          handleReject={handleReject}
        />
      ) : tabSwitch === 2 ? (
 
            <ReferralData data={data} />

      ) : tabSwitch === 3 ? (
        <div><CheckboxGroup data={data} tabSwitch={tabSwitch} setTabSwitch={setTabSwitch} checkedCount={checkedCount} setCheckedCount={setCheckedCount}/></div>
      ) : tabSwitch === 4 && (
        <div>
          <CheckboxGroup data={data} checkedCount={checkedCount}  handlePlaylist={handlePlaylist}/>
        </div>
      ) : (
        <Loader/>
      )}
    </>
  );
}

export default page;















