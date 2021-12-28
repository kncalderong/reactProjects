import { bankOne, bankTwo } from "./data";
import React, { useState, useEffect, useRef } from "react";

const activeStyle = {
  opacity: 0.75,
  transform: "scale(0.93)",
};

const inactiveStyle = {};

const App = () => {
  const [display, setDisplay] = useState("");
  const [power, setPower] = useState(true);
  const [bank, setBank] = useState(bankOne);
  const displayRef = useRef(null);

  const updateDisplay = (name) => {
    if (power) {
      setDisplay(name);
    }
  };

  const powerControl = () => {
    setPower(!power);
    setDisplay("");
  };

  const bankControl = () => {
    if (power) {
      if (bank === bankOne) {
        setBank(bankTwo);
        setDisplay("Smooth Piano Kit");
      } else {
        setBank(bankOne);
        setDisplay("Heater Kit");
      }
    }
  };

  const powerStyle = power ? { float: "right" } : { float: "left" };
  const bankStyle = bank === bankOne ? { float: "right" } : { float: "left" };

  return (
    <div id="app">
      <div className="row" id="drum-machine">
        <Pad sounds={bank} power={power} updateDisplay={updateDisplay} />
        <div id="controls" className="col-md-6">
          <p>Power</p>
          <div className="select" onClick={powerControl}>
            <div className="select-btn" id="power-state" style={powerStyle} />
          </div>
          <div id="display" ref={displayRef}>
            {display}
          </div>
          <p>Bank</p>
          <div className="select" onClick={bankControl}>
            <div className="select-btn" id="bank-state" style={bankStyle} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Pad = ({ sounds, updateDisplay, power }) => {
  let padBank;
  if (power) {
    padBank = sounds.map((sound, idx) => {
      return (
        <Box
          text={sound.keyTrigger}
          key={idx}
          audio={sound.url}
          clip={sound.id}
          updateDisplay={updateDisplay}
          power={power}
        />
      );
    });
  } else {
    padBank = sounds.map((sound, idx) => {
      return (
        <Box
          text={sound.keyTrigger}
          key={idx}
          audio="#"
          clip=""
          updateDisplay={updateDisplay}
          power={power}
        />
      );
    });
  }
  return (
    <div id="pad-bank" className="col-md-6">
      {padBank}
    </div>
  );
};

const Box = ({ updateDisplay, text, audio, clip, power }) => {
  const audioRef = useRef(null);
  const buttonRef = useRef(null);
  const [currentStyleBtn, setCurrentStyleBtn] = useState(inactiveStyle);

  useEffect(() => {
    if (currentStyleBtn) {
      setTimeout(() => setCurrentStyleBtn(inactiveStyle), 150);
    }
  }, [currentStyleBtn]);

  useEffect(() => {
    if (power) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [power]);

  const handleKeyPress = (event) => {
    if (power) {
      if (event.key.toUpperCase() === text) {
        playSound();
      }
    }
  };

  const playSound = () => {
    if (power) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setCurrentStyleBtn(activeStyle);
      updateDisplay(clip);
    }
  };

  if (power) {
    return (
      <div
        className="box drum-pad"
        onClick={playSound}
        style={currentStyleBtn}
        id={`drum-${text}`}
        ref={buttonRef}
      >
        {text}
        <audio
          ref={audioRef}
          src={audio}
          className="clip"
          id={text}
          clip={clip}
        />
      </div>
    );
  } else {
    return (
      <div
        className="box drum-pad"
        onClick={playSound}
        style={inactiveStyle}
        id={`drum-${text}`}
        ref={buttonRef}
      >
        {text}
        <audio
          ref={audioRef}
          src={audio}
          className="clip"
          id={text}
          clip={clip}
        />
      </div>
    );
  }
};

export default App;
