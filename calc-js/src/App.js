import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: "",
      output: "0",
      decimal: false,
      process: true,
      symbol: false,
      negativeVal: 0,
    };
    this.addNumber = this.addNumber.bind(this);
    this.addDecimal = this.addDecimal.bind(this);
    this.addOperator = this.addOperator.bind(this);
    this.makeCalc = this.makeCalc.bind(this);
  }

  clean = () => {
    this.setState({
      formula: "",
      output: "0",
      decimal: false,
      process: true,
      symbol: false,
      negativeVal: 0,
    });
  };

  addNumber = (e) => {
    const currentOut = this.state.output;
    const currentForm = this.state.formula;
    const val = e.target.innerText;
    //console.log(currentOut);
    if (this.state.process) {
      if (currentOut === "0") {
        this.setState({
          formula: "".concat(val),
          output: "".concat(val),
          symbol: false,
          negativeVal: 0,
        });
      } else {
        this.setState({
          formula: currentForm.concat(val),
          output: currentOut.concat(val),
          symbol: false,
          negativeVal: 0,
        });
      }
    } else {
      this.setState({
        formula: "".concat(val),
        output: "".concat(val),
        process: true,
        symbol: false,
        negativeVal: 0,
      });
    }
  };

  addDecimal = (e) => {
    const currentOut = this.state.output;
    const currentForm = this.state.formula;
    const currentDecimal = this.state.decimal;
    const val = e.target.innerText;
    if (!this.state.decimal) {
      this.setState({
        formula: currentForm.concat(val),
        output: currentOut.concat(val),
        decimal: !currentDecimal,
      });
    }
  };

  addOperator = (e) => {
    const val = e.target.innerText;
    const currentOut = this.state.output;
    let currentForm = this.state.formula;

    if (this.state.symbol === false && val !== "-") {
      if (this.state.process) {
        this.setState({
          formula: currentForm.concat(val),
          output: val,
          decimal: false,
          symbol: true,
        });
      } else {
        this.setState({
          formula: currentOut.toString().concat(val),
          output: val,
          decimal: false,
          process: true,
          symbol: true,
        });
      }
    } else if (this.state.symbol === false && val === "-") {
      if (this.state.process) {
        this.setState({
          formula: currentForm.concat(val),
          output: val,
          decimal: false,
          symbol: true,
          negativeVal: 1,
        });
      } else {
        this.setState({
          formula: currentOut.toString().concat(val),
          output: val,
          decimal: false,
          process: true,
          symbol: true,
          negativeVal: 1,
        });
      }
    } else if (
      this.state.symbol === true &&
      this.state.negativeVal === 0 &&
      val === "-"
    ) {
      if (this.state.process) {
        this.setState({
          formula: currentForm.concat(val),
          output: val,
          decimal: false,
          symbol: true,
          negativeVal: 1,
        });
      } else {
        this.setState({
          formula: currentOut.toString().concat(val),
          output: val,
          decimal: false,
          process: true,
          symbol: true,
          negativeVav: 1,
        });
      }
    } else if (
      this.state.symbol === true &&
      this.state.negativeVal === 1 &&
      val !== "-"
    ) {
      let regexToCut = /[\d]{1}[*\-+\/]{2}$/;
      let posToCut = currentForm.search(regexToCut);
      currentForm = currentForm.slice(0, posToCut + 1);

      if (this.state.process) {
        this.setState({
          formula: currentForm.concat(val),
          output: val,
          decimal: false,
          symbol: true,
          negativeVal: 0,
        });
      } else {
        this.setState({
          formula: currentOut.toString().concat(val),
          output: val,
          decimal: false,
          process: true,
          symbol: true,
          negativeVal: 0,
        });
      }
    } else if (
      this.state.symbol === true &&
      this.state.negativeVal === 1 &&
      val === "-"
    ) {
      let controlSymbols = currentForm.slice(
        currentForm.length - 2,
        currentForm.length
      );

      if (
        controlSymbols === "*-" ||
        controlSymbols === "/-" ||
        controlSymbols === "+-"
      ) {
        currentForm = currentForm.slice(0, currentForm.length);
        if (this.state.process) {
          this.setState({
            formula: currentForm,
            output: val,
            decimal: false,
            symbol: true,
            negativeVal: 2,
          });
        } else {
          this.setState({
            formula: currentOut.toString(),
            output: val,
            decimal: false,
            process: true,
            symbol: true,
            negativeVal: 2,
          });
        }
      } else {
        /**aqui tengo que permitir agregar otro menos y mandar ese output como #-(-#)*/
        if (this.state.process) {
          this.setState({
            formula: currentForm.concat(val),
            output: val,
            decimal: false,
            symbol: true,
            negativeVal: 2,
          });
        } else {
          this.setState({
            formula: currentOut.toString().concat(val),
            output: val,
            decimal: false,
            process: true,
            symbol: true,
            negativeVal: 2,
          });
        }
      }
    }
  };

  makeCalc = (e) => {
    const currentOut = this.state.output;
    let currentForm = this.state.formula;
    const val = e.target.innerText;
    const lastCh = currentForm.charAt(currentForm.length - 1);
    let regexToIdentify = /^\d*[-]{2}\d*$/;
    let minPos = currentForm.indexOf("--");

    //to identify "8--8" and transformTo "8-(-8)"
    if (regexToIdentify.test(currentForm)) {
      currentForm = currentForm
        .slice(0, minPos)
        .concat("-(-")
        .concat(currentForm.slice(minPos + 2, currentForm.length))
        .concat(")");
    }

    //to identify "9+5-" and just evaluate "9+5"
    if (lastCh === "+" || lastCh === "*" || lastCh === "/" || lastCh === "-") {
      currentForm = currentForm.slice(0, currentForm.length - 1);
    }

    const result = eval(currentForm);

    this.setState({
      formula: currentForm.concat(val).concat(result),
      output: result,
      decimal: false,
      process: false,
    });
  };

  render() {
    const { formula, output } = this.state;
    return (
      <div id="app">
        <div id="calculadora">
          <div className="formula-screen">{formula}</div>
          <div className="output-screen" id="display">
            {output}
          </div>
          <div id="buttons-container">
            <div className="button" id="clear" onClick={this.clean}>
              AC
            </div>
            <div className="button" id="divide" onClick={this.addOperator}>
              /
            </div>
            <div className="button" id="multiply" onClick={this.addOperator}>
              *
            </div>
            <div className="button" id="seven" onClick={this.addNumber}>
              7
            </div>
            <div className="button" id="eight" onClick={this.addNumber}>
              8
            </div>
            <div className="button" id="nine" onClick={this.addNumber}>
              9
            </div>
            <div className="button" id="subtract" onClick={this.addOperator}>
              -
            </div>
            <div className="button" id="four" onClick={this.addNumber}>
              4
            </div>
            <div className="button" id="five" onClick={this.addNumber}>
              5
            </div>
            <div className="button" id="six" onClick={this.addNumber}>
              6
            </div>
            <div className="button" id="add" onClick={this.addOperator}>
              +
            </div>
            <div className="button" id="one" onClick={this.addNumber}>
              1
            </div>
            <div className="button" id="two" onClick={this.addNumber}>
              2
            </div>
            <div className="button" id="three" onClick={this.addNumber}>
              3
            </div>
            <div className="button" id="equals" onClick={this.makeCalc}>
              =
            </div>
            <div className="button" id="zero" onClick={this.addNumber}>
              0
            </div>
            <div className="button" id="decimal" onClick={this.addDecimal}>
              .
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
