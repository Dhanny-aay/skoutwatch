// Prototype.js
import { useState } from "react";
import VideoUpload from "../component/videoUpload";
import VideoPlayer from "../component/videoPlayer";
import CanvasFrame from "../component/canvaFrame";
import ObjectSelector from "../component/objectSelector";

const Prototype = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [pausedFrame, setPausedFrame] = useState(null);
  const [extractedFrame, setExtractedFrame] = useState(null); // Store the extracted frame

  const handleVideoSelect = (videoUrl) => setVideoSrc(videoUrl);

  const handlePauseFrame = (time) => {
    setPausedFrame({ time });
  };

  const handleExtractedFrame = (frameBlob) => {
    setExtractedFrame(frameBlob); // Store extracted frame
  };

  return (
    <div className="w-full flex flex-row space-x-16 p-12 justify-start items-start">
      <VideoUpload onVideoSelect={handleVideoSelect} />
      <div>
        {videoSrc && (
          <VideoPlayer videoSrc={videoSrc} onPauseFrame={handlePauseFrame} />
        )}
        {pausedFrame && (
          <div className="relative mt-12">
            {/* Canvas for displaying the video frame */}
            <CanvasFrame
              videoSrc={videoSrc}
              time={pausedFrame.time}
              videoWidth={600}
              videoHeight={300}
              onExtractFrame={handleExtractedFrame} // Extract frame for SAM 2
            />

            {/* Object selector for drawing bounding box */}
            {extractedFrame && (
              <ObjectSelector
                videoWidth={600}
                videoHeight={300}
                extractedFrame={extractedFrame} // Pass frame to ObjectSelector
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Prototype;
