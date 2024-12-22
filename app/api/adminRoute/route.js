// "use client";

import { realTimeDataBase, db } from "@/firebaseConfig";
import { ref, get, remove } from "firebase/database";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  arrayUnion,
  getDoc,
  doc as firestoreDoc,
} from "firebase/firestore";

import { NextResponse } from "next/server";
import { listAllFolders } from "./VideoStreamingLogic";

export async function POST(req) {
  const body = await req.json(); 
  const {type} = body;
  if(type === "application") {
    

  try {
    // Parse the request body
    const { id, ...doc } = body; // Extract ID and document data
    if (!doc || !id) {
      return NextResponse.json(
        { message: "Data Not available" },
        { status: 400 }
      );
    }
    console.log("body", doc);
    if (!id) {
      return NextResponse.json({ message: " ID is required" }, { status: 400 });
    }

    let userDoc = null;




    if (doc.referCode && doc.referCode !== "null") {
      console.log("Refer code found in the request body:", doc.referCode);

      const userCollectionRef = collection(db, "users");
      const q = query(userCollectionRef, where("referId", "==", doc.referCode));
      // Debugging: Log the query

      const querySnapshot = await getDocs(q);
      const userDocRef = querySnapshot.docs[0].ref;

      userDoc = await getDoc(userDocRef);
      const currenttotalAmountRemainingFromReferral =
        userDoc.data().totalAmountRemainingFromReferral || 0;

      await updateDoc(userDocRef, {
        referUser: arrayUnion(id),
        totalAmountRemainingFromReferral:
          currenttotalAmountRemainingFromReferral + 2000,
      });
    }





    const userUpdateRef = firestoreDoc(db, "users", id);


  await updateDoc(userUpdateRef, {
    ...(doc.referCode !== "null"
      ? {
          ReferedBy: arrayUnion(
            `Referred by: ${userDoc.data().email} for ${process.env.COURSE1}`
          ),
          OwnedCourses: arrayUnion(process.env.COURSE1),
        }
      : {
          OwnedCourses: arrayUnion(process.env.COURSE1),
        }),
  });

    const deleteRef = ref(realTimeDataBase, `users/${id}`); // Adjust the path based on your database structure
    await remove(deleteRef);

    return NextResponse.json(
      { message: "Data saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}else if(type === "UpdatePaymentInfo"){
  const {  email, amount } = body;
try{
  const userCollectionRef = collection(db, "users");
  const q = query(userCollectionRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const userDocRef = querySnapshot.docs[0].ref;
  const userDoc = await getDoc(userDocRef);
  const currenttotalAmountRemainingFromReferral =
    userDoc.data().totalAmountRemainingFromReferral || 0;
  
    await updateDoc(userDocRef, {
      totalAmountRemainingFromReferral:
        currenttotalAmountRemainingFromReferral - amount,
      totalAmountPaidForReferral: amount,
    });

  return NextResponse.json(
    { message: "Data saved successfully" },
    { status: 200 }
  );
}catch(err){
  console.error("Error saving data:", err);
  return NextResponse.json(
    { message: "Internal Server Error" },
    { status: 500 }
  );
}
}


}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const tab = searchParams.get("tab");

  console.log("Tab:", tab);
  if (tab === "1") {
    const userRef = ref(realTimeDataBase, "users/");
    try {
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        return NextResponse.json(snapshot.val(), { status: 200 });
      } else {
        return NextResponse.json(
          { message: "No data available" },
          { status: 404 }
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else if (tab === "2") {
    const userCollectionRef = collection(db, "users");
    const q = query(
      userCollectionRef,
      where("totalAmountRemainingFromReferral", ">", 0)
    );

    try {
      const querySnapshot = await getDocs(q);
      // console.log("Tab 2 data retrieved", {
      //     size: querySnapshot.size,
      //     empty: querySnapshot.empty,
      //     docs: querySnapshot.docs.map(doc => doc.id),
      //     data: querySnapshot.docs.map(doc => doc.data())
      // });

      if (querySnapshot.empty) {
        return NextResponse.json(
          { message: "No data available at tab 2" },
          { status: 200 }
        );
      }

      const data = querySnapshot.docs.map((doc) => doc.data());
      return NextResponse.json(
        { message: "Data retrieved successfully", data: data },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error retrieving Tab 2 data", error);
      return NextResponse.json(
        { message: "Error retrieving data", error: error.message },
        { status: 500 }
      );
    }
  }else if(tab === "3"){
    const userCollectionRef = collection(db, "users");
    const q = query(
      userCollectionRef,
      where("OwnedCourses", "array-contains", process.env.COURSE1)
    );

    try {
      const querySnapshot = await getDocs(q);
    
      if (querySnapshot.empty) {
        return NextResponse.json(
          { message: "No data available at tab 2" },
          { status: 200 }
        );
      }

      const data = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          email: docData.email,
          name: docData.name
        };
      });
      return NextResponse.json(
        { message: "Data retrieved successfully", data: data },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error retrieving Tab 2 data", error);
      return NextResponse.json(
        { message: "Error retrieving data", error: error.message },
        { status: 500 }
      );
    }
  }else if(tab === "4"){
try{
     const res = await listAllFolders();


  return NextResponse.json(
    { message: "Data for Tab 4", data: res },
    { status: 200 }
  );
} catch(err){
  console.error("Error fetching data:", err);
}
  }

}





  //  const res = await listAllFolders();
  // try{
  //   const fetchData = await fetch(`${process.env.driveFileFetchUrl}/getAllFile`)
  //   const data = await fetchData.json();
  
  //   return NextResponse.json(
  //     { message: "Data for Tab 4", data: data },
  //     { status: 200 }
  //   );
  // } catch(err){
  //   console.error("Error fetching data:", err);
  // }
  //   }
