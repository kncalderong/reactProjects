import React, { useState } from "react";
import starLogo from "../assets/general/logo_home.svg";
import { HiMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div className=" w-full p-4 relative">
      {/*This is on the big screen */}
      <div className="hidden sm:flex ">This is the navbar on bigscreen</div>

      {/*This is on small screen */}
      <div className="flex sm:hidden flex-col relative w-full">
        <nav className=" p-5 flex justify-between  ">
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
        <div className="flex flex-row justify-end w-full p-5">
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
