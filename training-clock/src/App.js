import React from "react";
import {
  FaPlay,
  FaPause,
  FaSync,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

const accurateInterval = function (fn, time) {
  var cancel, nextAt, timeout, wrapper;
  nextAt = new Date().getTime() + time;
  timeout = null;
  wrapper = function () {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function () {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel,
  };
};

/*var timer = accurateInterval(function() {
  console.log('message you will see every second!');
}, 1000);

//console.log(timer)
timer.cancel();*/

const activeBtnStyle = {
  opacity: 0.75,
  transform: "scale(0.93)",
};
const inactiveBtnStyle = {};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLenght: 5,
      sessionLenght: 25,
      timerState: "stopped",
      timerType: "session",
      timer: 1500,
      intervalID: "",
      round: 1,
      alarmColor: { color: "black" },
    };
    this.display = React.createRef();
    this.lenghtRegulator = this.lenghtRegulator.bind(this);
    this.styleRegulator = this.styleRegulator.bind(this);
  }

  styleRegulator = (target) => {
    if (target.opacity === "0.75") {
      target.opacity = "";
      target.transform = "";
      return target;
    } else {
      target.opacity = 0.75;
      target.transform = "scale(0.93)";
      return target;
    }
  };

  lenghtRegulator = (e) => {
    if (this.state.timerState === "running") {
      return;
    }
    const { sessionLenght, breakLenght, timer } = this.state;
    const target = e.currentTarget.style;

    if (e.currentTarget.value === "+Session") {
      if (sessionLenght + 1 <= 60) {
        this.setState({
          sessionLenght: sessionLenght + 1,
          timer: timer + 60,
        });
      }
      this.styleRegulator(target);
      setTimeout(() => this.styleRegulator(target), 150);
    } else if (e.currentTarget.value === "-Session") {
      if (sessionLenght - 1 >= 1) {
        this.setState({
          sessionLenght: sessionLenght - 1,
          timer: timer - 60,
        });
      }
      this.styleRegulator(target);
      setTimeout(() => this.styleRegulator(target), 150);
    } else if (e.currentTarget.value === "+Break") {
      if (breakLenght + 1 <= 60) {
        this.setState({
          breakLenght: breakLenght + 1,
        });
      }
      this.styleRegulator(target);
      setTimeout(() => this.styleRegulator(target), 150);
    } else if (e.currentTarget.value === "-Break") {
      if (breakLenght - 1 >= 1) {
        this.setState({
          breakLenght: breakLenght - 1,
        });
      }
      this.styleRegulator(target);
      setTimeout(() => this.styleRegulator(target), 150);
    }
  };

  timerControl = (e) => {
    const target = e.currentTarget.style;
    this.styleRegulator(target);
    setTimeout(() => this.styleRegulator(target), 150);

    if (this.state.timerState === "stopped") {
      let displayTarget = this.display.current.style;
      this.styleRegulator(displayTarget);
      setTimeout(() => this.styleRegulator(displayTarget), 150);

      this.beginCountDown();
      this.setState({
        timerState: "running",
      });
    } else {
      this.setState({
        timerState: "stopped",
      });
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
    }
  };

  beginCountDown = () => {
    this.setState({
      intervalID: accurateInterval(() => {
        this.decrementTimer();
        this.phaseControl();
      }, 1000),
    });
  };

  decrementTimer = () => {
    this.setState({
      timer: this.state.timer - 1,
    });
  };

  phaseControl = () => {
    let { timer } = this.state;
    this.warning(timer);
    this.buzzer(timer);
    if (timer < 0) {
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
      if (this.state.timerType === "session") {
        this.beginCountDown();
        this.switchTimer(this.state.breakLenght * 60, "break");
      } else {
        this.beginCountDown();
        this.switchTimer(this.state.sessionLenght * 60, "session");
      }
    }
  };

  switchTimer = (num, str) => {
    this.setState({
      timer: num,
      timerType: str,
      alarmColor: { color: "black" },
    });
  };

  buzzer(_timer) {
    if (_timer === 0) {
      this.audioBeep.play();
    }
  }
  warning(_timer) {
    if (_timer < 61) {
      this.setState({ alarmColor: { color: "#a50d0d" } });
    } else {
      this.setState({ alarmColor: { color: "black" } });
    }
  }

  reset = (e) => {
    const target = e.currentTarget.style;
    this.setState({
      breakLenght: 5,
      sessionLenght: 25,
      timerState: "stopped",
      timerType: "session",
      timer: 1500,
      intervalID: "",
      round: 1,
      alarmColor: { color: "black" },
    });
    this.styleRegulator(target);
    setTimeout(() => this.styleRegulator(target), 150);
    if (this.state.intervalID) {
      this.state.intervalID.cancel();
    }
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  };

  clockify() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  }

  render() {
    let { sessionLenght, breakLenght, timerState, alarmColor, timerType } =
      this.state;

    return (
      <div id="app">
        <div className="container">
          <h1>Training Clock</h1>
          <div className="length-control">
            <div className="session">
              <p id="session-label">Session Length</p>
              <button
                className="btn"
                value="+Session"
                onClick={this.lenghtRegulator}
                id="session-increment"
              >
                <FaArrowUp />
              </button>
              <div id="session-length">{sessionLenght}</div>
              <button
                className="btn"
                value="-Session"
                onClick={this.lenghtRegulator}
                id="session-decrement"
              >
                <FaArrowDown />
              </button>
            </div>
            <div className="break">
              <p id="break-label">Break Length</p>
              <button
                className="btn"
                value="+Break"
                onClick={this.lenghtRegulator}
                id="break-increment"
              >
                <FaArrowUp />
              </button>
              <div id="break-length">{breakLenght}</div>
              <button
                className="btn"
                value="-Break"
                onClick={this.lenghtRegulator}
                id="break-decrement"
              >
                <FaArrowDown />
              </button>
            </div>
          </div>

          <div className="control-display">
            <div className="display" style={alarmColor} ref={this.display}>
              <p id="timer-label">{timerType}</p>
              <div className="time" id="time-left">
                {this.clockify()}
              </div>
            </div>
            <div className="buttons">
              <div
                className="start-pause btn"
                id="start_stop"
                onClick={this.timerControl}
              >
                <FaPlay /> <FaPause />
              </div>
              <div className="reset btn" onClick={this.reset} id="reset">
                <FaSync />
              </div>
            </div>
          </div>
          <audio
            id="beep"
            preload="auto"
            ref={(audio) => {
              this.audioBeep = audio;
            }}
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          />
        </div>
      </div>
    );
  }
}

export default App;
