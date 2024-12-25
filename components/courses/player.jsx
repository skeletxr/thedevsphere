import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import CryptoJS from "crypto-js";

const HLSPlayer = ({ showVideo }) => {
  const videoRef = useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoSource, setVideoSource] = useState(""); // Store the video source URL
  const [videoId, setVideoId] = useState(null); // Track the current video ID to avoid redundant requests

  useEffect(() => {
    // Skip fetching if the video ID is the same as the previous one
    if (showVideo === videoId) return;

    const fetchVideoSource = async () => {
      setVideoId(showVideo); // Set the current video ID
      const secretKey = process.env.NEXT_PUBLIC_SECRETKEYVIDEO;
      if (!secretKey) {
        console.error("Secret key for encryption is not defined.");
        return;
      }

      const encryptedId = CryptoJS.AES.encrypt(showVideo, secretKey).toString();
      console.log("Encrypted Video ID:", encryptedId);

      try {
        const response = await fetch("/api/streaming", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "video", id: encryptedId }),
        });

        if (!response.ok) {
          console.error("Failed to fetch video source:", response.status);
          return;
        }

        const data = await response.text(); // Assuming the .m3u8 content is returned as text
        console.log("Video source fetched:", data);
        setVideoSource(data); // Set the video source content (m3u8 content)

      } catch (error) {
        console.error("Failed to fetch video source:", error);
      }
    };

    fetchVideoSource();
  }, [showVideo, videoId]); // Dependency array includes videoId to avoid fetching same video repeatedly

  const initializeVideoStream = () => {
    const videoElement = videoRef.current;

    if (Hls.isSupported() && videoSource) {
      const hls = new Hls({ debug: true });
      hls.loadSource(videoSource);
      hls.attachMedia(videoElement);

      hls.on(Hls.Events.MANIFEST_PARSED, () => setIsLoading(false));
      hls.on(Hls.Events.ERROR, (event, data) => console.error("HLS.js error:", data));

      window.hls = hls;
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl") && videoSource) {
      videoElement.src = videoSource;
    } else {
      console.error("HLS is not supported in this browser.");
    }
  };

  const handleStart = () => {
    if (!isStarted) {
      setIsStarted(true);
      setIsLoading(true);
      initializeVideoStream();
    }

    videoRef.current.onloadeddata = () => {
      videoRef.current.play().catch((error) => console.error("Video playback failed:", error));
    };
  };

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
      className="flex justify-center items-center min-h-screen bg-gray-100"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <div
        className="bg-white shadow-lg rounded-lg p-6"
        style={{ maxWidth: "800px", width: "100%", textAlign: "center" }}
      >
        <video
          ref={videoRef}
          controls
          crossOrigin="anonymous"
          playsInline
          poster="https://bitdash-a.akamaihd.net/content/sintel/poster.png"
          className="w-full max-w-[700px] rounded-lg"
        ></video>

        {!isStarted && (
          <button
            onClick={handleStart}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition"
            disabled={isLoading || !videoSource} // Disable the button until the video source is loaded
          >
            {isLoading ? "Loading..." : "Start Video"}
          </button>
        )}
      </div>
    </div>
  );
};

export default HLSPlayer;






