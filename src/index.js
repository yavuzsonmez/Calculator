import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Keypad extends React.Component {
  constructor(props) {
  super(props);
}
  render(){
    return (
        <div class="center-div">
          <div id="display"><p id="disp">{this.props.result}</p></div>
      <div id="calculator">
        <div id="line1">
          <button name="AC" id="clear" onClick={e => this.props.onClick(e.target.name)}>AC</button>
          <button name="/" id="divide" onClick={e => this.props.onClick(e.target.name)}>/</button>
          <button name="*" id="multiply" onClick={e => this.props.onClick(e.target.name)}>x</button>
        </div>
        <div id="line2">
          <button name="7" id="seven" onClick={e => this.props.onClick(e.target.name)}>7</button>
          <button name="8" id="eight" onClick={e => this.props.onClick(e.target.name)}>8</button>
          <button name="9" id="nine" onClick={e => this.props.onClick(e.target.name)}>9</button>
          <button name="-" id="subtract" onClick={e => this.props.onClick(e.target.name)}>-</button>
        </div>
        <div id="line3">
          <button name="4" id="four" onClick={e => this.props.onClick(e.target.name)}>4</button>
          <button name="5" id="five" onClick={e => this.props.onClick(e.target.name)}>5</button>
          <button name="6" id="six" onClick={e => this.props.onClick(e.target.name)}>6</button>
          <button name="+" id="add" onClick={e => this.props.onClick(e.target.name)}>+</button>
        </div>
        <div id="line4">
          <button name="1" id="one" onClick={e => this.props.onClick(e.target.name)}>1</button>
          <button name="2" id="two" onClick={e => this.props.onClick(e.target.name)}>2</button>
          <button name="3" id="three" onClick={e => this.props.onClick(e.target.name)}>3</button>
          <button name="=" id="equals" onClick={e => this.props.onClick(e.target.name)}>=</button>
        </div>
        <div id="line5">
          <button name="0" id="zero" onClick={e => this.props.onClick(e.target.name)}>0</button>
          <button name="." id="decimal" onClick={e => this.props.onClick(e.target.name)}>.</button>
        </div>
        </div><h3>Designed & Coded by <a href="yavuzsonmez.com">Yavuz Sönmez</a></h3>
        <h3><a href="yavuzsonmez.com/portofolio">Return to my Portofolio </a></h3>
        
        </div>
    )}};

class App extends React.Component {
    constructor(){
        super();

        this.state = {
            result: "0"
        }
   this.onClick = this.onClick.bind(this);
   this.calculate = this.calculate.bind(this);
   this.reset = this.reset.bind(this);
    }

    onClick = button => {

        if(button === "="){
            this.calculate();
        }

        else if(button === "AC"){
            this.reset()
        }
        else if(button === "."){
          if (this.state.result[this.state.result.length - 1] === "." || this.state.result[this.state.result.length - 2] === ".")
            this.setState({
                result: this.state.result
            })
          else
            this.setState({
                result: this.state.result + button
            })
        }
        else {
          if (this.state.result === "0")
            this.setState({
                result: button
            })
          else
            this.setState({
                result: this.state.result + button
            })
        }
    };

    calculate = () => {

      const regex = /[-+\/*]{2,}/g;
const regx = /[-+\/*]/g;
      
    const regex_counter = (toTest) =>{
        let count = 0;
        let string = toTest;
        while (regx.exec(string) !== null) {
          ++count;
        }
        return count;
      }
      
      const trimmer = (toTest) =>{
        let string = toTest;
        let index = string.search(regx);
        let arr = string.split('');
        if(regex.test(string) === true){
          let count = regex_counter(string);
          while (count > 1 && arr[count] !== "-"){
            arr.splice(index, 1);
            count--;
          }
        }
        return arr.join("");
      }

      this.setState({
          result: eval(trimmer(this.state.result))
      })
    };

    reset = () => {
        this.setState({
            result: "0"
        })
    };

render() {
    return (
    <div>
<Keypad onClick={this.onClick} result={this.state.result} />
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('root'));