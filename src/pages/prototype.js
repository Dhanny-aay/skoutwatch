import { useState } from "react";
import VideoUpload from "../component/videoUpload";
import VideoPlayer from "../component/videoPlayer";
import CanvasFrame from "../component/canvaFrame";
import ObjectSelector from "../component/objectSelector";

const Prototype = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [pausedFrame, setPausedFrame] = useState(null);
  const [canvasRef, setCanvasRef] = useState(null);

  const handleVideoSelect = (videoUrl) => setVideoSrc(videoUrl);

  const handlePauseFrame = (time, width, height) => {
    setPausedFrame({ time, width, height });
  };

  const handleFrameExtracted = (ref) => {
    setCanvasRef(ref);
  };

  return (
    <div className="relative w-full p-12 flex  flex-col space-y-12 md:space-y-0 md:flex-row space-x-16">
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
              onFrameExtracted={handleFrameExtracted}
            />
            {/* Object selector for drawing bounding box */}
            {canvasRef && (
              <ObjectSelector
                videoWidth={600}
                videoHeight={300}
                canvasRef={canvasRef}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Prototype;
