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

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const { id, ...doc } = body; // Extract ID and document data
console.log("body", doc)
    if (!id) {
      return NextResponse.json({ message: " ID is required" }, { status: 400 });
    }
 
   const userCollectionRef = collection(db, "users");
   

 
   const q = query(userCollectionRef, where("referId", "==", doc.referCode));
// Debugging: Log the query

    const querySnapshot = await getDocs(q);
    const userDocRef = querySnapshot.docs[0].ref;
    

    const userDoc = await getDoc(userDocRef);
    const currenttotalAmountRemainingFromReferral = userDoc.data().totalAmountRemainingFromReferral || 0;

    await updateDoc(userDocRef, {
      referUser: arrayUnion(id),
      totalAmountRemainingFromReferral: currenttotalAmountRemainingFromReferral + 2000,
    });

    const userUpdateRef = firestoreDoc(db, "users", id);
    await updateDoc(userUpdateRef, {
      ReferedBy: userDoc.data().email,
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
}


export async function GET() {
  console.log("GET request received");

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
}























// export async function POST(req) {
//   try {
//     const body = await req.json(); // Parse the request body
//     const { id, ...doc } = body; // Extract ID and document data
//     console.log("Request Body:", doc);

//     // Check if the ID and referCode are provided in the request
//     if (!id || !doc.referCode) {
//       return NextResponse.json(
//         { message: "ID and referCode are required" },
//         { status: 400 }
//       );
//     }

//     // Reference the users collection and create the query
//     const userCollectionRef = collection(db, "users");
//     console.log("Querying users collection for referCode:", doc.referCode);
//     const q = query(userCollectionRef, where("referId", "==", doc.referCode));

//     // Execute the query
//     const querySnapshot = await getDocs(q);

//     // Log the query result for debugging
//     console.log("querySnapshot:", querySnapshot);
//     console.log("Number of documents found:", querySnapshot.size);

//     // Check if any documents were found
//     if (querySnapshot.empty) {
//       return NextResponse.json(
//         { message: "No user found with the provided referCode" },
//         { status: 404 }
//       );
//     }

//     // Get the reference of the first matching document
//     const userDocRef = querySnapshot.docs[0].ref;
//     console.log("User Document Reference:", userDocRef);

//     // Fetch the user document to get the current referral balance
//     const userDoc = await getDoc(userDocRef);
//     const currentTotalAmountRemainingFromReferral =
//       userDoc.data().totalAmountRemainingFromReferral || 0;
//     console.log("Current referral balance:", currentTotalAmountRemainingFromReferral);

//     // Update the user's referUser field and totalAmountRemainingFromReferral
//     await updateDoc(userDocRef, {
//       referUser: arrayUnion(id),
//       totalAmountRemainingFromReferral: currentTotalAmountRemainingFromReferral + 2000,
//     });

//     // Return success response
//     return NextResponse.json(
//       { message: "Data saved successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error saving data:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error", error: error.message },
//       { status: 500 }
//     );
//   }
// }