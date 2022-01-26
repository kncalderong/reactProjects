import React from "react";
import Sidebar from "../components/Sidebar";

const tabletStyle =
  "md:bg-[url('../public/destination/background-destination-tablet.jpg')] md:min-w-[768px] md:min-h-[1024px]";
const desktopStyle =
  "lg:bg-[url('../public/destination/background-destination-desktop.jpg')] lg:w-full lg:min-h-[900px] ";

const Destination = () => {
  return (
    <div
      className={`relative block min-h-[667px] w-screen min-w-[375px]  bg-[url('../public/destination/background-destination-mobile.jpg')] bg-cover ${tabletStyle} ${desktopStyle} overflow-hidden `}
    >
      <Sidebar className="animate-slide-in" />
      <div className="navText w-3/5 mx-auto text-center">
        <span className="mr-2 text-obscureTone font-bold">01</span>
        pick your destination
      </div>
      <div className="flex flex-col items-center w-full p-4">
        {/*first section */}
        <img
          src={process.env.PUBLIC_URL + "/destination/image-moon.png"}
          alt="destination"
          className="w-[170px] h-[170px] p-4 "
        />
        {/*second section */}
        <div className="flex flex-col items-center w-full p-4">
          <div className="flex-col w-2/3  ">
            <MenuDestinations />
          </div>
          <div className="flex flex-col w-full items-center border-b-[#383b4b] border-b-[2px]">
            <div className="heading-3 mt-1">Moon</div>
            <div className="regularText leading-[25px] text-center mb-8">
              See our planet as you’ve never seen it before. A perfect relaxing
              trip away to help regain perspective and come back refreshed.
              While you’re there, take in some history by visiting the Luna 2
              and Apollo 11 landing sites.
            </div>
          </div>
        </div>
        {/*third section */}
        <div className="flex flex-col w-full p-4">
          <div className="flex flex-col  items-center mb-6">
            <div className="subHeading-2">avg. distance</div>
            <div className="subHeading-1 mt-2">384,400 km</div>
          </div>
          <div className="flex flex-col  items-center mb-6">
            <div className="subHeading-2">est. travel time</div>
            <div className="subHeading-1 mt-2">3 days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuDestinations = ({ selected }) => {
  const places = ["Moon", "Mars", "Europa", "Titan"];
  const activeStyle = "border-b-white border-b-[3px]";
  return (
    <div className="flex w-full h-[28px]">
      {places.map((item, idx) => {
        return (
          <div
            className="grow  h-full flex justify-center items-start"
            key={idx}
          >
            <div className="subHeading-2 h-full ">{item}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Destination;
