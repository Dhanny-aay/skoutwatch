import succ from "./assets/succ.svg";

const CompleteSeg = ({ setSegmentationStep }) => {
  const handleProceed = () => {
    setSegmentationStep("ResultSeg");
  };
  return (
    <>
      <div className="absolute lg:left-[20%] top-[80px] p-6 w-[80%] h-[calc(100vh-80px)] overflow-y-auto">
        <div className="w-full justify-center h-full flex items-center">
          <div className="w-full md:max-w-[500px] h-full relative flex flex-col items-center justify-center">
            <img src={succ} alt="Segmentation in progress" />
            <p className="mt-6 font-LatoBold font-bold text-2xl text-[#272D37] text-center">
              Your Video is Ready! 🎉
            </p>
            <p className="mt-2 text-center text-base text-[#5F6D7E] font-LatoNormal font-normal">
              Your video has been successfully processed. Feel free to watch,
              download, or collect your NFT reward!
            </p>
            <button
              onClick={handleProceed}
              className=" mt-6 bg-[#231546] rounded-[40px] py-3 w-[250px] text-center font-Inter font-semibold text-base text-white"
            >
              View Video
            </button>

            {/* Proceed Button */}
            {/* <div className="w-full grid grid-cols-2 gap-3 absolute bottom-0 left-0">
            <button className="w-full py-3 rounded-[40px] font-Inter font-semibold text-[#FFFFFF] text-base bg-[#D99A26]">
              Download
            </button>
            <button className="w-full py-3 rounded-[40px] font-Inter font-semibold text-[#231546] text-base bg-[#EAEBF0]">
              Scan NFT
            </button>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteSeg;
