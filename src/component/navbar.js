import { Link } from "react-router-dom";
import logo from "./assets/logo.svg";

const Navbar = () => {
  function overlay() {
    //check classlist
    const overlayDiv = document.getElementById("overlay");
    if (overlayDiv.classList.contains("-translate-y-[500px]")) {
      overlayDiv.classList.remove("-translate-y-[500px]");
    } else if (!overlayDiv.classList.contains("-translate-y-[500px]")) {
      overlayDiv.classList.add("-translate-y-[500px]");
    }
  }

  return (
    <>
      <div
        id="overlay"
        className=" w-full bg-[#000] backdrop-blur-xl h-[350px] p-6 flex justify-center items-center -translate-y-[500px] shadow transition-all duration-700 top-[78px] fixed z-[99]"
      >
        <div className="w-full flex flex-col justify-center items-center space-y-5">
          <Link to="/">
            <p className=" font-Inter text-[15px] font-semibold text-[#fff]">
              Home
            </p>
          </Link>
          <Link to="/">
            <p className=" font-Inter text-[15px] font-semibold text-[#fff]">
              Pricing
            </p>
          </Link>
          <Link to="/">
            <p className=" font-Inter text-[15px] font-semibold text-[#fff]">
              Contact Us
            </p>
          </Link>
          <Link to="/">
            <p className=" font-Inter text-[15px] font-semibold text-[#fff]">
              About Us
            </p>
          </Link>
          <div className=" flex md:hidden z-50 items-center  mt-6">
            <div className=" flex items-center space-x-6">
              <p className=" font-Inter text-[#fff] font-semibold text-[15px]">
                Login
              </p>
              <button className="px-5 py-3 font-Inter text-base rounded-[40px] font-medium shadow bg-[#EFB339] text-white">
                Join the waitlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" py-5 px-4 md:px-14 lg:px-24 flex items-center justify-between bg-transparent">
        <div className=" flex items-center space-x-16">
          <img src={logo} className=" w-[80%] md:w-auto" alt="" />
          {/* <div className=" hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className="  font-Inter font-semibold text-[#FFFFFF] text-[15px]"
            >
              Home
            </Link>
            <Link
              to="/"
              className="  font-Inter font-semibold text-[#FFFFFF] text-[15px]"
            >
              Pricing
            </Link>
            <Link
              to="/"
              className="  font-Inter font-semibold text-[#FFFFFF] text-[15px]"
            >
              Contact Us
            </Link>
            <Link
              to="/"
              className="  font-Inter font-semibold text-[#FFFFFF] text-[15px]"
            >
              About
            </Link>
          </div> */}
        </div>
        <div className=" flex items-center space-x-5">
          <div className=" flex items-center space-x-3 md:space-x-6">
            <p className=" font-Inter text-white font-semibold text-xs md:text-[15px]">
              Login
            </p>
            <button
              style={{ boxShadow: "0px 1px 2px 0px #1018280A" }}
              className=" bg-[#EFB339] py-3 px-[18px] rounded-[40px] text-white font-Outfit font-medium text-xs md:text-[15px]"
            >
              Join the waitlist
            </button>
          </div>
          <div onClick={overlay} className="menu-icon hidden">
            <input className="menu-icon__cheeckbox" type="checkbox" />
            <div>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
