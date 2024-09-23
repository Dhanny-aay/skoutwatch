import { useRef, useState } from "react";

const VideoPlayer = ({ videoSrc, onSegmentationResponse }) => {
  const videoRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);
  const [isReadyToTrack, setIsReadyToTrack] = useState(false);
  const [videoFPS, setVideoFPS] = useState(null);

  const handlePause = () => {
    // Additional logic for when the video is paused
  };

  // Get video metadata when it's loaded
  const handleVideoMetadata = () => {
    const video = videoRef.current;
    if (video) {
      const duration = video.duration; // Video duration in seconds
      const FPS = Math.round(video.videoWidth / duration); // Approximate FPS (not accurate)

      console.log(`Video Duration: ${duration} seconds, Estimated FPS: ${FPS}`);
      // Now you can send the videoFPS value dynamically in your API request
      setVideoFPS(FPS);
    }
  };

  const handleClick = (event) => {
    const video = videoRef.current;
    if (video) {
      const boundingRect = video.getBoundingClientRect();

      // Get the actual size of the video element
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Calculate the relative click position in the video coordinates
      const x =
        ((event.clientX - boundingRect.left) / boundingRect.width) * videoWidth;
      const y =
        ((event.clientY - boundingRect.top) / boundingRect.height) *
        videoHeight;

      setCoordinates({ x: Math.round(x), y: Math.round(y) });
      setIsReadyToTrack(true);
      console.log(`Click coordinates: X=${x}, Y=${y}`);
    }
  };

  const sendToSam2 = async () => {
    if (!coordinates) return;
    try {
      const response = await fetch("http://localhost:5000/api/replicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            mask_type: "highlighted",
            video_fps: 50,
            click_frames: "1",
            input_video: videoSrc,
            click_labels: "1",
            output_video: true,
            output_format: "webp",
            output_quality: 80,
            annotation_type: "mask",
            click_object_ids: "object_1",
            click_coordinates: `[${coordinates.x}, ${coordinates.y}]`,
            output_frame_interval: 1,
          },
        }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("Segmentation Result:", data);
      onSegmentationResponse(data);
    } catch (error) {
      console.error("Error in SAM 2:", error);
    }
  };

  return (
    <div className="mt-12">
      <video
        onClick={handleClick}
        ref={videoRef}
        width="600"
        controls
        onPause={handlePause}
        onLoadedMetadata={handleVideoMetadata}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {isReadyToTrack && (
        <div>
          <p>
            Coordinates Selected: X={coordinates.x}, Y={coordinates.y}
          </p>
          <button
            onClick={sendToSam2}
            className="py-3 px-5 bg-blue-500 rounded-lg text-center"
          >
            Track and Segment
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
