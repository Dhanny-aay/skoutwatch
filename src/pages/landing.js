import Navbar from "../component/navbar";
import Partners from "../component/partners";
import heroBg from "./assets/herobg.webp";
import heroImg from "./assets/heroImg.svg";
import segme from "./assets/segmentation.svg";
import edit from "./assets/edit.svg";
import sights from "./assets/sights.svg";
import ballers from "./assets/ballers.svg";
import pikaso from "./assets/pikaso.svg";
import Works from "../component/works";
import grandstand from "./assets/granstand.svg";
import Footer from "../component/footer";

const Landing = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className=" w-full relative bg-black "
      >
        <Navbar />
        {/* hero */}
        <div className=" px-4 md:px-14 lg:px-24 py-16 w-full">
          <div className=" mt-8 md:mt-16 w-full lg:w-[800px]">
            <p className=" font-LatoBold text-[40px] leading-10 md:text-[54px] text-white md:leading-[66px]">
              Discover the Future of Football Talent with AI
            </p>
            <p
              className=" mt-4 font-normal text-base md:text-lg font-Inter
           text-white"
            >
              Unleash the power of advanced AI tracking and video editing to
              connect with top football players worldwide. Scout, analyze, and
              refine talent with precision.
            </p>
            <button className=" mt-9 bg-[#EFB339] rounded-[30px] py-4 px-9 text-white text-center font-Inter text-base md:text-lg">
              Get started today
            </button>
          </div>
          <img
            src={heroImg}
            className=" w-full mt-12 md:mt-8 md:h-auto"
            alt=""
          />
        </div>
      </div>
      <Partners />
      {/* features */}
      <div className=" w-full py-16 px-4 md:px-14 lg:px-24">
        <button className=" py-2 px-6 rounded-[20px] bg-[#EFB339] text-[#231546] font-Inter font-normal text-base md:text-lg">
          Our Features
        </button>
        <p className=" mt-3 text-[#231546] font-LatoBold font-bold text-3xl md:text-5xl">
          A Smarter Way to Scout Talent
        </p>

        <div className=" mt-12 w-full md:h-[350px] rounded-[15px] flex flex-row justify-between bg-[#231546]">
          <div className=" w-full md:w-[65%] p-8 relative">
            <p className=" text-white font-LatoBold font-bold text-3xl md:text-3xl">
              Precision Player Segmentation
            </p>
            <p className=" mt-3 text-white font-normal text-base md:text-lg font-Inter">
              Our proprietary AI tools segment each player’s movements, offering
              unparalleled insights into their technical and physical
              capabilities. Every action is tracked with precision.
            </p>
            <button className=" bg-[#EFB339] py-4 px-9 rounded-[30px] text-center text-white font-Inter font-semibold text-base md:text-lg mt-8 md:mt-0 md:absolute left-8 bottom-8">
              Get started today
            </button>
          </div>
          <div
            style={{
              backgroundImage: `url(${segme})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className=" w-[35%] h-full hidden md:block rounded-r-[15px]"
          ></div>
        </div>

        <div className=" mt-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className=" w-full h-[500px] bg-[#231546] rounded-[15px] py-8 pl-8">
            <p className=" text-white pr-8 font-bold font-LatoBold text-3xl">
              Video Editing and Presets
            </p>
            <p className=" mt-3 text-white font-normal text-base md:text-lg font-Inter pr-8">
              Effortlessly create professional video highlights using our
              curated presets and editing effects. Enhance every key moment with
              tools that let you showcase the most impactful skills.
            </p>
            <img src={edit} className=" mt-[100px]" alt="" />
          </div>
          <div className=" w-full h-[500px] bg-[#231546] rounded-[15px] py-8 pl-8 relative">
            <p className=" text-white pr-8 font-bold font-LatoBold text-3xl">
              AI-Powered Insights
            </p>
            <p className=" mt-3 text-white font-normal text-base md:text-lg font-Inter pr-8">
              Leverage cutting-edge data analytics to uncover hidden talents.
              Our platform uses AI to provide performance metrics that give you
              a deeper understanding of each player's strengths and areas for
              improvement.
            </p>
            <div className="absolute bottom-0 right-0 pl-8">
              <img src={sights} className=" " alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* Skoutwatch for Scouts, Agents, and Guardians. */}
      <div className=" w-full py-16 px-4 md:px-14 lg:px-24">
        <button className=" py-2 px-6 rounded-[20px] bg-[#EFB339] text-[#231546] font-Inter font-normal text-base text-left md:text-lg">
          Skoutwatch for Scouts, Agents, and Guardians.
        </button>
        <p className=" mt-3 text-[#231546] font-LatoBold font-bold text-3xl md:text-5xl">
          Connecting Talent with Opportunity
        </p>
        <div className=" w-full mt-12 flex flex-col space-y-12 lg:space-y-0 lg:flex-row items-start justify-between">
          <div
            style={{
              backgroundImage: `url(${ballers})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className=" w-full lg:w-[48%] rounded-[15px] h-[500px] bg-[#23154650]"
          ></div>
          <div className=" w-full lg:w-[48%] relative lg:h-[500px]">
            <p className=" text-[#231546] font-LatoBold font-bold text-3xl">
              Empowering Scouts, Agents, and Guardians with AI
            </p>
            <p className=" mt-3 text-[#231546] font-normal text-base md:text-lg font-Inter">
              From grassroots to elite leagues, Skoutwatch brings you closer to
              discovering the next football star. With AI segmentation and
              real-time player tracking, we enable seamless connections between
              scouts and top players across the globe.
            </p>
            <button className=" py-3 px-6 bg-[#231546] rounded-[30px] text-white font-Inter font-semibold text-lg md:text-xl mt-8 lg:mt-0 lg:absolute left-0 bottom-0">
              Browse Top players
            </button>
          </div>
        </div>
      </div>
      {/* Why Choose Skoutwatch? */}
      <div className=" w-full py-16 px-4 md:px-14 lg:px-24">
        <button className=" py-2 px-6 rounded-[20px] bg-[#EFB339] text-[#231546] font-Inter font-normal text-base md:text-lg">
          Why Choose Skoutwatch?
        </button>
        <p className=" mt-3 text-[#231546] font-LatoBold font-bold text-3xl md:text-5xl">
          AI Meets Talent Discovery
        </p>

        <div
          style={{
            backgroundImage: `url(${pikaso})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className=" mt-16 w-full rounded-[15px] h-[400px] bg-[#23154650]"
        ></div>
        <div className=" mt-16 w-full grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className=" w-full">
            <p className=" text-black font-LatoNormal text-xl md:text-2xl font-semibold">
              AI Tracking and Segmentation
            </p>
            <p className=" text-black text-base md:text-lg mt-3 font-Inter font-normal">
              Discover top performers with real-time AI action detection,
              highlighting every move.
            </p>
          </div>
          <div className=" w-full">
            <p className=" text-black font-LatoNormal text-xl md:text-2xl font-semibold">
              Intelligent Video Editing
            </p>
            <p className=" text-black text-base md:text-lg mt-3 font-Inter font-normal">
              Instantly transform raw footage into professional-quality
              highlights.
            </p>
          </div>
          <div className=" w-full">
            <p className=" text-black font-LatoNormal text-xl md:text-2xl font-semibold">
              Data-Driven Insights
            </p>
            <p className=" text-black text-base md:text-lg mt-3 font-Inter font-normal">
              Get detailed analytics on every player, helping you make informed
              decisions fast.
            </p>
          </div>
          <div className=" w-full">
            <p className=" text-black font-LatoNormal text-xl md:text-2xl font-semibold">
              Global Network
            </p>
            <p className=" text-black text-base md:text-lg mt-3 font-Inter font-normal">
              Connect with a thriving community of scouts, agents, and clubs
              without leaving your office.
            </p>
          </div>
        </div>
      </div>
      <Works />

      {/* For Football Fans */}
      <div className=" w-full py-16 px-4 md:px-14 lg:px-24">
        <button className=" py-2 px-6 rounded-[20px] bg-[#EFB339] text-[#231546] font-Inter font-normal text-base md:text-lg">
          For Football Fans
        </button>
        <p className=" mt-3 text-[#231546] font-LatoBold font-bold text-3xl md:text-5xl">
          For Fans Who Want More
        </p>
        <div className=" w-full mt-12 flex flex-col space-y-12 lg:space-y-0 lg:flex-row items-start justify-between">
          <div
            style={{
              backgroundImage: `url(${grandstand})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className=" w-full lg:w-[48%] rounded-[15px] h-[500px] bg-[#23154650]"
          ></div>
          <div className=" w-full lg:w-[48%] relative lg:h-[500px]">
            <p className=" text-[#231546] font-LatoBold font-bold text-3xl">
              Skoutwatch for Fans
            </p>
            <p className=" mt-3 text-[#231546] font-normal text-base md:text-lg font-Inter">
              We are bringing football excitement to a new level with advanced
              fan experiences. Soon, you’ll be able to track your favorite
              players and compare them against global talent, powered by
              Skoutwatch’s cutting-edge analytics.
            </p>
            <button className=" py-3 px-6 bg-[#231546] rounded-[30px] text-white font-Inter font-semibold text-lg text-left md:text-xl mt-8 lg:mt-0 lg:absolute left-0 bottom-0">
              Skoutwatch Fantasy coming soon...
            </button>
          </div>
        </div>
      </div>

      {/* offers */}
      <div className="w-full py-16 px-4 md:px-14 lg:px-24">
        <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className=" bg-[#2315461A] p-8 md:p-16 rounded-[40px]">
            <button className=" py-2 px-6 rounded-[20px] bg-[#EFB339] text-[#231546] font-Inter font-normal text-base">
              For Football Fans
            </button>
            <p className=" text-[#000] font-LatoBold font-bold text-3xl md:text-4xl mt-6 md:h-[80px]">
              Skoutwatch for Fans
            </p>
            <p className=" mt-3 text-[#000] font-normal text-base md:text-lg font-Inter md:h-[110px]">
              Get discovered by scouts, coaches, and international teams. Sign
              up now and create your profile to showcase your skills and stats.
            </p>
            <button className=" mt-9 py-3 px-6 bg-[#231546] rounded-[30px] text-white font-Inter font-medium text-xl ">
              Get discovered
            </button>
          </div>
          <div className=" bg-[#2315461A] p-16 rounded-[40px]">
            <button className=" py-2 px-6 rounded-[20px] bg-[#EFB339] text-[#231546] font-Inter font-normal text-base">
              For Scouts
            </button>
            <p className=" text-[#000] font-LatoBold font-bold text-3xl md:text-4xl mt-6 md:h-[80px]">
              Discover talented Players
            </p>
            <p className=" mt-3 text-[#000] font-normal text-base md:text-lg font-Inter md:h-[110px]">
              Discover the next generation of football stars. Sign up today and
              scout talented players from Africa
            </p>
            <button className=" mt-9 py-3 px-6 bg-[#231546] rounded-[30px] text-white font-Inter font-medium text-xl ">
              Browse players
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
