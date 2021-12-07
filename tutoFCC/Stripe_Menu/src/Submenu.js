import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "./context";

const Submenu = () => {
  const {
    isSubmenuOpen,
    location,
    page: { page, links }, //comes from the hoover assign of info
  } = useGlobalContext();

  //ref to add inline style of position
  const container = useRef(null);
  //state to responsive size of submenu
  const [columns, setColumns] = useState("col-2");

  //to fix the coordinates of the submenu every time is hoovering a different one
  useEffect(() => {
    setColumns("col-2"); //to start clean the sizing

    const submenu = container.current;
    const { center, bottom } = location;
    console.log(links.length);
    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;

    if (links.length === 3) {
      setColumns("col-3");
    }
    if (links.length === 4) {
      setColumns("col-4 ");
    }
  }, [location]);

  return (
    <aside className={`submenu ${isSubmenuOpen && "show"}`} ref={container}>
      <h4>{page}</h4>
      <div className={`submenu-center ${columns}`}>
        {links.map((link, index) => {
          const { label, icon, url } = link;
          return (
            <a href={url} key={index}>
              {icon}
              {label}
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default Submenu;
