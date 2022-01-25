import React from "react";
import Sidebar from "../components/Sidebar";

const tabletStyle =
  "md:bg-[url('../public/destination/background-destination-tablet.jpg')] md:min-w-[768px] md:min-h-[1024px]";
const desktopStyle =
  "lg:bg-[url('../public/destination/background-destination-desktop.jpg')] lg:w-full lg:min-h-[900px] ";

const Destination = () => {
  return (
    <div
      className={`relative block min-h-[667px] w-screen h-screen min-w-[375px]  bg-[url('../public/destination/background-destination-mobile.jpg')] bg-cover ${tabletStyle} ${desktopStyle}overflow-hidden `}
    >
      <Sidebar className="animate-slide-in" />
      <div className="navText w-3/5 mx-auto">
        <span className="mr-2 text-obscureTone font-bold">01</span>
        pick your destination
      </div>
      <div className="flex-col w-full">
        <img
          src={process.env.PUBLIC_URL + "/destination/image-moon.png"}
          alt="destination"
          className="w-[170px] h-[170px]"
        />
      </div>
    </div>
  );
};

export default Destination;
