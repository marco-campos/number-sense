import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {KeyPadComponent} from './buttons';
import {ResultComponent} from './result';
import { render } from '@testing-library/react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import {sac99, invA99, invB99,disA99,disB99,reg99} from './1999';
import {invA13, invB13,dis13, reg13, state13} from './2013'
import {Countdown} from './timer';
import {Exam} from './Exam';

const questions = [sac99,invA99,invB99,disA99,disB99,reg99,
invA13, invB13, dis13,reg13, state13];

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
      exam: [],
      key: [],
      show: false,
      stopinput:false
    }
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit =this.onSubmit.bind(this);
    this.changetime = this.changetime.bind(this);
    this.stopInput = this.stopInput.bind(this);
  }
  score = () => {
    return this.state.score;
  }
  question(){
    return this.state.question;
  }
  answer(){
    return this.state.answer;
  }
  stopInput = e =>{
    if (e === "stop"){
    this.setState({stopinput: true});
    }
  }

  onClick = button => {
    if (button ==="start"){
      this.random()
      this.status();
    }
    else if (button ==="showexam"){
      this.setState({show: true})
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
    let currentquestion = this.state.current;
    this.latexdisplay(rand);
    this.setState({current: currentquestion + 1});

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
    let currq = this.state.question;
    let curra = this.state.answer;
    this.setState(prevState => ({
      exam: [...prevState.exam, currq ]
    }));
    this.setState(prevState => ({
      key: [...prevState.key, curra ]
    }));
    

  }


  /* reset = () =>{
    this.setState({result:""})
  }
  */

  onSubmit = (e) =>{
    e.preventDefault();
    let currentcorrect = this.state.correct;
    let currentscore = this.state.score;
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
    if (!this.state.stopinput){
      if (addtoanswer){
      this.setState({correct: currentcorrect + 1});
      this.setState({score: currentscore + 5});
      this.setState({input: ''});
      // this.reset();
      this.random();
    }else{
    this.setState({input: ''});
    this.setState({score: currentscore - 4});
    // this.reset();
    this.random();
    }
    }else{
      if (addtoanswer){
        this.setState({correct: currentcorrect + 1});
        this.setState({input: ''});
        // this.reset();
        this.random();
      }else{
      this.setState({input: ''});
      // this.reset();
      this.random();
      }
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
      <button id ="start" name = "start" onClick = {e => this.onClick(e.target.name)}>Start!
      </button>
      <br />
      <br />
      <label for="Time">Change the time:</label>
      <select id = "timechoice" onChange ={this.changetime} value = {this.state.timevalue}>
        <option value ="10">10 minutes</option>
        <option value = "5">5 minutes</option>
        <option value = "2">2 minutes</option>
        <option value = "1">1 minute</option>
        <option value = "0">0 minutes </option>
      </select>
      </div>

    );
    let latex = this.state.question;
    let questionDisplay = (
      <div>
      <h1>
        <BlockMath>{String.raw`(${this.state.current %10 ===0 ? `${this.state.current}^*` : this.state.current })`+'\\textrm{                      }  '+  String.raw`${latex}`}</BlockMath>
       
      </h1>
      </div>
    );
    
    let userInput = (
    <form id = "userinput" onSubmit = {this.onSubmit}>
    <input 
      type ="text" 
      onChange ={this.onHandleChange}
      value= {this.state.input}
      placeholder = "" /><br />
    <input type ="submit" autofocus/>
  </form>);

    let examkey = {};
    let examq = this.state.exam;
    let exama = this.state.key;
    [...examq].forEach((question, i ) =>{
      examkey[question] = exama[i]
    });

    let examdisplay =(
      <table class="resultsafter">
        <tr>
          <th>Questions </th>
          <th>Answers</th>
        </tr>
      {Object.keys(examkey).map((question, index) =>(
        <tr key ={index}>
          <td>
            <BlockMath>{String.raw` ${Object.keys(examkey)[index+1]}`}</BlockMath>
          </td>
          <td>
          <BlockMath>{String.raw` ${Object.values(examkey)[index+1]}`}</BlockMath>
          </td>
        </tr>
      ))}
      </table>
    )
    let instructions = (
      <div> 
        <p>Select a time above and begin answering the questions. <br />
        Make sure you use "/" for fractions and leave a space
          for mixed numbers. Example:</p>
        <p><BlockMath>{String.raw`3 \frac{1}{2} \textrm{ should be written as: 3 1/2}`}</BlockMath> </p>
        <h2>Rules:</h2>
        <ul>
          <li>+5 points per question correct</li>
          <li>-4 points per question incorrect or skipped</li>
          <li>Every question marked with "*" can be rounded within 5 percent of the answer</li>
        </ul>

      </div>
    )
    
  return (
    <div className="calculator-body" >
      <h1 class = "toptitle">Number Sense Practice</h1>
      {this.state.status ? <Countdown onClick={this.onClick} score={this.score()} minutes ={this.state.timevalue} stopInput={this.stopInput}/>: ''}      
      <div>{this.state.status && !this.state.show && !this.state.stopinput ? questionDisplay : ''}{this.state.status ? '' : start}</div>
        {this.state.status && !this.state.show && !this.state.stopinput ? userInput : ''}<br />
     
      <div>
        {this.state.restart ? start : ''}
        {this.state.status ? '': instructions}
      </div>
      <div>{this.state.show ? examdisplay : ''} </div>
      <div>{console.log(this.state.stopinput)}</div>
    </div>
  );
  }
}
// Add these bellow the questions correct tag for the keypad
// <ResultComponent result={this.state.result}/>
// <KeyPadComponent onClick={this.onClick}/>

export default App;
