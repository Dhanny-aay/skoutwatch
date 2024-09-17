// CanvasFrame.js
import { useRef, useEffect, useState } from "react";

const CanvasFrame = ({
  videoSrc,
  time,
  videoWidth,
  videoHeight,
  onExtractFrame,
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

      // Extract frame as a blob for sending to SAM 2
      canvas.toBlob((blob) => {
        onExtractFrame(blob); // Pass extracted frame to parent
      });
    };
  }, [time, videoSrc, videoWidth, videoHeight, onExtractFrame]);

  return (
    <canvas ref={canvasRef} width={videoWidth} height={videoHeight}></canvas>
  );
};

export default CanvasFrame;
