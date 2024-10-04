import { useContext, useState } from "react";
import union from "./assets/union.svg";
import track from "./assets/track.svg";
import video from "./assets/video.svg";
import { ActivePageContext } from "../contexts/demoPageContext";

const Sidebar = () => {
  const [optionSelected, setOptionSelected] = useState("");
  const { setActivePage } = useContext(ActivePageContext);

  // Set selected option based on what the user clicked
  const handleOptionClick = (option) => {
    setOptionSelected(option);
    setActivePage(option);
  };

  return (
    <>
      <div className="fixed top-[80px] left-0 z-[999] w-[20%] h-[calc(100vh-80px)] overflow-y-auto">
        <div className=" w-full grid items-center justify-center grid-cols-1 gap-8 md:gap-6 py-8 ">
          {/* Option 1: Segmentation */}
          <div
            onClick={() => handleOptionClick("segmentation")}
            className=" flex flex-col items-center cursor-pointer"
          >
            <div
              className={`w-[120px] h-[120px] transition-all rounded-[20px] flex items-center justify-center 
                  ${
                    optionSelected === "segmentation"
                      ? "bg-[#D99A26]"
                      : "bg-[#EAEBF0]"
                  } hover:bg-[#D99A26]`}
            >
              <img src={union} className=" w-12 md:w-14" alt="Segmentation" />
            </div>
            <p className="mt-3 text-[#231546] font-LatoBold text-xl md:text-lg font-bold">
              Segmentation
            </p>
            <p className="mt-1 font-normal text-sm md:text-sm font-LatoNormal text-[#231546]">
              Split video into key segments.
            </p>
          </div>

          {/* Option 2: Object Tracking */}
          <div
            onClick={() => handleOptionClick("tracking")}
            className=" flex flex-col items-center cursor-pointer"
          >
            <div
              className={`w-[120px] h-[120px] hover:bg-[#D99A26] transition-all rounded-[20px] flex items-center justify-center relative
                  ${
                    optionSelected === "tracking"
                      ? "bg-[#D99A26]"
                      : "bg-[#EAEBF0]"
                  }`}
            >
              <img src={track} className=" w-12 md:w-14" alt="Tracking" />
            </div>
            <p className=" mt-3 text-[#231546] font-LatoBold text-xl md:text-lg font-bold">
              Object Tracking
            </p>
            <p className=" mt-1 font-normal text-sm md:text-sm font-LatoNormal text-[#231546]">
              Track player and ball movements.
            </p>
          </div>

          {/* Option 3: Coming Soon */}
          <div className=" flex flex-col items-center cursor-not-allowed">
            <div className=" w-[120px] h-[120px] bg-[#EAEBF0] rounded-[20px] flex items-center justify-center relative">
              <button className="absolute top-4 right-4 bg-[#17BD8D1A] rounded-[20px] py-2 px-[10px] text-center font-LatoNormal font-normal md:text-sm text-xs text-[#17BD8D]">
                Coming Soon
              </button>
              <img src={video} className=" w-12 md:w-14" alt="" />
            </div>
            <p className=" mt-3 text-[#23154666] font-LatoBold text-xl md:text-lg font-bold">
              Video Clips
            </p>
            <p className=" mt-1 font-normal text-sm md:text-sm font-LatoNormal text-[#23154666]">
              Edit videos to create clips.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
