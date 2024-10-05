import { useEffect, useRef, useState } from "react";
import trash from "./assets/Trash.svg";
import PlusCircle from "./assets/PlusCircle.svg";
import load from "./assets/load.gif";
import { useSnackbar } from "notistack";

const VideoPlayer = ({ videoSrc, onSegmentationResponse }) => {
  const videoRef = useRef(null);
  const [isReadyToTrack, setIsReadyToTrack] = useState(false);
  const [coordinatesList, setCoordinatesList] = useState([]); // Array to store up to 5 coordinates
  const [isSelecting, setIsSelecting] = useState(false); // Tracks if we're in "select coordinate" mode
  const { enqueueSnackbar } = useSnackbar();
  const [maskType, setMakeType] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update isReadyToTrack whenever coordinatesList or maskType changes
    setIsReadyToTrack(coordinatesList.length > 0 && maskType !== "");
  }, [coordinatesList, maskType]);

  // Handle video click and store the clicked coordinates if in "select coordinate" mode
  const handleClick = (event) => {
    if (!isSelecting) return; // If not selecting, do nothing

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

      const newCoordinate = { x: Math.round(x), y: Math.round(y) };

      // Add new coordinate to the list (up to 5 coordinates)
      if (coordinatesList.length < 5) {
        setCoordinatesList((prevList) => [...prevList, newCoordinate]);
        setIsSelecting(false); // Disable selection after adding the coordinate
        video.play(); // Resume normal video behavior after selecting coordinate
      } else {
        enqueueSnackbar("You can only select up to 5 coordinates.", {
          variant: "error",
        });
      }
    }
  };

  // Enable coordinate selection and pause the video
  const startSelecting = () => {
    const video = videoRef.current;
    if (video) {
      enqueueSnackbar("Please select an object within the video frame.", {
        variant: "info",
      });
      video.pause(); // Pause video when starting selection
      setIsSelecting(true); // Enable selecting mode
    }
  };

  // Remove specific coordinate based on the clicked trash icon
  const resetCoordinate = (indexToRemove) => {
    setCoordinatesList((prevList) =>
      prevList.filter((_, index) => index !== indexToRemove)
    );
  };

  const sendToSam2 = async () => {
    if (!coordinatesList.length || !maskType) return;
    setLoading(true);
    setIsReadyToTrack(false);
    try {
      const response = await fetch(`${API_BASE_URL}/api/replicate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            mask_type: maskType,
            video_fps: 50,
            click_frames: "1",
            input_video: videoSrc,
            click_labels: "1",
            output_video: true,
            output_format: "webp",
            output_quality: 80,
            annotation_type: "mask",
            click_object_ids: coordinatesList
              .map((_, index) => `object_${index + 1}`)
              .join(","), // Join the IDs into a comma-separated string
            click_coordinates: coordinatesList
              .map((coord) => `[${coord.x}, ${coord.y}]`)
              .join(","),
            output_frame_interval: 1,
          },
        }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("Segmentation Result:", data);
      setLoading(false);
      onSegmentationResponse(data);
    } catch (error) {
      console.error("Error in SAM 2:", error);
      setLoading(false);
    }
  };

  return (
    <div className=" mt-2 w-full">
      <video
        onClick={handleClick}
        ref={videoRef}
        width="600"
        className=" rounded-[10px]"
        controls={!isSelecting} // Disable default controls during coordinate selection
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className=" w-full grid grid-cols-2 gap-6 mt-6 ">
        <div className=" w-full bg-[#F5F5F5] p-4 rounded-[15px] min-h-[180px]">
          {/* Conditionally render based on whether the coordinatesList is empty or not */}
          {coordinatesList.length === 0 ? (
            <p className=" text-sm mb-2 font-Inter font-normal">
              No objects selected yet
            </p>
          ) : (
            <div className=" h-[150px] overflow-y-auto w-full space-y-2 pb-6">
              {coordinatesList.map((coord, index) => (
                <div key={index} className=" w-full">
                  <div className="border border-[#3AF3FC] rounded-[8px] px-4 py-2 flex w-full items-center justify-between">
                    <p className=" font-normal font-Inter text-xs text-black">
                      Object {index + 1}
                    </p>
                    <img
                      src={trash}
                      className=" w-3 cursor-pointer"
                      onClick={() => resetCoordinate(index)} // Remove specific coordinate
                      alt="Delete"
                    />
                  </div>
                  <p className=" text-[#000000B2] text-xs font-normal font-Inter mt-2">
                    Coordinates Selected: X={coord.x}, Y={coord.y}
                  </p>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={startSelecting} // Start selecting coordinates
            className=" w-full py-2 px-4 border border-[#666666] rounded-[8px] mt-4 flex items-center space-x-3"
          >
            <img src={PlusCircle} className=" w-5" alt="" />
            <p className=" font-Inter font-normal text-sm text-black">
              Add object
            </p>
          </button>
        </div>
        <div className=" w-full bg-[#F5F5F5] p-4 rounded-[15px] min-h-[180px]">
          <div className="relative w-full h-full">
            <p className=" text-base font-Inter font-semibold text-black">
              Choose Mask Type
            </p>
            <p className=" mt-2 text-xs font-Inter font-normal text-[#000000B2] ">
              Select the ideal mask format: Binary (B&W), Highlighted (colored
              overlay), or Greenscreen for enhanced video effects.
            </p>

            <span className=" block absolute left-0 bottom-0 w-full bg-white px-4 py-2 border border-[#EBF4EF] rounded-lg">
              <select
                name=""
                onChange={(e) => setMakeType(e.target.value)}
                className=" w-full font-Inter text-[#1212124D] font-normal text-sm"
                id=""
              >
                <option value="">Select mask type</option>
                <option value="binary">Binary</option>
                <option value="highlighted">Highlighted</option>
                <option value="greenscreen">Greenscreen</option>
              </select>
            </span>
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={sendToSam2}
          disabled={!isReadyToTrack} // Disable if not ready
          style={{
            boxShadow: "0px 1px 2px 0px #1018280A",
          }}
          className={`py-3 px-5 text-white font-Inter font-semibold text-base text-center mt-6 w-full rounded-[40px] flex items-center justify-center  ${
            isReadyToTrack
              ? "bg-[#D99A26]"
              : "bg-[#D99A264D] cursor-not-allowed"
          }`}
        >
          {loading ? <img src={load} className=" w-6" alt="" /> : "Proceed"}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
