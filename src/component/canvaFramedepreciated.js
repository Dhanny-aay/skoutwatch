import { useRef, useEffect } from "react";

const CanvasFrame = ({
  videoSrc,
  time,
  videoWidth,
  videoHeight,
  onFrameExtracted,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.currentTime = time;

    video.onloadeddata = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

      // Call callback with the canvas reference for use in ObjectSelector
      if (onFrameExtracted) onFrameExtracted(canvasRef);
    };
  }, [time, videoSrc, videoWidth, videoHeight]);

  return (
    <canvas ref={canvasRef} width={videoWidth} height={videoHeight}></canvas>
  );
};

export default CanvasFrame;
