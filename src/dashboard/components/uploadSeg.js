import { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import upload from "./assets/upload-01.svg";
import videoIcon from "./assets/video-recorder.svg";
import trash from "./assets/Trash.svg";
import uploading from "./assets/uploading.gif";
import tick from "./assets/tick-circle.svg";
import { ActivePageContext } from "../contexts/demoPageContext";

const UploadSeg = ({ setSegmentationStep }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Track upload status
  const [uploadComplete, setUploadComplete] = useState(false); // Track upload completion
  const { setActivePage } = useContext(ActivePageContext); // Context to switch segmentation steps

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": [".mp4", ".mov", ".avi"],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        const videoFile = acceptedFiles[0];
        setSelectedVideo({
          name: videoFile.name,
          size: (videoFile.size / (1024 * 1024)).toFixed(2), // File size in MB
        });
        setIsUploading(true); // Start uploading

        // After 6 seconds, simulate upload completion
        setTimeout(() => {
          setIsUploading(false);
          setUploadComplete(true);
        }, 6000);
      }
    },
  });

  // Function to reset upload state
  const resetUploadProcess = () => {
    setSelectedVideo(null);
    setIsUploading(false);
    setUploadComplete(false);
  };

  // Function to handle page navigation after upload completes
  const handleProceed = () => {
    if (uploadComplete) {
      // Switch to the next step in the segmentation flow
      setSegmentationStep("Select");
    }
  };

  return (
    <>
      <div className="absolute lg:left-[20%] top-[80px] p-6 w-[80%] h-[calc(100vh-80px)] overflow-y-auto">
        <div className="w-full justify-center h-full flex items-center">
          <div className="md:px-6 py-4 w-full md:w-[500px] h-full relative">
            <p className="text-[#353535] font-LatoNormal font-semibold text-base">
              Upload
            </p>
            <div
              {...getRootProps()}
              className="upload-box p-6 border-dashed border rounded-[6px] border-[#CACACA] text-center w-full mt-4 flex flex-col items-center justify-center"
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
                (Max. File size: 25 MB)
              </p>
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
                    className="cursor-pointer"
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

            {/* Proceed Button */}
            <div className="w-full grid grid-cols-1 gap-6 absolute bottom-0 left-0">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadSeg;
