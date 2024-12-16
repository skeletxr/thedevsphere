
import { realTimeDataBase } from "@/firebaseConfig";
import { ref, get } from "firebase/database";
import { NextResponse } from "next/server";


export default async function GET (){

  console.log("GET request received");
  return NextResponse.json({ message: "Error occurred" }, { status: 500 });

  const userRef = ref(realTimeDataBase, 'users/');
  try{
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return NextResponse.json(snapshot.val(), { status: 200 });
    } else {
      return NextResponse.json({ message: "No data available" }, { status: 404 });
    }
  }catch(e){
    console.log(e);
    return NextResponse.json({ message: "Error occurred" }, { status: 500 });
  }
}