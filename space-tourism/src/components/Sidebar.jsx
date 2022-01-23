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
  "subHeading-2 flex justify-center lg:navText lg:toHoverNavbar";
const activeStyle =
  "subHeading-2 flex items-center border-b-white border-b-[3px] h-full lg:navText";

const inactiveStyleMobile =
  "navText flex justify-start items-center  h-full w-full ";

const activeStyleMobile =
  "navText  flex justify-start items-center border-r-white border-r-[4px] h-full w-full";

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    //overflow-hidden right bellow
    <div className=" w-full relative block ">
      {/*This is on the big screen */}
      <div className="hidden md:flex ">
        <div className="relative w-full pl-8 flex justify-between min-h-[96px] items-center">
          <img src={starLogo} alt="star-logo" className=" w-[48px] h-[48px]" />
          <div className="hidden lg:inline absolute h-[1px] w-2/5 max-w-[473px] lineHome top-[50%] right-[55%] z-20"></div>

          <div className="flex w-3/5 flex-row px-4 lg:px-[90px] lg:max-w-[830px] max-w-[664px] h-full  items-center navTablet">
            {menu.map((item, idx) => (
              <div
                className="flex grow basis-1  justify-center items-center h-[31px]"
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
      <div className="flex md:hidden flex-col relative w-full ">
        <nav className=" py-5 flex justify-between px-4 ">
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

      {/*this is the sidebar properly */}
      <div
        className="absolute w-2/3 right-0 top-0  navTablet min-h-[667px] z-20 transition-all duration-200 ease-in "
        style={{
          // width: !toggleSidebar ? null : "66%",
          visibility: !toggleSidebar ? "hidden" : "visible",
          // display: !toggleSidebar ? "none" : "",
          transform: !toggleSidebar ? "translateX(100%)" : "translateX(0)",
        }}
      >
        <div className="flex flex-col ">
          <div className="flex flex-row justify-end w-full py-5 w-full">
            <MdClose
              fontSize={40}
              style={{ color: "#d0d6f9" }}
              className="cursor-pointer mr-4"
              onClick={() => setToggleSidebar(false)}
            />
          </div>
          <div className="flex flex-col w-full pt-5  mt-2 gap-4">
            {menu.map((item, idx) => {
              return (
                <div className="flex  justify-start items-center w-full h-[31px] ">
                  <NavLink
                    to={`/${item.name === "home" ? "" : item.name}`}
                    className={({ isActive }) => {
                      return isActive ? activeStyleMobile : inactiveStyleMobile;
                    }}
                  >
                    <span className="mr-2 font-bold">{item.number}</span>
                    {item.name}
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
