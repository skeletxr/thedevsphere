import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import { fetchFileContents, listAllFolders, streamTsFile } from "../adminRoute/VideoStreamingLogic";

// This variable holds the list of files, assuming it’s fetched from Google Drive or other storage.
let files = [];

export async function POST(req) {
    const body = await req.json();
    const { type, id: encryptedVideoId } = body;

    const secretKey = process.env.NEXT_PUBLIC_SECRETKEYVIDEO;
    const bytes = CryptoJS.AES.decrypt(encryptedVideoId, secretKey);
    const decryptedVideoId = bytes.toString(CryptoJS.enc.Utf8);

    try {
        // List all files in the folder for the given video ID
        files = await listAllFolders(decryptedVideoId);
        console.log("files", files);

        if (files.length === 0) {
            return NextResponse.json({ message: "No files found in the folder." }, { status: 404 });
        }

        // Locate the .m3u8 file in the folder
        const m3u8File = files.find((file) => file.name.endsWith(".m3u8"));
        if (!m3u8File) {
            return NextResponse.json({ message: "No .m3u8 file found in the folder." }, { status: 404 });
        }

        // Fetch the contents of the .m3u8 file
        const m3u8Content = await fetchFileContents(m3u8File.id);

        // Generate the base URL for segment files and update the .m3u8 content
        const baseUrl = `${process.env.URL}/api/streaming?vId=${decryptedVideoId}&fileId=`;
        const updatedM3u8Content = m3u8Content.replace(/([^\s]+\.ts)/g, (_, segment) => `${baseUrl}${segment}`);

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
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");
    const vId = searchParams.get("vId");

    try {
        // If files for this vId are not available, fetch them from the source (Google Drive or elsewhere)
        if (!files[vId]) {
            // Fetch files for this vId if not already stored
            console.log(`Fetching files for vId: ${vId}`);
            files[vId] = await listAllFolders(vId);  // Assuming listAllFolders(vId) fetches the files for this vId
        }

        // Set CORS headers for streaming
        const headers = new Headers();
        headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins
        headers.set("Cache-Control", "no-cache"); // Disable caching
        headers.set("Accept-Ranges", "bytes"); // Enable byte-range requests for streaming

        // Find the file by matching fileId within the files for this vId
        let file = files[vId].find((file) => file.name === fileId); // Match fileId in the specific vId's files

        if (!file) {
            return NextResponse.json({ message: "File not found" }, { status: 404 });
        }
 
        // Prepare the file object to stream
        const fileToStream = { id: file.id };

        // Stream the `.ts` file from storage (e.g., Google Drive)
        const driveResponse = await streamTsFile(fileToStream);  // Assuming streamTsFile(file) streams the file

        // Return the response with appropriate headers
        return new NextResponse(driveResponse, {
            status: 200,
            headers: {
                ...headers,
                "Content-Type": "video/MP2T", // Content type for video streaming
            },
        });
    } catch (error) {
        console.error("Error streaming .ts file:", error.message);
        return NextResponse.json({ message: "Error streaming the file" }, { status: 500 });
    }
}

















// import { NextResponse } from "next/server";
// import CryptoJS from "crypto-js";
// import { fetchFileContents, listAllFolders, streamTsFile } from "../adminRoute/VideoStreamingLogic";


// let files = [];

// export async function POST(req) {
//     const body = await req.json();
//     const { type, id: encryptedVideoId } = body;
//     console.log("body", body)
//     const secretKey = process.env.NEXT_PUBLIC_SECRETKEYVIDEO;
//     const bytes = CryptoJS.AES.decrypt(encryptedVideoId, secretKey);
//     const decryptedVideoId = bytes.toString(CryptoJS.enc.Utf8);
    
//     try {
//       // List all the files in the folder
//         files = await listAllFolders(decryptedVideoId);
//      console.log("files", files)
//       // Check if there are any files
//       if (files.length === 0) {
//         return NextResponse.json({ message: "No files found in the folder." }, { status: 404 });
//       }
  
//       // Locate the .m3u8 file in the folder
//       const m3u8File = files.find((file) => file.name.endsWith(".m3u8"));
//       console.log("m3u8File", m3u8File)
//       if (!m3u8File) {
//         return NextResponse.json({ message: "No .m3u8 file found in the folder." }, { status: 404 });
//       }
  
//       // Fetch the contents of the .m3u8 file from the storage (e.g., Google Drive)
//       const m3u8Content = await fetchFileContents(m3u8File.id); // Function to fetch file content based on ID
  
//       // Replace relative segment URLs with absolute URLs
//       // const baseUrl = `/api/streaming?fileId=`; // Base URL for segment files
//       // const updatedM3u8Content = m3u8Content.replace(/([^\s]+\.ts)/g, `${baseUrl}/$1`);

//       const baseUrl = `${process.env.URL}/api/streaming?vId=${decryptedVideoId}&fileId=`;

// const updatedM3u8Content = m3u8Content.replace(/([^\s]+\.ts)/g, (_, segment) => `${baseUrl}${segment}`);

//       console.log("updatedM3u8Content", updatedM3u8Content);
//       return new NextResponse(updatedM3u8Content, {
//         status: 200,
//         headers: {
//           "Content-Type": "application/vnd.apple.mpegurl",
//         },
//       });
//     } catch (error) {
//       console.error("Error serving .m3u8 file:", error.message);
//       return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     }

// }


// // import { NextResponse } from 'next/server';
// // import { listAllFolders, streamTsFile, authorize } from 'path-to-your-utils'; // Import required functions

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const fileId = searchParams.get('fileId');
//   const vId = searchParams.get('vId');
//    files = []; // Ensure `files` is defined

//   try {
//     // If files are empty, fetch them from the source (Google Drive or elsewhere)
//     if (files.length === 0) {
//       files = await listAllFolders(vId);
//     }

//     // Set CORS headers
//     const headers = new Headers();
//     headers.set('Access-Control-Allow-Origin', '*'); // CORS Header for any domain
//     headers.set('Cache-Control', 'no-cache');
//     headers.set('Accept-Ranges', 'bytes');  // Optional: useful for video streaming

//     let id;
//     if (fileId) {
//       // console.log('files', { files, fileId });

//       // Find the file by matching name
//       const file = files.find((file) => file.name === fileId); // Match directly without appending `.ts`
//       if (file) {
//         id = file.id;
//       }
//     }

//     // If fileId doesn't match any file
//     if (!id) {
//       return NextResponse.json({ message: 'File not found' }, { status: 404 });
//     }

//     // Prepare the file object
//     const file = { id: id };

//     // Stream the `.ts` file from Google Drive
//     const driveResponse = await streamTsFile(file);
 
//     // Return the response with appropriate headers
//     return new NextResponse(driveResponse, {
//       status: 200,
//       headers: {
//         ...headers,
//         'Content-Type': 'video/MP2T', // Content type for video streaming
//       },
//     });
//   } catch (error) {
//     console.error('Error streaming .ts file:', error.message);
//     return NextResponse.json({ message: 'Error streaming the file' }, { status: 500 });
//   }
// }






// // export async function GET(req) {
// //   // console.log("req", req)
// //     const { searchParams } = new URL(req.url);
// //     const fileId = searchParams.get("fileId");
// //     const vId = searchParams.get("vId");
// //     console.log("files", files) 

// //     try {
// //       if(files.length === 0) { 
// //         files = await listAllFolders(vId); 
        
// //       }

// //       // Set CORS headers
// //       const headers = new Headers();
       
  
// //       let id; 
// //       if (fileId) {
// //       console.log("files", {files, fileId})

// //         // const files = await listAllFolders(); // Fetch the list of files
// //         const file = files.find((file) => file.name === fileId); // Match directly without appending `.ts`
// //         if (file) {
// //           id = file.id;
// //         }
// //       }
// //       // console.log("Available files:", files);



// //       console.log("id", id); 
  
// //       if (!id) {
// //         return NextResponse.json({ message: "File not found" }, { status: 404 });
// //       }
  
// //       const file = { id: id }; // Replace with the correct logic to fetch the file
// //       const response = await streamTsFile(file); // Stream the `.ts` file from Google Drive
   
// //       return new NextResponse(response.body, {
// //         status: 200,
// //         headers: {
// //           ...headers,
// //           "Content-Type": "video/MP2T",
// //         },
// //       });
// //     } catch (error) {
// //       console.error("Error streaming .ts file:", error.message);
// //       return NextResponse.json({ message: "Error streaming the file" }, { status: 500 });
// //     }
// // }