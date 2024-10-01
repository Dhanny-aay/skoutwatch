import { useState } from "react";
import Navbar from "../components/navbar";
import union from "./assets/union.svg";
import track from "./assets/track.svg";
import video from "./assets/video.svg";
import { useNavigate } from "react-router-dom";

const MakeChoie = () => {
  const [optionSelected, setOptionSelected] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (optionSelected) {
      navigate("/processing");
    }
  };

  const handleOptionClick = () => {
    setOptionSelected(true); // Set selected option to true
  };

  return (
    <>
      <Navbar />
      <div className=" flex flex-col items-center justify-start py-6 px-8 md:h-[85vh] mt-24">
        <div className=" w-full md:max-w-[700px] h-full relative">
          <p className=" text-center font-LatoBold font-bold text-[#000] text-2xl md:text-[32px]">
            What would you like to do with your video?
          </p>
          <div className=" w-full grid md:max-w-[700px] grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 mt-10 md:mt-16">
            {/* Option 1 */}
            <div onClick={handleOptionClick} className=" cursor-pointer">
              <div
                className={`w-full h-[150px] md:h-[200px] transition-all rounded-[20px] flex items-center justify-center 
                  ${
                    optionSelected ? "bg-[#D99A26]" : "bg-[#EAEBF0]"
                  } hover:bg-[#D99A26]`}
              >
                <img
                  src={union}
                  className=" w-12 md:w-auto"
                  alt="Segmentation"
                />
              </div>
              <p className="mt-3 text-[#231546] font-LatoBold text-xl md:text-2xl font-bold">
                Segmentation
              </p>
              <p className="mt-2 font-normal text-sm md:text-base font-LatoNormal text-[#231546]">
                Split video into key segments.
              </p>
            </div>
            {/* option 2 */}
            <div className=" cursor-not-allowed">
              <div className=" w-full h-[150px] md:h-[200px] bg-[#EAEBF0] rounded-[20px] flex items-center justify-center relative">
                <button className="absolute top-4 right-4 bg-[#17BD8D1A] rounded-[20px] py-2 px-[10px] text-center font-LatoNormal font-normal md:text-sm text-xs text-[#17BD8D]">
                  Coming Soon
                </button>
                <img src={track} className=" w-12 md:w-auto" alt="" />
              </div>
              <p className=" mt-3 text-[#23154666] font-LatoBold text-xl md:text-2xl font-bold">
                Object Tracking
              </p>
              <p className=" mt-2 font-normal text-sm md:text-base font-LatoNormal text-[#23154666]">
                Track player and ball movements.
              </p>
            </div>
            {/* option 3 */}
            <div className=" cursor-not-allowed">
              <div className=" w-full h-[150px] md:h-[200px] bg-[#EAEBF0] rounded-[20px] flex items-center justify-center relative">
                <button className="absolute top-4 right-4 bg-[#17BD8D1A] rounded-[20px] py-2 px-[10px] text-center font-LatoNormal font-normal md:text-sm text-xs text-[#17BD8D]">
                  Coming Soon
                </button>
                <img src={video} className=" w-12 md:w-auto" alt="" />
              </div>
              <p className=" mt-3 text-[#23154666] font-LatoBold text-xl md:text-2xl font-bold">
                Video Clips
              </p>
              <p className=" mt-2 font-normal text-sm md:text-base font-LatoNormal text-[#23154666]">
                Edit videos to create clips.
              </p>
            </div>
          </div>
          {/* Proceed Button */}
          <div className="w-full mt-6 md:mt-0 flex justify-center items-center gap-6 md:absolute bottom-0 left-0">
            <button
              className={` w-[500px] py-3 rounded-[40px] font-Inter font-semibold text-[#FFFFFF] text-base ${
                optionSelected
                  ? "bg-[#D99A26]"
                  : "bg-[#D99A264D] cursor-not-allowed"
              }`}
              onClick={handleProceed}
              disabled={!optionSelected} // Disable when upload is not complete
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeChoie;
