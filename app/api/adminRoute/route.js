// "use client";

import { realTimeDataBase, db } from "@/firebaseConfig";
import { ref, get } from "firebase/database";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const { id, ...doc } = body; // Extract ID and document data

    if (!id) {
      return NextResponse.json({ message: " ID is required" }, { status: 400 });
    }

    
    const userCollectionRef = collection(db, "users");
    console.log(userCollectionRef);
    // const q = query(userCollectionRef, where("referId", "==", referId));
    // const querySnapshot = await getDocs(q);


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

// export async function POST(req) {
//   try {
//     const body = await req.json(); // Parse the request body
//     const { referId, ...docData } = body; // Extract referId and document data

//     if (!referId) {
//       return NextResponse.json({ message: "Refer ID is required" }, { status: 400 });
//     }

//     const userCollectionRef = collection(db, "users");
//     const q = query(userCollectionRef, where("referId", "==", referId));
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     const userDocRef = querySnapshot.docs[0].ref;

//     // Update the user data
//     await updateDoc(userDocRef, docData);

//     return NextResponse.json({ message: "Data updated successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Error updating data:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

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
