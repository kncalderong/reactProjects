import React, { useState } from "react";

import data from "./data.json";

const categories = ["daily", "weekly", "monthly"];

function App() {
  const [category, setCategory] = useState("daily");

  return (
    <div className="container">
      <div className="grid-container">
        <div className="user">
          <div className="user-info">
            <div className="photo-container">
              <img
                src={process.env.PUBLIC_URL + "/images/image-jeremy.png"}
                alt="profile photo"
                className="img"
              />
            </div>
            <div className="report">report for</div>
            <div className="name">jeremy robson</div>
          </div>
          <div className="categories">
            {categories.map((item, idx) => {
              return (
                <div className="category" key={idx}>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        {data.map((item, idx) => {
          return <Item key={idx} info={item} />;
        })}
      </div>
    </div>
  );
}

const Item = ({ info }) => {
  const nameItem = info.title.toLowerCase().split(" ")[0];
  return (
    <div className={`item ${nameItem} `}>
      <img
        src={`${process.env.PUBLIC_URL}/images/icon-${nameItem}.svg`}
        alt=""
        className="item-icon"
      />
      <div className="item-info">{info.title}</div>
    </div>
  );
};

export default App;
