import React from "react";
import Sidebar from "../components/Sidebar";

const Home = () => {
  //../assets/home/background-home-mobile.jpg

  return (
    <div className="min-h-[667px] w-full min-w-[375px]  bg-[url('../public/home/background-home-mobile.jpg')]">
      <Sidebar className="animate-slide-in" />
      <div className="w-full px-8">
        <p className="navText text-center text-spaceMiddle">
          so you want to travel to
        </p>
        <p className="heading-2 text-center ">space</p>
        <p className="regularText text-center text-spaceMiddle">
          Let’s face it; if you want to go to space, you might as well genuinely
          go to outer space and not hover kind of on the edge of it. Well sit
          back, and relax because we’ll give you a truly out of this world
          experience!
        </p>
      </div>
    </div>
  );
};

export default Home;
