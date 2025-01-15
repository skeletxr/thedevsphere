import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import CryptoJS from "crypto-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayerCard from "./playerCard";

const HLSPlayer = ({
  showVideo,
  courseData,
  setShowVideo,
  handleSubCourseField,
  subCourseData,
}) => {
  //console.log("subCourseData", subCourseData.data)
  const videoRef = useRef(null);
  const [videoSource, setVideoSource] = useState(""); // Store the video source URL
  const [videoId, setVideoId] = useState(null); // Track the current video ID to avoid redundant requests

  useEffect(() => {
    // Skip fetching if the video ID is the same as the previous one
    if (showVideo === videoId || showVideo == true) return;

    const fetchVideoSource = async () => {
      setVideoId(showVideo); // Set the current video ID
      const secretKey = process.env.NEXT_PUBLIC_SECRETKEYVIDEO;
      if (!secretKey) {
        console.error("Secret key for encryption is not defined.");
        return;
      }

      const encryptedId = CryptoJS.AES.encrypt(showVideo, secretKey).toString();

      const toastId = toast.loading("Loading video..."); // Show loading toast

      try {
        const response = await fetch("/api/streaming", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "video", id: encryptedId }),
        });

        if (!response.ok) {
          console.error("Failed to fetch video source:", response.status);
          toast.update(toastId, {
            render: "Failed to load video.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          return;
        }

        const data = await response.text(); // Assuming the .m3u8 content is returned as text
        setVideoSource(data); // Set the video source content (m3u8 content)
        toast.update(toastId, {
          render: "Video loaded successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (error) {
        console.error("Failed to fetch video source:", error);
        toast.update(toastId, {
          render: "Error loading video.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    };

    fetchVideoSource();
  }, [showVideo, videoId]); // Dependency array includes videoId to avoid fetching the same video repeatedly

  useEffect(() => {
    const initializeVideoStream = () => {
      const videoElement = videoRef.current;

      if (Hls.isSupported() && videoSource) {
        // Create a Blob from the raw .m3u8 manifest data
        const blob = new Blob([videoSource], {
          type: "application/vnd.apple.mpegurl",
        });
        const blobUrl = URL.createObjectURL(blob); // Generate the Blob URL
        //console.log("Blob URL:", blobUrl); // Debug: log the generated Blob URL

        const hls = new Hls({ debug: true });
        hls.loadSource(blobUrl); // Use the Blob URL instead of raw videoSource
        hls.attachMedia(videoElement);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          //console.log("Manifest parsed successfully");
          videoElement.play(); // Automatically play the video
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("HLS.js error:", data);
        });

        window.hls = hls;

        // Clean up Blob URL when the HLS instance is destroyed
        hls.on(Hls.Events.DESTROYING, () => {
          URL.revokeObjectURL(blobUrl);
        });
      } else if (
        videoElement.canPlayType("application/vnd.apple.mpegurl") &&
        videoSource
      ) {
        // Fallback for native HLS support
        const blob = new Blob([videoSource], {
          type: "application/vnd.apple.mpegurl",
        });
        const blobUrl = URL.createObjectURL(blob);

        videoElement.src = blobUrl;
        videoElement.play(); // Automatically play the video

        videoElement.onended = () => {
          URL.revokeObjectURL(blobUrl); // Clean up Blob URL after playback
        };
      } else {
        console.error("HLS is not supported in this browser.");
      }
    };

    if (videoSource) {
      initializeVideoStream();
    }
  }, [videoSource]); // Reinitialize video stream when videoSource changes

  // Cleanup HLS.js instance on unmount
  useEffect(() => {
    return () => {
      if (window.hls) {
        window.hls.destroy();
      }
    };
  }, []);

  return (
    <div
      className="flex justify-center  items-center md:my-auto bg-black"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <div className="flex justify-center items-center  flex-col">
        <div
          className="bg-white shadow-lg rounded-lg "
          // style={{ maxWidth: "800px", width: "100%", textAlign: "center" }}
        >
          <video
            ref={videoRef}
            controls
            crossOrigin="anonymous"
            playsInline
            poster="https://bitdash-a.akamaihd.net/content/sintel/poster.png"
            className="w-full max-w-[1100px] min-w-[70vw]  rounded-lg"
          ></video>
        </div>

        <ToastContainer />
        <div className="md:hidden :pt-6 sm:block overflow-y-scroll">
          <PlayerCard
            subCourseData={subCourseData}
            courseData={courseData}
            handleSubCourseField={handleSubCourseField}
            setShowVideo={setShowVideo}
          />
        </div>
      </div>
    </div>
  );
};

export default HLSPlayer;

// import React, { useEffect, useRef, useState } from "react";
// import Hls from "hls.js";
// import CryptoJS from "crypto-js";

// const HLSPlayer = ({ showVideo }) => {
//   const videoRef = useRef(null);
//   const [isStarted, setIsStarted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [videoSource, setVideoSource] = useState(""); // Store the video source URL
//   const [videoId, setVideoId] = useState(null); // Track the current video ID to avoid redundant requests

//   useEffect(() => {
//     // Skip fetching if the video ID is the same as the previous one
//     if (showVideo === videoId) return;

//     const fetchVideoSource = async () => {
//       setVideoId(showVideo); // Set the current video ID
//       const secretKey = process.env.NEXT_PUBLIC_SECRETKEYVIDEO;
//       if (!secretKey) {
//         console.error("Secret key for encryption is not defined.");
//         return;
//       }

//       const encryptedId = CryptoJS.AES.encrypt(showVideo, secretKey).toString();
//       //console.log("Encrypted Video ID:", encryptedId);

//       try {
//         const response = await fetch("/api/streaming", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ type: "video", id: encryptedId }),
//         });

//         if (!response.ok) {
//           console.error("Failed to fetch video source:", response.status);
//           return;
//         }
//        //console.log("response", response)

//         const data = await response.text(); // Assuming the .m3u8 content is returned as text

//         setVideoSource(data); // Set the video source content (m3u8 content)

//       } catch (error) {

//         // console.error("Failed to fetch video source:", error);
//       }
//     };

//     fetchVideoSource();
//     initializeVideoStream()
//   }, [showVideo, videoId]); // Dependency array includes videoId to avoid fetching same video repeatedly
//   const initializeVideoStream = () => {
//     const videoElement = videoRef.current;

//     if (Hls.isSupported() && videoSource) {
//       // Create a Blob from the raw .m3u8 manifest data
//       const blob = new Blob([videoSource], { type: "application/vnd.apple.mpegurl" });
//       const blobUrl = URL.createObjectURL(blob); // Generate the Blob URL
//       //console.log("Blob URL:", blobUrl); // Debug: log the generated Blob URL

//       const hls = new Hls({ debug: true });
//       hls.loadSource(blobUrl); // Use the Blob URL instead of raw videoSource
//       hls.attachMedia(videoElement);

//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         //console.log("Manifest parsed successfully");
//         setIsLoading(false);
//       });

//       hls.on(Hls.Events.ERROR, (event, data) => {
//         // console.error("HLS.js error:", data);
//       });

//       window.hls = hls;

//       // Clean up Blob URL when the HLS instance is destroyed
//       hls.on(Hls.Events.DESTROYING, () => {
//         URL.revokeObjectURL(blobUrl);
//       });
//     } else if (videoElement.canPlayType("application/vnd.apple.mpegurl") && videoSource) {
//       // Fallback for native HLS support
//       const blob = new Blob([videoSource], { type: "application/vnd.apple.mpegurl" });
//       const blobUrl = URL.createObjectURL(blob);

//       videoElement.src = blobUrl;

//       videoElement.onended = () => {
//         URL.revokeObjectURL(blobUrl); // Clean up Blob URL after playback
//       };
//     } else {
//       console.error("HLS is not supported in this browser.");
//     }
//   };

//   // Cleanup HLS.js instance on unmount
//   useEffect(() => {
//     return () => {
//       if (window.hls) {
//         window.hls.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div
//       className="flex justify-center items-center min-h-screen bg-gray-100"
//       style={{ fontFamily: "Arial, sans-serif" }}
//     >
//       <div
//         className="bg-white shadow-lg rounded-lg p-6"
//         style={{ maxWidth: "800px", width: "100%", textAlign: "center" }}
//       >
//         <video
//           ref={videoRef}
//           controls
//           crossOrigin="anonymous"
//           playsInline
//           poster="https://bitdash-a.akamaihd.net/content/sintel/poster.png"
//           className="w-full max-w-[700px] rounded-lg"
//         ></video>

//         {!isStarted && (
//           <button
//             onClick={initializeVideoStream}
//             className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition"
//             disabled={isLoading || !videoSource} // Disable the button until the video source is loaded
//           >
//             {isLoading ? "Loading..." : "Start Video"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HLSPlayer;
