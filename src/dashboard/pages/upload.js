import VideoUpload from "../../component/videoUpload";
import Navbar from "../components/navbar";

const Upload = () => {
  return (
    <>
      <Navbar />
      <div className=" flex items-center justify-center py-6 h-[85vh] mt-20">
        <div className=" px-6 py-4 w-[500px] h-full relative">
          <p className=" text-[#353535] font-LatoNormal font-semibold text-xl">
            Upload
          </p>
          <p className="text-[#353535] font-Inter font-normal text-xs mt-2">
            Make sure the video you select includes the object you want to
            segment in the first frame.
          </p>
          <VideoUpload />
        </div>
      </div>
    </>
  );
};

export default Upload;
