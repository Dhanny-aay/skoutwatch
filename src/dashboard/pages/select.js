import { useState } from "react";
import Navbar from "../components/navbar";
import firstFrame from "./assets/firstframe.png";
import { useNavigate } from "react-router-dom";

const Select = () => {
  const [clicks, setClicks] = useState([]); // Store click coordinates
  const [optionSelected, setOptionSelected] = useState(false);
  const navigate = useNavigate();

  // Handle image click to add "X" mark
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect(); // Get the image's bounding box
    const x = e.clientX - rect.left; // X coordinate relative to the image
    const y = e.clientY - rect.top; // Y coordinate relative to the image

    setClicks([...clicks, { x, y }]); // Add new click to the clicks array
    setOptionSelected(true); // Set optionSelected to true since something was clicked
  };

  // Reset the clicks and optionSelected
  const handleReset = () => {
    setClicks([]); // Clear the clicks array
    setOptionSelected(false); // Reset the option selected
  };

  const handleProceed = () => {
    navigate("/processing"); // Navigate to  processing page
  };

  return (
    <>
      <Navbar />
      <div className=" flex flex-col items-center justify-start py-6 px-8 md:h-[85vh] mt-24">
        <div className="w-full md:max-w-[700px] h-full relative">
          <p className=" text-center font-LatoBold font-bold text-[#000] text-2xl md:text-[32px]">
            This is the first frame of your video, what objects would you like
            to track?
          </p>
          <p className=" text-center mt-2 text-sm md:text-base font-LatoNormal font-normal text-[#00000084]">
            Click within the frame to choose them
          </p>
          {/* Image with click handler */}
          <div className="relative mt-6" onClick={handleImageClick}>
            <img src={firstFrame} className="w-full" alt="First Frame" />

            {/* Render X marks based on clicks */}
            {clicks.map((click, index) => (
              <div
                key={index}
                className="absolute text-[#D99A26] font-bold text-sm select-none"
                style={{
                  top: click.y - 10 + "px", // Positioning with an offset
                  left: click.x - 10 + "px", // Adjust position for the center of the "X"
                }}
              >
                X
              </div>
            ))}
          </div>
          <button
            onClick={handleReset}
            className=" block ml-auto text-center mt-2 text-sm md:text-base font-LatoNormal font-normal text-[#00000084] underline underline-offset-2"
          >
            Reset
          </button>
          {/* Proceed Button */}
          <div className="w-full mt-6 md:mt-8 flex justify-center items-center gap-6 bottom-0 left-0">
            <button
              className={` w-[500px] py-3 rounded-[40px] font-Inter font-semibold text-[#FFFFFF] text-base ${
                optionSelected
                  ? "bg-[#D99A26]"
                  : "bg-[#D99A264D] cursor-not-allowed"
              }`}
              onClick={handleProceed}
              disabled={!optionSelected} // Disable when no option is selected
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Select;
