// VideoPlayer.js
import { useRef } from "react";

const VideoPlayer = ({ videoSrc, onPauseFrame }) => {
  const videoRef = useRef(null);

  const handlePause = () => {
    const video = videoRef.current;
    if (video) {
      const currentTime = video.currentTime;
      const width = video.videoWidth;
      const height = video.videoHeight;
      onPauseFrame(currentTime, width, height); // Pass frame info to parent
    }
  };
  //   const handlePlay = () => videoRef.current.play();
  //   const handlePause = () => videoRef.current.pause();

  return (
    <div>
      <video ref={videoRef} width="600" controls onPause={handlePause}>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div>
        {/* <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button> */}
      </div>
    </div>
  );
};

export default VideoPlayer;
