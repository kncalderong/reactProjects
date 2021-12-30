import randomFrases from "./data";

import React, { useState } from "react";

var colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

const App = () => {
  const f = Math.floor(Math.random() * randomFrases.length);
  const c = Math.floor(Math.random() * colors.length);
  let [frase, setFrase] = useState(randomFrases[f].quote);
  let [autor, setAutor] = useState(randomFrases[f].author);
  let [color, setColor] = useState(colors[c]);

  const randomQuote = () => {
    console.log("this func is exectured");
    let randomNumberFunc = () => {
      return Math.floor(Math.random() * randomFrases.length);
    };
    let randomColorFunc = () => {
      return Math.floor(Math.random() * colors.length);
    };

    let randomNumber = randomNumberFunc();
    let randomColor = randomColorFunc();

    while (frase === randomFrases[randomNumber].quote) {
      randomNumber = randomNumberFunc();
    }
    while (color === colors[randomColor]) {
      randomColor = randomColorFunc();
    }
    setFrase(randomFrases[randomNumber].quote);
    setAutor(randomFrases[randomNumber].author);
    setColor(colors[randomColor]);
  };

  return (
    <div id="container" style={{ backgroundColor: color }}>
      <div className="quoteText">
        &ldquo;<span id="text">{frase}</span>&rdquo;
      </div>

      <div className="quoteAuthor">
        - <span id="author">{autor}</span>
      </div>

      <div className="buttons">
        <a
          className="button"
          id="tweet-quote"
          title="Tweet this quote!"
          target="_blank"
          href="twitter.com/intent/tweet"
        >
          <img
            id="tweet-icon"
            src="https://img.icons8.com/material/452/twitter--v1.png"
          />
        </a>
        <ButtonQuote randomQuote={randomQuote} color={color} />
      </div>
    </div>
  );
};

const ButtonQuote = ({ randomQuote, color }) => {
  const [hover, setHover] = useState(false);
  const toggleHover = () => {
    setHover(!hover);
  };
  const buttonBackground = hover
    ? {
        backgroundColor: color,
        borderColor: color,
        color: "#fff",
      }
    : {
        backgroundColor: "#fff",
      };
  return (
    <button
      id="new-quote"
      className="button"
      onClick={randomQuote}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      style={buttonBackground}
    >
      New quote
    </button>
  );
};

export default App;
