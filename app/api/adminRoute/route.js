// import { NextResponse } from "next/server";

// export async function GET() {
//   return NextResponse.json({ message: "API is working!" }, { status: 200 });
// }









import { realTimeDataBase } from "@/firebaseConfig";
import { ref, get } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("GET request received");

  const userRef = ref(realTimeDataBase, "users/");
  try {
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return NextResponse.json(snapshot.val(), { status: 200 });
    } else {
      return NextResponse.json({ message: "No data available" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}