import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import data from "../data.json";

const tabletStyle =
  "md:bg-[url('../public/crew/background-crew-tablet.jpg')] md:min-w-[768px] md:min-h-[1024px]";
const desktopStyle =
  "lg:bg-[url('../public/crew/background-crew-desktop.jpg')] lg:w-full lg:min-h-[900px] ";

const Crew = () => {
  const [selected, setSelected] = useState("Douglas Hurley");
  const [info, setInfo] = useState({});

  useEffect(() => {
    data.crew.map((item) => {
      if (item.name === selected) {
        setInfo(item);
      }
    });
  }, [selected]);

  return (
    <div
      className={`relative block min-h-[667px] w-screen min-w-[375px]  bg-[url('../public/crew/background-crew-mobile.jpg')] bg-cover ${tabletStyle} ${desktopStyle} overflow-hidden `}
    >
      <Sidebar className="animate-slide-in" />
      <div className="navText w-3/5 mx-auto text-center md:heading-5 md:text-[20px] md:mt-8 md:text-left md:w-full md:ml-8 lg:text-[28px] lg:tracking-[4.72px] lg:ml-[8rem] lg:mt-[3rem]">
        <span className="mr-2 text-obscureTone font-bold">02</span>
        meet your crew
      </div>
      <div className="flex flex-col items-center w-full p-4 mt-[15px] md:flex-col-reverse md:py-0 lg:flex-row-reverse lg:w-[85%] lg:mx-auto lg:mt-0 lg:p-0">
        {/* first section */}
        <div className="w-full h-[223px] flex justify-center border-b-[1px] border-b-obscureTone md:h-[532px] md:border-b-0 lg:h-[700px] lg:justify-end">
          <img
            src={
              process.env.PUBLIC_URL +
              `/crew/image-${selected.toLowerCase().split(" ").join("-")}.png`
            }
            alt="Captiani"
            className="h-full"
          />
        </div>
        {/* second section */}
        <div className="flex flex-col w-full mt-[2rem] items-center md:max-w-[460px] md:flex-col-reverse md:mt-0 md:mb-[2rem] lg:max-w-[488px] lg:items-start">
          <MenuCrew selected={selected} setSelected={setSelected} />
          <div className="w-full flex flex-col items-center mt-[2rem] lg:items-start">
            <div className="subHeading-1 text-[16px] text-obscureTone md:text-[24px] lg:text-[32px]">
              {info.role}
            </div>
            <div className="subHeading-1 text-[24px] md:text-[40px] lg:text-[56px]">
              {info.name}
            </div>
            <div className="regularText leading-[25px] text-center p-4 text-textInfoTone mb-[3rem] md:text-[16px] md:leading-[28px] md:mb-[1rem] lg:pl-0 lg:text-left lg:max-w-[444px] lg:text-[18px] lg:leading-[32px]">
              {info.bio}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuCrew = ({ selected, setSelected }) => {
  const crew = [
    "Douglas Hurley",
    "Mark Shuttleworth",
    "Victor Glover",
    "Anousheh Ansari",
  ];
  return (
    <div className="flex w-1/4 h-[10px] justify-between lg:w-1/3 lg:h-[15px] lg:mt-[120px]">
      {crew.map((item, idx) => {
        return (
          <div
            className={`w-[10px] h-[10px] rounded-full lg:h-[15px] lg:w-[15px] cursor-pointer hover:bg-textInfoTone ${
              selected === item ? "bg-white" : "bg-obscureTone"
            }`}
            key={idx}
            onClick={() => setSelected(item)}
          ></div>
        );
      })}
    </div>
  );
};

export default Crew;
