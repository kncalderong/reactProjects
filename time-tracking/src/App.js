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
                <div
                  className={`category ${
                    item === category && "category-active"
                  }`}
                  key={idx}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        {data.map((item, idx) => {
          return <Item key={idx} info={item} category={category} />;
        })}
      </div>
    </div>
  );
}

const Item = ({ info, category }) => {
  const nameItem = info.title.toLowerCase().split(" ")[0];
  console.log(info.timeframes[category]);
  return (
    <div className={`item ${nameItem} `}>
      <img
        src={`${process.env.PUBLIC_URL}/images/icon-${nameItem}.svg`}
        alt=""
        className="item-icon"
      />
      <div className="item-info">
        <div className="item-header">
          {info.title}
          <img
            src={process.env.PUBLIC_URL + "/images/icon-ellipsis.svg"}
            alt="menu-icon"
            className="item-menu"
          />
        </div>
        <div className="item-time">
          <div className="time">{`${info.timeframes[category].current}hrs`}</div>
          <div className="last-time">
            {`Last ${
              category === "weekly"
                ? "Week"
                : category === "daily"
                ? "Day"
                : category === "monthly"
                ? "Month"
                : null
            } - ${info.timeframes[category].previous}hrs`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
