import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import sub from "./assets/Subtract.svg";
import { useNavigate } from "react-router-dom";

const Processing = () => {
  const [progress, setProgress] = useState(0); // Progress state
  const [processComplete, setProcessComplete] = useState(false);
  const navigate = useNavigate();

  // Update progress every second
  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => prev + 100 / 15); // Increment to reach 100% in 15 seconds
      }, 1000); // 1000ms = 1 second

      return () => clearInterval(interval); // Cleanup interval
    } else {
      setProcessComplete(true); // Set process complete when progress reaches 100%
    }
  }, [progress]);

  const handleProceed = () => {
    if (processComplete) {
      navigate("/complete");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center px-8 py-6 h-svh">
        <div className="w-full md:max-w-[500px] h-full relative flex flex-col items-center justify-center">
          <img src={sub} alt="Segmentation in progress" />
          <p className="mt-6 font-LatoBold font-bold text-2xl text-[#272D37] text-center">
            Segmentation In Progress...
          </p>
          <p className="mt-2 text-center text-base text-[#5F6D7E] font-LatoNormal font-normal">
            Processing your video... This may take a while.
          </p>

          {/* Progress Bar */}
          <div className=" flex w-full md:w-auto items-center space-x-2 mt-6">
            <div className=" w-full md:w-[350px] bg-[#EAEBF0] h-2 rounded-[5px] ">
              <div
                className="bg-[#231546] h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-Inter font-medium text-sm text-[#231546]">
              {Math.floor(progress)}%
            </span>
          </div>

          {/* Proceed Button */}
          <div className="w-full flex justify-center items-center gap-6 absolute bottom-0 left-0">
            <button
              className={`w-[500px] py-3 rounded-[40px] font-Inter font-semibold text-[#FFFFFF] text-base ${
                processComplete
                  ? "bg-[#D99A26]"
                  : "bg-[#D99A264D] cursor-not-allowed"
              }`}
              onClick={handleProceed}
              disabled={!processComplete} // Disable until process is complete
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Processing;
