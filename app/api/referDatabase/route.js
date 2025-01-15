import { realTimeDataBase } from "@/firebaseConfig";
import { set, ref } from "firebase/database";
import { NextResponse } from "next/server";
import { auth } from "@/firebaseConfig";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId");
    const referCode = formData.get("referCode");
    const email = formData.get("email");
    const name = formData.get("name");

    //console.log("Request data:", { userId, referCode, email, name });

    // Update the user's data in the 'user/$uid' path
    await set(ref(realTimeDataBase, `users/${userId}`), {
      userId,
      referCode,
      email,
      name,
    });

    //console.log("Data updated successfully");
    return NextResponse.json({
      status: 200,
      body: "Data updated successfully",
    });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({
      status: 500,
      body: "Error updating data",
    });
  }
}
