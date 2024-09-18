import { useState } from "react";
import VideoUpload from "../component/videoUpload";
import VideoPlayer from "../component/videoPlayer";
import CanvasFrame from "../component/canvaFrame";
import ObjectSelector from "../component/objectSelector";

const Prototype = () => {
  const [videoSrc, setVideoSrc] = useState(null); // Uploaded video URL
  const [pausedFrame, setPausedFrame] = useState(null); // Paused video frame details
  const [canvasRef, setCanvasRef] = useState(null); // Canvas reference

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

  return (
    <div className="relative w-full p-12 flex flex-col space-y-12 md:space-y-0 md:flex-row space-x-16">
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
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Prototype;
