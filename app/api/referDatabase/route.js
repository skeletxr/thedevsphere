// filepath: /c:/web devlopment/Next.js/Project/TheDevSphere/app/api/referDatabase/route.js
 
import { realTimeDataBase } from "@/firebaseConfig";
import { set, ref } from "firebase/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const userId = formData.get('userId');
    const referCode = formData.get('referCode');
    const email = formData.get('email');
    const name = formData.get('name');

    console.log('req', { userId, referCode, email, name });

    await set(ref(realTimeDataBase, 'users/' + userId), {
      referCode,
      email,
      name,
    });

    console.log('Data updated successfully');
    return NextResponse.json({ status: 200, body: "Data updated successfully" });
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json({ status: 500, body: "Error updating data" });
  }
}