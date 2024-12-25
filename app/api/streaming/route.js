import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import { fetchFileContents, listAllFolders, streamTsFile } from "../adminRoute/VideoStreamingLogic";


let files = [];

export async function POST(req) {
    const body = await req.json();
    const { type, id: encryptedVideoId } = body;
    console.log("body", body)
    const secretKey = process.env.NEXT_PUBLIC_SECRETKEYVIDEO;
    const bytes = CryptoJS.AES.decrypt(encryptedVideoId, secretKey);
    const decryptedVideoId = bytes.toString(CryptoJS.enc.Utf8);
    
    try {
      // List all the files in the folder
        files = await listAllFolders(decryptedVideoId);
     console.log("files", files)
      // Check if there are any files
      if (files.length === 0) {
        return NextResponse.json({ message: "No files found in the folder." }, { status: 404 });
      }
  
      // Locate the .m3u8 file in the folder
      const m3u8File = files.find((file) => file.name.endsWith(".m3u8"));
      console.log("m3u8File", m3u8File)
      if (!m3u8File) {
        return NextResponse.json({ message: "No .m3u8 file found in the folder." }, { status: 404 });
      }
  
      // Fetch the contents of the .m3u8 file from the storage (e.g., Google Drive)
      const m3u8Content = await fetchFileContents(m3u8File.id); // Function to fetch file content based on ID
  
      // Replace relative segment URLs with absolute URLs
      const baseUrl = `/api/streaming?fileId=`; // Base URL for segment files
      const updatedM3u8Content = m3u8Content.replace(/([^\s]+\.ts)/g, `${baseUrl}/$1`);
      console.log("updatedM3u8Content", updatedM3u8Content);
      return new NextResponse(updatedM3u8Content, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
        },
      });
    } catch (error) {
      console.error("Error serving .m3u8 file:", error.message);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }

}


export async function GET(req) {
  console.log("req", req)
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");
  
    try {
      // Set CORS headers
      const headers = new Headers();
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Access-Control-Allow-Headers", "Content-Type");
      headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  
      let id;
      if (fileId) {
        const files = await listAllFolders(); // Fetch the list of files
        const file = files.find((file) => file.name === `${fileId}.ts`);
        if (file) {
          id = file.id;
        }
      }
      console.log("id", id);
  
      if (!id) {
        return NextResponse.json({ message: "File not found" }, { status: 404 });
      }
  
      const file = { id: id }; // Replace with the correct logic to fetch the file
      const response = await streamTsFile(file); // Stream the `.ts` file from Google Drive
  
      return new NextResponse(response.body, {
        status: 200,
        headers: {
          ...headers,
          "Content-Type": "video/MP2T",
        },
      });
    } catch (error) {
      console.error("Error streaming .ts file:", error.message);
      return NextResponse.json({ message: "Error streaming the file" }, { status: 500 });
    }
}