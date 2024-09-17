import React, { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import videojs from "video.js";

import "video.js/dist/video-js.css"; // Video.js default CSS

const ffmpeg = new FFmpeg({ log: true });

const VideoUploader = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [frames, setFrames] = useState([]);
  const [isFfmpegLoaded, setIsFfmpegLoaded] = useState(false); // Track FFmpeg loading state
  const videoRef = useRef(null);
  const videoNode = useRef(null);
  const playerRef = useRef(null);

  // Handle file drop
  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setVideoFile(file);
    setVideoURL(URL.createObjectURL(file));

    // Extract frames from the video
    await extractFrames(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/*",
    onDrop,
  });

  // Load FFmpeg and extract frames
  const extractFrames = async (videoFile) => {
    // Check if FFmpeg is already loaded
    if (!isFfmpegLoaded) {
      await ffmpeg.load(); // Load FFmpeg instance
      setIsFfmpegLoaded(true); // Mark FFmpeg as loaded
    }

    const videoArrayBuffer = await videoFile.arrayBuffer();
    await ffmpeg.writeFile("input.mp4", new Uint8Array(videoArrayBuffer));

    // Extract a frame every 1 seconds (fps = 1 frame / 1 seconds)
    await ffmpeg.exec(["-i", "input.mp4", "-vf", "fps=1/1", "output_%04d.png"]);

    const extractedFrames = [];
    for (let i = 0; i < 5; i++) {
      try {
        const frameData = await ffmpeg.readFile(`output_000${i + 1}.png`);
        const frameBlob = new Blob([frameData.buffer], { type: "image/png" });
        const frameURL = URL.createObjectURL(frameBlob);
        extractedFrames.push(frameURL);
      } catch (e) {
        console.log("No more frames to extract");
        break;
      }
    }

    setFrames(extractedFrames); // Update state with extracted frames
  };

  // Initialize Video.js player
  useEffect(() => {
    if (videoNode.current && videoURL) {
      const player = videojs(videoNode.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        width: "100%",
      });

      playerRef.current = player;

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, [videoURL]);

  // Handle frame click to jump to a specific time in the video
  const handleFrameClick = (frameIndex) => {
    const time = frameIndex * 1; // Assuming 1 frame every 1 seconds
    if (playerRef.current) {
      playerRef.current.currentTime(time); // Seek to frame time
    }
  };

  return (
    <div className="uploader-container">
      {/* Video upload dropzone */}
      <div
        {...getRootProps()}
        className="dropzone"
        style={{ border: "2px dashed #ccc", padding: "20px" }}
      >
        <input {...getInputProps()} />
        <p className=" text-center">
          Drag & drop a video, or click to select one
        </p>
      </div>

      {/* Video.js player */}
      {videoURL && (
        <div className="video-player" style={{ marginTop: "20px" }}>
          <video
            ref={videoNode}
            className="video-js vjs-default-skin w-full"
            height={300}
          >
            <source src={videoURL} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Frame thumbnails */}
      {frames.length > 0 && (
        <div
          className="frame-timeline"
          style={{ display: "flex", marginTop: "20px", overflowX: "auto" }}
        >
          {frames.map((frame, index) => (
            <img
              key={index}
              src={frame}
              alt={`frame-${index}`}
              className="frame-thumbnail"
              onClick={() => handleFrameClick(index)}
              style={{
                width: "120px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
