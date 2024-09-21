import strikes from "./assets/strikes.svg";
import logo from "./assets/logoFt.svg";
import { Link } from "react-router-dom";
import fb from "./assets/fb.svg";
import twi from "./assets/twi.svg";
import ig from "./assets/ig.svg";

const Footer = () => {
  return (
    <>
      {/* banner */}
      <div
        style={{
          backgroundImage: `url(${strikes})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className=" bg-[#ECC755] w-full py-16 px-4 md:px-14 lg:px-24 flex flex-col text-center items-center"
      >
        <p className=" text-[#000000] font-LatoBold font-bold text-5xl mt-6 md:h-[80px]">
          Skoutwatch for Fans
        </p>
        <p className=" mt-3 text-[#000000CC] font-normal text-lg text-center font-Inter lg:w-[900px]">
          Join thousands of scouts, agents, and clubs who are discovering
          world-class talent. With Skoutwatch, your next great player is just a
          video away.
        </p>
        <button className=" mt-12 py-3 px-6 bg-[#231546] rounded-[30px] text-white font-Inter font-normal text-base ">
          Get started today
        </button>
      </div>

      {/* footer */}
      <div className="w-full py-16 px-4 md:px-14 lg:px-24">
        <div className=" pb-8 flex flex-col md:flex-row space-y-8 md:space-y-0 items-center justify-between w-full border-b border-[#EAEBF0]">
          <img src={logo} alt="" />
          <div className=" flex items-center space-x-10">
            <Link
              to="/"
              className=" font-LatoNormal font-medium text-[#5F6D7E] text-[15px]"
            >
              Home
            </Link>
            <Link
              to="/"
              className=" font-LatoNormal font-medium text-[#5F6D7E] text-[15px]"
            >
              Pricing
            </Link>
            <Link
              to="/"
              className=" font-LatoNormal font-medium text-[#5F6D7E] text-[15px]"
            >
              Contact Us
            </Link>
            <Link
              to="/"
              className=" font-LatoNormal font-medium text-[#5F6D7E] text-[15px]"
            >
              About
            </Link>
          </div>
          <span className=" flex items-center space-x-5">
            {/* <img src={fb} alt="" /> */}
            <Link to="https://twitter.com/skoutwatch" target="_blank">
              <img src={twi} alt="" />
            </Link>
            <Link to="https://www.instagram.com/skoutwatch/" target="_blank">
              <img src={ig} alt="" />
            </Link>
          </span>
        </div>
        <p className=" text-center mt-8 text-[#5F6D7E] font-LatoNormal font-normal text-base">
          © 2024 skoutwatch. All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
