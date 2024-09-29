import { useState } from "react";
import logo from "./assets/logo.svg";
import home from "./assets/home.svg";
import ranking from "./assets/ranking.svg";
import setting from "./assets/setting.svg";
import video from "./assets/video-play.svg";
import search from "./assets/user-search.svg";
import medal from "./assets/medal-star.svg";
import down from "./assets/arrow-down.svg";
import searc from "./assets/search-normal.svg";
import profile from "./assets/profile-circle.svg";

const Navbar = () => {
  const menuItems = [
    { name: "Overview", icon: home },
    { name: "Videos", icon: video },
    { name: "Contest", icon: ranking },
    { name: "Players", icon: search },
    { name: "Leaderboard", icon: medal },
  ];

  const [active, setActive] = useState("Players"); // Set default active item

  const handleClick = (name) => {
    setActive(name);
  };

  return (
    <>
      <div className="w-full border-b border-[#EAEBF0] flex items-center justify-between px-8 fixed top-0 left-0 bg-white z-50">
        <img src={logo} className="py-4" alt="Skoutwatch logo" />
        <div className="flex justify-between items-center space-x-3">
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => handleClick(item.name)}
              className={`flex items-center font-LatoNormal font-medium space-x-3 cursor-pointer px-2 transition-all py-6 duration-300
                ${
                  active === item.name
                    ? "text-[#D99A26] border-b-2 border-[#D99A26] font-semibold"
                    : "text-[#666666]"
                }`}
            >
              {/* Inline style for active/inactive icon color */}
              <img
                src={item.icon}
                alt={item.name}
                style={{
                  filter:
                    active === item.name
                      ? "invert(47%) sepia(82%) saturate(3864%) hue-rotate(9deg) brightness(99%) contrast(106%)" // #D99A26 color effect
                      : "invert(42%) sepia(0%) saturate(0%) hue-rotate(181deg) brightness(95%) contrast(83%)", // Gray color effect
                }}
              />
              <span className="text-sm">{item.name}</span>
            </div>
          ))}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-LatoNormal font-medium text-[#666666]">
              Add
            </span>
            <img src={down} alt="Dropdown" />
          </div>
        </div>
        <div className=" flex items-center space-x-6 py-4">
          <span className="relative">
            <img src={searc} className="absolute left-4 top-[17px]" alt="" />
            <input
              type="text"
              placeholder="Explore"
              className=" py-4 pr-4 rounded-[30px] bg-[#F5F5F4] text-[#666666] font-LatoNormal text-sm font-normal pl-10"
            />
          </span>
          <img src={setting} className="" alt="" />
          <img src={profile} className=" w-12 h-12" alt="" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
