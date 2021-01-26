import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import {KeyPadComponent} from './buttons';
import {ResultComponent} from './result';
import { render } from '@testing-library/react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import {questions, sac19} from './sampleExam';
import {Countdown} from './timer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      question: "",
      answer:"",
      correct:0,
      status: false,
      input: '',
      score: 0,
      restart: null
    }
    this.BaseState = this.state;
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit =this.onSubmit.bind(this);
    this.startOver= this.startOver.bind(this);
  }


  startOver = () =>{
    this.setState(this.BaseState);
  }

  

  onClick = button => {
    if (button ==="start"){
      let rand = Math.floor(Math.random()* Object.keys(questions).length);
      this.latexdisplay(rand);
      this.status();
    }
    else if (button ==="reset"){
      window.location.reload();
    }
    else if(button === "C"){
        this.reset();
        this.random();

    }
    else if (button ==="_"){
      this.setState({result: this.state.result + " "})
    }
    else if (button === "<"){

    }

    else if (button === ">"){

    }

    else {
        this.setState({
            result: this.state.result + button
        })
    }
  }

  random = () =>{
    let rand = Math.floor(Math.random()* Object.keys(questions).length);
    this.latexdisplay(rand);
  }
  status = () =>{
    if (this.state.status === true){
      this.setState({status: false})
    } else{
      this.setState({status:true})
    }
  }

  latexdisplay = rand =>{
    this.setState({
      question: Object.keys(questions)[rand] 
    })
    this.setState({answer: Object.values(questions)[rand]})
  }

  reset = () =>{
    this.setState({result:""})
  }

  backspace = () =>{
    this.setState({result: this.state.result.slice(0,-1)})
  }

  onSubmit = (e) =>{
    let currentcorrect = this.state.correct;
    let currentscore = this.state.score;
     const useranswer = e.target.querySelector(
      'input[type="text"]').value;
    const addtoanswer = useranswer == this.state.answer;
    if (addtoanswer){
      this.setState({correct: currentcorrect + 1});
      this.setState({score: currentscore + 5});
      this.setState({input: ''});
      this.reset();
      this.random();
    }else{
    this.setState({input: ''});
    this.setState({score: currentscore - 4});
    this.reset();
    this.random();
    }
  }

  onHandleChange(e){
    this.setState({input: e.target.value});
  }  

  render(){
    let start = (
      <button name = "start" onClick = {e => this.onClick(e.target.name)}>Start!
      </button>
    );
    let latex = this.state.question;
    let questionDisplay = (
      <div>
      <h1>
        <BlockMath>{String.raw`${latex}`}</BlockMath>
       
      </h1>
      </div>
    );
    
    let userInput = (
    <form name = "userinput" action ="#" onSubmit = {this.onSubmit}>
    <input 
      type ="text" 
      onChange ={this.onHandleChange}
      value= {this.state.input}
      placeholder = "" /><br />
    <input type ="submit" autofocus/>
  </form>);
    
  return (
    <div className="calculator-body" >
      <h1 class = "toptitle">Number Sense Practice</h1>
      {this.state.status ? <Countdown onClick={this.onClick} score={this.status.score}/>: ''}      
      <div>{this.state.status ? questionDisplay : start}</div>
        {this.state.status ? userInput : ''}<br />
        {this.state.answer}
      <div>Questions correct: {this.state.correct} </div>
      <div>Current Score: {this.state.score}</div>
      <div>{this.state.restart ? start : ''}</div>
    </div>
    
  );
  }
}
// Add these bellow the questions correct tag for the keypad
// <ResultComponent result={this.state.result}/>
// <KeyPadComponent onClick={this.onClick}/>

export default App;
