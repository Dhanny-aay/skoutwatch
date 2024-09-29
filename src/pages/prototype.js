import { useState, useEffect, useRef } from "react";
import VideoPlayer from "../component/videoPlayer";
import logs from "./assets/logs.svg";
import down from "./assets/arrow-down.svg";

const Prototype = () => {
  const [videoSrc, setVideoSrc] = useState(null); // Uploaded video URL
  const [segmentationResponse, setSegmentationResponse] = useState(null); // SAM-2 API response
  const [getRequestData, setGetRequestData] = useState(null); // Store the GET request response data
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    // Retrieve the video URL from localStorage
    const videoUrl = localStorage.getItem("uploadedVideoUrl");

    if (videoUrl) {
      // Set the retrieved video URL to the state
      setVideoSrc(videoUrl);
    }
  }, []);

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

  // useEffect hook to start polling every 3 seconds automatically
  useEffect(() => {
    if (segmentationResponse) {
      const intervalId = setInterval(() => {
        handleGetRequest();
      }, 3000); // Poll every 3 seconds

      // If the status is 'succeeded' or 'failed', stop polling
      if (
        getRequestData?.status === "succeeded" ||
        getRequestData?.status === "failed"
      ) {
        clearInterval(intervalId);
      }

      // Clean up the interval when the component unmounts or when polling stops
      return () => clearInterval(intervalId);
    }
  }, [segmentationResponse, getRequestData]);

  const logContainerRef = useRef(null);

  // Scroll to the bottom when getRequestData.logs updates
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [getRequestData]); // Trigger the effect every time getRequestData changes

  // Utility function to determine styles based on status
  const getStatusStyles = (status) => {
    switch (status) {
      case "starting":
        return { bgColor: "#7F8C8D1a", textColor: "#7F8C8D" }; // Example colors
      case "processing":
        return { bgColor: "#FFC1071a", textColor: "#FFC107" }; // Example colors
      case "succeeded":
        return { bgColor: "#17BD8D1a", textColor: "#17BD8D" };
      case "failed":
        return { bgColor: "#DC35451a", textColor: "#DC3545" };
      default:
        return { bgColor: "#7F8C8D1a", textColor: "#7F8C8D" }; // Default case
    }
  };

  // Use the utility function for status styles
  const statusStyles = getStatusStyles(getRequestData?.status);

  const [logsVisible, setLogsVisible] = useState(true); // State to track if logs are visible

  // Function to toggle logs visibility
  const toggleLogsVisibility = () => {
    setLogsVisible((prev) => !prev);
  };

  return (
    <div className="relative w-full  mt-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="w-full">
        {/* If the video URL exists, render the video player */}
        <p className=" font-semibold font-Inter text-base text-black">Video</p>
        {videoSrc && (
          <VideoPlayer
            onSegmentationResponse={handleSegmentationResponse}
            videoSrc={videoSrc}
          />
        )}

        {getRequestData && (
          <>
            <p className>{getRequestData.status}</p>
            <div>
              {getRequestData && (
                <div
                  className="w-full h-[300px] p-4 text-sm overflow-y-auto bg-black font-mono"
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

      <div className="w-full">
        <div className="flex items-center justify-between">
          <p className="font-semibold font-Inter text-base text-black">
            Output
          </p>
          {getRequestData && (
            <span className="flex items-center space-x-3">
              <p className="text-black text-base font-medium font-Inter">
                Status:
              </p>
              <p
                className="py-2 px-[10px] font-LatoNormal font-normal text-sm rounded-[20px] capitalize"
                style={{
                  backgroundColor: statusStyles.bgColor,
                  color: statusStyles.textColor,
                }}
              >
                {getRequestData.status}
              </p>
            </span>
          )}
        </div>

        {/* Check if getRequestData exists */}
        {!getRequestData ? (
          <div className="w-full h-[95%] rounded-[15px] mt-2 bg-[#EAEBF0] flex items-center justify-center flex-col">
            <img src={logs} alt="" />
            <p className="font-LatoBold font-bold text-2xl text-[#272D37] mt-6">
              No Processing Activity Yet..
            </p>
            <p className="font-Lato font-normal text-base text-[#5F6D7E] max-w-[350px] text-center mt-2">
              Choose an object to track and select a mask type to proceed. Once
              your video starts processing, you’ll see the progress activity
              here.
            </p>
          </div>
        ) : (
          <>
            {/* If getRequestData.output exists, show video */}
            {getRequestData.output?.[0] && (
              <video className="w-full mt-2 rounded-[10px]" controls>
                <source src={getRequestData.output[0]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {/* Show the processing logs */}
            <div>
              <div
                className="w-full h-[300px] p-4 text-sm overflow-y-auto bg-[#EAEBF0] text-[#000000B2] rounded-[15px] font-mono mt-6"
                ref={logContainerRef}
              >
                <div className="w-full h-full relative">
                  <p className="absolute top-0 left-0 text-xs font-semibold font-Inter text-black">
                    Processing Logs
                  </p>
                  <button
                    onClick={toggleLogsVisibility} // Toggle logs on button click
                    className="absolute top-0 right-0 border border-[#EBF4EF] py-2 px-3 bg-[#FFFFFF] rounded-[8px] flex items-center space-x-2"
                  >
                    <p className="font-LatoNormal font-normal text-sm text-[#121212]">
                      {logsVisible ? "Hide log" : "Show log"}
                    </p>
                    <img
                      src={down}
                      alt=""
                      className={`transform transition-transform duration-300 ${
                        logsVisible ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  </button>
                  <div
                    className={`absolute w-full top-10 left-0 overflow-hidden transition-max-height duration-500 ease-in-out ${
                      logsVisible ? "max-h-[300px]" : "max-h-0"
                    }`}
                  >
                    {getRequestData.logs.split("\n").map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Prototype;
