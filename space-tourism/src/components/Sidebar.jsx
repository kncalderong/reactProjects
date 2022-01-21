import React, { useState } from "react";
import starLogo from "../assets/general/logo_home.svg";
import { HiMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";

const menu = [
  { name: "home", number: "00" },
  { name: "destination", number: "01" },
  { name: "crew", number: "02" },
  { name: "technology", number: "03" },
];

const inactiveStyle =
  "subHeading-2 basis-1 grow flex justify-center lg:navText lg:toHoverNavbar";
const activeStyle =
  "subHeading-2 flex items-center border-b-white border-b-[3px] h-full lg:navText";

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div className=" w-full relative">
      {/*This is on the big screen */}
      <div className="hidden md:flex ">
        <div className="relative w-full pl-8 flex justify-between min-h-[96px] items-center">
          <img src={starLogo} alt="star-logo" className=" w-[48px] h-[48px]" />
          <div className="hidden lg:inline absolute h-[1px] w-2/5 max-w-[473px] lineHome top-[50%] right-[55%] z-20"></div>

          <div className="flex w-3/5 flex-row px-4 lg:px-[90px] lg:max-w-[830px] max-w-[664px] h-full  items-center navTablet">
            {menu.map((item, idx) => (
              <div
                className="flex basis-1 grow justify-center items-center h-full"
                key={idx}
              >
                <NavLink
                  to={`/${item.name === "home" ? "" : item.name}`}
                  className={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                >
                  <span className="hidden lg:inline mr-2 font-bold">
                    {item.number}
                  </span>
                  {item.name}
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*This is on small screen */}
      <div className="flex md:hidden flex-col relative w-full p-4">
        <nav className=" py-5 flex justify-between  ">
          <img src={starLogo} alt="star-logo" className=" w-[40px] h-[40px]" />
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => {
              setToggleSidebar(!toggleSidebar);
            }}
            color="white"
          />
        </nav>
      </div>
      <div
        className="absolute right-0 top-0 fixed bg-slate-400 w-2/3 min-h-[667px] z-10 transition-all duration-200 ease-in p-4"
        style={{
          width: !toggleSidebar ? "0" : "66%",
          visibility: !toggleSidebar ? "hidden" : "visible",
        }}
      >
        <div className="flex flex-row justify-end w-full py-5">
          <MdClose
            fontSize={40}
            style={{ color: "#d0d6f9" }}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
