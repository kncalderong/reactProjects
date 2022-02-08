import React from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/*info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam
            deserunt dolorem quo ducimus iste voluptas repudiandae ad ratione
            vel, error, totam deleniti? Adipisci aspernatur animi quas
            perspiciatis, dolore rem ducimus ut debitis explicabo rerum numquam
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
        {/*main image */}
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
