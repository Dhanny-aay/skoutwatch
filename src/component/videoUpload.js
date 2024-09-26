// VideoUpload.js
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const VideoUpload = ({ onVideoSelect }) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": [".mp4", ".mov", ".avi"],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        const videoFile = acceptedFiles[0];
        const videoUrl = await uploadVideo(videoFile); // Upload video to server and get URL
        onVideoSelect(videoUrl); // Pass the uploaded video URL to the parent component
      }
    },
  });

  // Function to handle video upload to the server
  const uploadVideo = async (file) => {
    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // The URL of the uploaded video on S3
      return response.data.url;
    } catch (error) {
      console.error("Error uploading video:", error);
      return null;
    }
  };

  return (
    <div
      {...getRootProps()}
      className="upload-box p-5 border-dashed border-2 border-[#ccc] text-center"
    >
      <input {...getInputProps()} />
      <p>Drag and drop a video file, or click to select one</p>
    </div>
  );
};

export default VideoUpload;
