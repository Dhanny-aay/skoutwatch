import React, { useRef, useState, useEffect } from "react";
import videojs from "video.js";
import "@videojs/themes/dist/city/index.css"; // Optional theme

const VideoPlayerWithFrames = ({ videoFile, frames }) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (videoRef.current) {
      const videoPlayer = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        width: "100%",
      });

      setPlayer(videoPlayer);

      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [videoFile]);

  const handleFrameClick = (time) => {
    if (player) {
      player.currentTime(time);
    }
  };

  return (
    <div className="video-container">
      <video ref={videoRef} className="video-js vjs-theme-city">
        <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
      </video>

      {/* Display frame thumbnails */}
      <div className="frame-timeline">
        {frames.map((frame, index) => (
          <img
            key={index}
            src={frame}
            alt={`frame-${index}`}
            onClick={() => handleFrameClick(index)} // Assuming each frame corresponds to a second
            className="frame-thumbnail"
          />
        ))}
      </div>
    </div>
  );
};

export default VideoPlayerWithFrames;
