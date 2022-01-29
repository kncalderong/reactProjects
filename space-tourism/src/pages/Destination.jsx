import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import data from "../data.json";

const tabletStyle =
  "md:bg-[url('../public/destination/background-destination-tablet.jpg')] md:min-w-[768px] md:min-h-[1024px]";
const desktopStyle =
  "lg:bg-[url('../public/destination/background-destination-desktop.jpg')] lg:w-full lg:min-h-[900px] ";

const Destination = () => {
  const [selected, setSelected] = useState("Europa");
  const [info, setInfo] = useState({});
  useEffect(() => {
    data.destinations.map((item) => {
      if (item.name === selected) {
        setInfo(item);
      }
    });
  }, [selected]);

  return (
    <div
      className={`relative block min-h-[667px] w-screen min-w-[375px]  bg-[url('../public/destination/background-destination-mobile.jpg')] bg-cover ${tabletStyle} ${desktopStyle} overflow-hidden `}
    >
      <Sidebar className="animate-slide-in" />
      <div className="navText w-3/5 mx-auto text-center md:heading-5 md:text-[20px] md:mt-8 md:text-left md:w-full md:ml-8 lg:text-[28px] lg:tracking-[4.72px] lg:ml-[8rem] lg:mt-[3rem]">
        <span className="mr-2 text-obscureTone font-bold">01</span>
        pick your destination
      </div>
      <div className="flex flex-col items-center w-full p-4 lg:flex-row lg:w-[80%] lg:mx-auto lg:mt-[40px]">
        {/*first section */}
        <img
          src={
            process.env.PUBLIC_URL +
            `/destination/image-${selected.toLowerCase()}.png`
          }
          alt="destination"
          className="w-[170px] h-[170px] p-4 md:w-[300px] md:h-[300px] lg:w-[445px] lg:h-[445px] "
        />

        <div className="flex flex-col w-full md:items-center lg:items-end">
          {/*second section */}
          <div className="flex flex-col items-center w-full p-4 md:mt-8 lg:max-w-[475px] lg:p-0 lg:items-start">
            <div className="flex-col w-2/3 md:max-w-[300px] ">
              <MenuDestinations setSelected={setSelected} selected={selected} />
            </div>
            <div className="flex flex-col w-full items-center border-b-[#383b4b] border-b-[2px] md:pb-8 md:max-w-[580px] lg:pb-4 lg:items-start">
              <div className="heading-3 mt-1 md:heading-2 lg:heading-1 lg:mt-0 lg:text-[100px] ">
                {info.name}
              </div>
              <div className="regularText leading-[25px] text-center mb-8 md:text-[16px] md:leading-[28px] max-w-[575px] lg:text-[18px] lg:leading-[32px] lg:text-left lg:max-w-[445px]">
                {info.description}
              </div>
            </div>
          </div>
          {/*third section */}
          <div className="flex flex-col w-full p-4 md:flex-row md:max-w-[580px] md:justify-evenly lg:max-w-[475px] lg:justify-start">
            <div className="flex flex-col  items-center mb-6">
              <div className="subHeading-2">avg. distance</div>
              <div className="subHeading-1 mt-2">{info.distance}</div>
            </div>
            <div className="flex flex-col  items-center mb-6 lg:ml-[65px]">
              <div className="subHeading-2">est. travel time</div>
              <div className="subHeading-1 mt-2">{info.travel}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuDestinations = ({ selected, setSelected }) => {
  const places = ["Moon", "Mars", "Europa", "Titan"];
  const activeStyle = "border-b-white border-b-[3px]";
  return (
    <div className="flex w-full h-[28px] md:h-[34px]">
      {places.map((item, idx) => {
        return (
          <div
            className={`grow  h-full flex justify-center items-start lg:justify-start cursor-pointer`}
            key={idx}
            onClick={() => setSelected(item)}
          >
            <div
              className={`subHeading-2 h-full md:navText lg:toHoverNavbar ${
                selected === item && activeStyle
              }`}
            >
              {item}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Destination;
