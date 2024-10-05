import Navbar from "../components/navbar";
import Prototype from "../../pages/prototype";
import left from "./assets/arrow-left.svg";

const PrototypeV1 = () => {
  return (
    <>
      <Navbar />
      <div className=" w-full px-8 py-6 mt-20">
        <div className=" flex items-center space-x-3">
          <span className=" flex items-center space-x-1">
            <img src={left} alt="" />
            <p className=" text-base font-LatoNormal font-medium text-[#D99A26]">
              Back
            </p>
          </span>
          <p className=" font-LatoNormal font-semibold text-[#231546] text-2xl">
            Segmentation
          </p>
        </div>

        <p className=" font-Inter font-semibold text-base text-black mt-10">
          Object tracking
        </p>
        <p className=" text-xs text-[#000000B2] font-normal font-Inter mt-2">
          You'll be able to use our AI to make edits to any video by tracking
          objects and applying visual effects.To start, click any object in the
          video.
        </p>
        <Prototype />
      </div>
    </>
  );
};

export default PrototypeV1;
