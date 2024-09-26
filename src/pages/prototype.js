import { useState, useEffect, useRef } from "react";
import VideoUpload from "../component/videoUpload";
import VideoPlayer from "../component/videoPlayer";

const Prototype = () => {
  const [videoSrc, setVideoSrc] = useState(null); // Uploaded video URL
  const [segmentationResponse, setSegmentationResponse] = useState(null); // SAM-2 API response
  const [getRequestData, setGetRequestData] = useState(null); // Store the GET request response data
  const [pollingActive, setPollingActive] = useState(false); // New state to track if polling is active
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Called when a video is selected from VideoUpload
  const handleVideoSelect = (videoUrl) => setVideoSrc(videoUrl);

  // Called when a valid response is received from ObjectSelector
  const handleSegmentationResponse = (response) => {
    setSegmentationResponse(response); // Store SAM-2 API response
  };

  // Function to send the "Get" API request
  const handleGetRequest = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/get-segmentation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ getUrl: segmentationResponse.urls.get }), // Send the get URL to the backend
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Get Request Data from Server:", data);
      setGetRequestData(data); // Store the response data in the state
    } catch (error) {
      console.error("Error in Get Request:", error);
    }
  };

  // useEffect hook to start polling every 3 seconds after the button is clicked
  useEffect(() => {
    if (pollingActive && segmentationResponse) {
      const intervalId = setInterval(() => {
        handleGetRequest();
      }, 3000); // Run every 3 seconds

      if (
        getRequestData?.status === "succeeded" ||
        getRequestData?.status === "failed"
      ) {
        clearInterval(intervalId); // Stop the interval once status is "succeeded"
        setPollingActive(false); // Optionally disable polling state
      }

      // Clean up the interval when the component is unmounted or when polling is disabled
      return () => clearInterval(intervalId);
    }
  }, [pollingActive, segmentationResponse, getRequestData]);

  // Function to handle the click event on the "Get" button
  const startPolling = () => {
    setPollingActive(true); // Enable polling after button click
  };

  const logContainerRef = useRef(null);

  // Scroll to the bottom when getRequestData.logs updates
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [getRequestData]); // Trigger the effect every time getRequestData changes

  return (
    <div className="relative w-full p-12 flex flex-col space-y-12 md:space-y-0 md:flex-row justify-between">
      <div className="w-[48%]">
        {/* Upload video component */}
        <VideoUpload onVideoSelect={handleVideoSelect} />
        {/* If the video URL exists, render the video player */}
        {videoSrc && (
          <VideoPlayer
            onSegmentationResponse={handleSegmentationResponse}
            videoSrc={videoSrc}
          />
        )}
        {segmentationResponse && (
          <div className="w-[250px] grid grid-cols-2 gap-5 mt-6">
            <a
              href={segmentationResponse.urls.cancel} // Cancel URL from the response
              className="py-3 px-5 bg-red-500 rounded-lg text-center"
            >
              Cancel
            </a>
            <button
              onClick={startPolling} // Trigger polling when clicked
              className="py-3 px-5 bg-blue-500 rounded-lg text-center"
            >
              Get
            </button>
          </div>
        )}

        {getRequestData && (
          <>
            <p className>{getRequestData.status}</p>
            <div>
              {getRequestData && (
                <div
                  className="w-full h-[300px] p-4 text-sm overflow-y-auto bg-black text-white font-mono"
                  ref={logContainerRef}
                >
                  {/* Convert \n to <br /> for line breaks */}
                  {getRequestData.logs.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="w-[48%]">
        {getRequestData?.output?.[0] && (
          <video className="w-full" controls>
            <source src={getRequestData.output[0]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default Prototype;
