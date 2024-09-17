// VideoUpload.js
import React from "react";
import { useDropzone } from "react-dropzone";

const VideoUpload = ({ onVideoSelect }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": [".mp4", ".mov", ".avi"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length) {
        const videoFile = acceptedFiles[0];
        onVideoSelect(URL.createObjectURL(videoFile)); // Pass video URL to parent component
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className="upload-box p-5 border-dashed border-2 border-[#ccc] "
    >
      <input {...getInputProps()} />
      <p>Drag and drop a video file, or click to select one</p>
    </div>
  );
};

export default VideoUpload;
