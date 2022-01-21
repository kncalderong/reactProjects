import React from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const tabletStyle =
  "md:bg-[url('../public/home/background-home-tablet.jpg')] md:min-w-[768px] md:min-h-[1024px]";
const desktopStyle =
  "lg:bg-[url('../public/home/background-home-desktop.jpg')]  lg:bg-auto lg:bg-no-repeat lg:h-[900px] lg:min-h-[0px]";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-[667px] w-full min-w-[375px]  bg-[url('../public/home/background-home-mobile.jpg')] bg-cover ${tabletStyle} ${desktopStyle}`}
    >
      <Sidebar className="animate-slide-in" />
      <div className="flex flex-col lg:flex-row justify-center lg:justify-around items-center w-full md:mt-[155px] lg:mt-[255px]">
        <div className="w-full px-8 md:max-w-[500px]  ">
          <p className="navText text-center text-spaceMiddle md:heading-5">
            so you want to travel to
          </p>
          <p className="heading-2 text-center md:heading-1">space</p>
          <p className="regularText text-center text-spaceMiddle md:text-[16px] md:leading-[28px] lg:leading-[32px] lg:text-[18px] ">
            Let’s face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we’ll give you a truly out of this
            world experience!
          </p>
        </div>
        <div className="text-center mt-[6rem] flex justify-center relative">
          <div
            className="w-[150px] h-[150px] subHeading-2 text-black bg-white rounded-full flex justify-center items-center md:w-[242px] md:h-[242px] md:heading-4 lg:h-[274px] lg:w-[274px] lg:cursor-pointer relative  "
            onClick={() => {
              navigate("/destination");
            }}
          >
            {/* <div className="hidden lg:inline absolute top-0 left-0 h-[274px] w-[274px] rounded-full lg:cursor-pointer navTablet z-[-1] hover:w-[450px] hover:h-[450px] "></div> */}
            explore
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
