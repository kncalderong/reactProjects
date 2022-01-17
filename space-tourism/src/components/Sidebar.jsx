import React, { useState } from "react";
import starLogo from "../assets/general/logo_home.svg";
import { HiMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  console.log(toggleSidebar);
  return (
    <div className="flex md:flex-row flex-col  transition-height duration-75 ease-out">
      {/*This is on the big screen */}
      <div className="hidden sm:flex ">This is the navbar on bigscreen</div>

      {/*This is on small screen */}
      <div className="flex sm:hidden flex-col relative">
        <nav className="w-full p-5 flex justify-between ">
          <img src={starLogo} alt="star-logo" className=" w-[40px] h-[40px]" />
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => {
              setToggleSidebar(!toggleSidebar);
            }}
          />
        </nav>
        {toggleSidebar && (
          <div className="absolute right-0 fixed w-2/3 bg-slate-400 h-screen z-10 animate-slide-in transition-all transition-duration-1000 ease-in-out">
            <div className="flex flex-row justify-end w-full p-5">
              <MdClose
                fontSize={40}
                style={{ color: "#d0d6f9" }}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
