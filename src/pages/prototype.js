import { useState } from "react";
import VideoUpload from "../component/videoUpload";
import VideoPlayer from "../component/videoPlayer";
import CanvasFrame from "../component/canvaFrame";
import ObjectSelector from "../component/objectSelector";

const Prototype = () => {
  const [videoSrc, setVideoSrc] = useState(null); // Uploaded video URL
  const [pausedFrame, setPausedFrame] = useState(null); // Paused video frame details
  const [canvasRef, setCanvasRef] = useState(null); // Canvas reference
  const [segmentationResponse, setSegmentationResponse] = useState(null); // SAM-2 API response

  // Called when a video is selected from VideoUpload
  const handleVideoSelect = (videoUrl) => setVideoSrc(videoUrl);

  // Called when the video is paused to extract the frame
  const handlePauseFrame = (time, width, height) => {
    setPausedFrame({ time, width, height }); // Save paused frame details
  };

  // Called when the canvas is ready after the frame is extracted
  const handleFrameExtracted = (ref) => {
    setCanvasRef(ref); // Save the reference of the extracted frame canvas
  };

  // Called when a valid response is received from ObjectSelector
  const handleSegmentationResponse = (response) => {
    setSegmentationResponse(response); // Store SAM-2 API response
  };

  // Function to send the "Get" API request
  const handleGetRequest = async () => {
    try {
      const response = await fetch(segmentationResponse.urls.get, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Get Request Data:", data);
      // Handle the response data, e.g., display the result or trigger a download
    } catch (error) {
      console.error("Error in Get Request:", error);
    }
  };

  return (
    <div className="relative w-full p-12 flex flex-col space-y-12 md:space-y-0 md:flex-row md:space-x-16">
      {/* Upload video component */}
      <VideoUpload onVideoSelect={handleVideoSelect} />

      <div>
        {/* If the video URL exists, render the video player */}
        {videoSrc && (
          <VideoPlayer videoSrc={videoSrc} onPauseFrame={handlePauseFrame} />
        )}

        {/* If a frame is paused, render the canvas for that frame */}
        {pausedFrame && (
          <div className="relative mt-12">
            {/* Canvas for displaying the paused video frame */}
            <CanvasFrame
              videoSrc={videoSrc}
              time={pausedFrame.time}
              videoWidth={600}
              videoHeight={300}
              onFrameExtracted={handleFrameExtracted} // Extract the canvas reference
            />

            {/* If canvas is ready, allow drawing bounding boxes with ObjectSelector */}
            {canvasRef && (
              <ObjectSelector
                videoWidth={600}
                videoHeight={300}
                videoSrc={videoSrc}
                canvasRef={canvasRef} // Pass the canvas reference for drawing bounding box
                onSegmentationResponse={handleSegmentationResponse} // Pass the segmentation response handler
              />
            )}

            {/* Show buttons only if a valid segmentation response exists */}
            {segmentationResponse && (
              <div className="w-[250px] grid grid-cols-2 gap-5 mt-6">
                <a
                  href={segmentationResponse.urls.cancel} // Cancel URL from the response
                  className="py-3 px-5 bg-red-500 rounded-lg text-center"
                >
                  Cancel
                </a>
                <button
                  onClick={handleGetRequest} // Use onClick for making API requests
                  className="py-3 px-5 bg-blue-500 rounded-lg text-center"
                >
                  Get
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Prototype;
