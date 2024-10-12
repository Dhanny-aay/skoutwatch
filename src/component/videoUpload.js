import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import upload from "./assets/upload-01.svg";
import videoIcon from "./assets/video-recorder.svg";
import trash from "./assets/Trash.svg";
import uploading from "./assets/uploading.gif";
import tick from "./assets/tick-circle.svg";
import { useNavigate } from "react-router-dom";

const VideoUpload = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [isUploading, setIsUploading] = useState(false); // For tracking upload status
  const [uploadComplete, setUploadComplete] = useState(false); // For tracking if upload is complete
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": [".mp4", ".mov", ".avi"],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        const videoFile = acceptedFiles[0];

        // Check if the file size exceeds 15 MB
        if (videoFile.size > 15 * 1024 * 1024) {
          setErrorMessage("File size exceeds 15 MB limit."); // Set error message
          return; // Exit early if file is too large
        } else {
          setErrorMessage(""); // Clear any previous error messages
        }

        setSelectedVideo({
          name: videoFile.name,
          size: (videoFile.size / (1024 * 1024)).toFixed(2),
        });
        setIsUploading(true);
        const uploadedVideoUrl = await uploadVideo(videoFile);
        if (uploadedVideoUrl) {
          setUploadComplete(true);
          localStorage.setItem("uploadedVideoUrl", uploadedVideoUrl);
          setVideoSrc(uploadedVideoUrl);
        }
        setIsUploading(false);
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

  // Function to reset everything
  const resetUploadProcess = () => {
    setSelectedVideo(null);
    setIsUploading(false);
    setUploadComplete(false);

    localStorage.removeItem("uploadedVideoUrl");
  };

  // Handle "Proceed" button click (navigate to another page)
  const handleProceed = () => {
    if (uploadComplete) {
      navigate("/prototype");
    }
  };

  return (
    <>
      <div
        {...getRootProps()}
        className="upload-box p-6 border-dashed border rounded-[6px] border-[#CACACA] text-center w-full mt-4 flex flex-col items-center justify-center "
      >
        <input {...getInputProps()} />
        <span className="w-11 h-11 bg-[#F5F5F5] rounded-full flex items-center justify-center">
          <img src={upload} alt="Upload icon" />
        </span>
        <p className="mt-3 font-Inter text-[#231546] font-medium text-sm">
          Click to Upload{" "}
          <span className="text-sm text-[#666666] font-normal">
            or drag and drop
          </span>
        </p>
        <p className="mt-1 font-Inter text-xs text-[#666666] font-normal">
          (Max. File size: 15 MB)
        </p>
        {errorMessage && (
          <p className="text-red-600 text-xs mt-2 font-Inter">{errorMessage}</p>
        )}
      </div>

      {/* Video details */}
      {selectedVideo && (
        <div className="w-full border border-[#CACACA] mt-4 p-4 rounded-[6px] flex flex-col justify-center items-center">
          <div className="w-full flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <img src={videoIcon} alt="Video icon" />
              <span className="flex flex-col">
                <p className="font-Inter font-medium text-xs text-[#353535]">
                  {selectedVideo.name}
                </p>
                <p className="font-normal text-[#989692] text-xs font-Inter">
                  {selectedVideo.size} MB
                </p>
              </span>
            </div>
            {/* Show tick icon if upload is complete, otherwise show trash */}
            <img
              src={uploadComplete ? tick : trash}
              alt={uploadComplete ? "Tick icon" : "Trash icon"}
              onClick={uploadComplete ? null : resetUploadProcess} // Reset only if trash is shown
              className="cursor-pointer" // Make it clickable
            />
          </div>

          {/* Show progress bar or uploading GIF based on upload status */}
          {isUploading ? (
            <img
              src={uploading}
              className="w-[90%] h-1 rounded-lg mt-2"
              alt="Uploading progress"
            />
          ) : uploadComplete ? (
            <div className="w-[90%] h-[6px] rounded-md bg-[#50C878] mt-2"></div>
          ) : null}
        </div>
      )}

      {uploadComplete && (
        <video className=" rounded-[10px] w-full mt-6" controls muted>
          <source src={videoSrc} />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Proceed Button */}
      <div className="w-full grid grid-cols-1 gap-6 mt-8">
        <button
          className={`w-full py-3 rounded-[40px] font-Inter font-semibold text-[#FFFFFF] text-base ${
            uploadComplete
              ? "bg-[#D99A26]"
              : "bg-[#D99A264D] cursor-not-allowed"
          }`}
          onClick={handleProceed}
          disabled={!uploadComplete} // Disable when upload is not complete
        >
          Proceed
        </button>
      </div>
    </>
  );
};

export default VideoUpload;
