import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {KeyPadComponent} from './buttons';
import {ResultComponent} from './result';
import { render } from '@testing-library/react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import {sac99, invA99, invB99,disA99,disB99,reg99} from './1999';
import {Countdown} from './timer';

const questions = [sac99,invA99,invB99,disA99,disB99,reg99];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // result: "",
      question: "",
      answer:"",
      correct:0,
      status: false,
      current:0,
      input: '',
      score: 0,
      restart: null,
      timevalue: 10,
      exam : []
    }
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit =this.onSubmit.bind(this);
    this.changetime = this.changetime.bind(this);
  }
  score = () => {
    return this.state.score;
  }
  

  onClick = button => {
    if (button ==="start"){
      this.random()
      this.status();
    }
    else if (button ==="reset"){
      window.location.reload();
    }

    // else{
      // this.setState({result: this.state.result + button})
   // }
  }

  random = () =>{
    let rand = Math.floor(Math.random()* questions.length);
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
      question: Object.keys(questions[rand])[this.state.current] 
    });
    this.setState({answer: Object.values(questions[rand])[this.state.current]});
  }

  /* reset = () =>{
    this.setState({result:""})
  }
  */

  onSubmit = (e) =>{
    let currentcorrect = this.state.correct;
    let currentscore = this.state.score;
    let currentquestion = this.state.current;
     const useranswer = e.target.querySelector(
      'input[type="text"]').value;
    let addtoanswer;
    if (typeof(this.state.answer) =='number'){
        let top = 1.05*this.state.answer;
        let bottom =0.95 * this.state.answer;
        addtoanswer = (useranswer < top && useranswer > bottom )
      }
    else if (typeof(this.state.answer) =='array'){
      addtoanswer =(useranswer== this.state.answer[0] || useranswer == this.state.answer[1])
    }else{
          addtoanswer = useranswer == this.state.answer;
      }
    if (addtoanswer){
      this.setState({correct: currentcorrect + 1});
      this.setState({current: currentquestion + 1});
      this.setState({score: currentscore + 5});
      this.setState({input: ''});
      // this.reset();
      this.random();
    }else{
    this.setState({input: ''});
    this.setState({current: currentquestion + 1});
    this.setState({score: currentscore - 4});
    // this.reset();
    this.random();
    }
  }

  onHandleChange(e){
    this.setState({input: e.target.value});
  } 
  changetime(e){
    this.setState({timevalue: e.target.value});
  }

  render(){
    let start = (
      <div>
      <button name = "start" onClick = {e => this.onClick(e.target.name)}>Start!
      </button>
      <br />
      <label for="Time">Change the time:</label>
      <select id = "timechoice" onChange ={this.changetime} value = {this.state.timevalue}>
        <option value ="10">10 minutes</option>
        <option value = "5">5 minutes</option>
        <option value = "2">2 minutes</option>
        <option value = "1">1 minute</option>

      </select>
      </div>

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
    <form name = "userinput" onSubmit = {this.onSubmit}>
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
      {this.state.status ? <Countdown onClick={this.onClick} score={this.score()} minutes ={this.state.timevalue}/>: ''}      
      <div>{this.state.status ? questionDisplay : start}</div>
        {this.state.status ? userInput : ''}<br />
        
      <div>Questions correct: {this.state.correct} </div>
      <div>Current Score: {this.state.score}</div>
      <div>Current Question: {this.state.current}</div>
      <div>{this.state.restart ? start : ''}</div>
    </div>
    
  );
  }
}
// Add these bellow the questions correct tag for the keypad
// <ResultComponent result={this.state.result}/>
// <KeyPadComponent onClick={this.onClick}/>

export default App;
