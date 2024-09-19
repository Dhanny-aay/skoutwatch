import exp from "./assets/exp.svg";
import camera from "./assets/camera.svg";
import lytics from "./assets/lytics.svg";

const Works = () => {
  const pote = [
    {
      name: "Expert Coaching Analysis",
      desc: "Our AI identifies player performance trends, providing in-depth analysis that allows coaches to target skill development and enhance gameplay.",
      img: exp,
    },
    {
      name: "Video Upload & Instant Feedback",
      desc: "Upload match videos and receive immediate feedback with expert-level analysis on tactics, speed, and decision-making.",
      img: camera,
    },
    {
      name: "Custom Performance Metrics",
      desc: "Track player growth over time with tailored performance metrics designed to optimize strengths and address weaknesses.",
      img: lytics,
    },
  ];
  return (
    <>
      {/* How it works */}
      <div className=" w-full py-16 px-4 md:px-14 lg:px-24">
        <button className=" py-2 px-6 rounded-[20px] bg-[#EFB339] text-[#231546] font-Inter font-normal text-base md:text-lg">
          How it works
        </button>
        <p className=" mt-3 text-[#231546] font-LatoBold font-bold text-3xl md:text-5xl">
          Maximize Player Potential with Skoutwatch
        </p>
        <div className=" w-full mt-16  grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pote.map((item, index) => (
            <div key={index} className=" w-full">
              <div className=" w-full rounded-[15px] bg-[#231546] h-[350px] flex items-center justify-center">
                <img src={item.img} alt="" />
              </div>
              <p className=" mt-2 text-black font-semibold text-lg md:text-xl font-LatoNormal">
                {item.name}
              </p>
              <p className=" text-black text-base md:text-lg mt-3 font-Inter font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Works;
