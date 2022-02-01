import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import data from "../data.json";

const tabletStyle =
  "md:bg-[url('../public/technology/background-technology-tablet.jpg')] md:min-w-[768px] md:min-h-[1024px]";
const desktopStyle =
  "lg:bg-[url('../public/technology/background-technology-desktop.jpg')] lg:w-full lg:min-h-[900px] ";

const Technology = () => {
  const [selected, setSelected] = useState("Launch vehicle");
  const [info, setInfo] = useState({});

  useEffect(() => {
    data.technology.map((item) => {
      if (item.name === selected) {
        setInfo(item);
      }
      return null;
    });
  }, [selected]);

  return (
    <div
      className={`relative block min-h-[667px] w-screen min-w-[375px]  bg-[url('../public/technology/background-technology-mobile.jpg')] bg-cover ${tabletStyle} ${desktopStyle} overflow-hidden `}
    >
      <Sidebar className="animate-slide-in" />
      <div className="navText w-3/5 mx-auto text-center md:heading-5 md:text-[20px] md:mt-8 md:text-left md:w-full md:ml-8 lg:text-[28px] lg:tracking-[4.72px] lg:ml-[8rem] lg:mt-[3rem]">
        <span className="mr-2 text-obscureTone font-bold">03</span>
        space launch 101
      </div>
      <div className="flex flex-col w-full items-center mt-[30px] md:mt-[3rem] lg:flex-row-reverse lg:mt-[5rem]">
        {/* first section */}
        <div className="w-full mb-[2rem] md:mb-[2.75rem] lg:max-w-[515px]  lg:mb-0">
          <img
            src={
              process.env.PUBLIC_URL +
              `/technology/image-${selected
                .toLowerCase()
                .split(" ")
                .join("-")}-landscape.jpg`
            }
            alt="launch-vehicle"
            className="w-full block object-cover lg:hidden"
          />
          <img
            src={
              process.env.PUBLIC_URL +
              `/technology/image-${selected
                .toLowerCase()
                .split(" ")
                .join("-")}-portrait.jpg`
            }
            alt="launch-vehicle"
            className="w-full hidden object-cover lg:block"
          />
        </div>
        {/*second section */}
        <div className="flex flex-col items-center w-[90%] lg:flex-row lg:justify-center ">
          <MenuTech selected={selected} setSelected={setSelected} />
          <div className="flex flex-col items-center lg:items-start lg:ml-[80px]">
            <div className="subHeading-2 text-textInfoTone md:navText md:mb-[0.5rem]">
              the terminology...
            </div>
            <div
              className="subHeading-1 text-[24px] mb-[1rem] md:heading-3 md:text-[40px]
             lg:text-[56px]"
            >
              {info.name}
            </div>
            <div className="regularText leading-[25px] text-textInfoTone text-center md:max-w-[460px] md:leading-[28px] md:text-[16px] lg:leading-[32px] lg:text-[18px] lg:text-left">
              {info.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuTech = ({ selected, setSelected }) => {
  const tech = ["Launch vehicle", "Spaceport", "Space capsule"];
  const activeStyle = "bg-white text-black";

  return (
    <div className="flex gap-[1rem] mb-[2rem] lg:flex-col lg:gap-[2rem] lg:mb-0 lg:h-full ">
      {tech.map((item, idx) => {
        return (
          <div
            key={idx}
            className={`w-[40px] h-[40px] cursor-pointer border-[1px] border-obscureTone rounded-full flex justify-center items-center md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] hover:border-white hover:border-[2px] ${
              selected === item && activeStyle
            }`}
            onClick={() => setSelected(item)}
          >
            <div className="subHeading-1 text-[16px] md:text-[24px] lg:text-[32px]">
              {idx + 1}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Technology;
