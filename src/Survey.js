import React, { Component } from "react";
import firebase from 'firebase/compat/app'


// const firebase = require('firebase')
const uuid = require("uuid");

const config = {
  apiKey: "AIzaSyC38t_ufrgwXqUZk_ZAOzQFzhq141JsfNk",
  authDomain: "survey-19512.firebaseapp.com",
  databaseURL: "https://survey-19512-default-rtdb.firebaseio.com",
  storageBucket: "survey-19512.appspot.com",
  messagingSenderId: "983149334110",
};
firebase.initializeApp(config);

class Survey extends Component {
  nameSubmit(event) {
    const studentName = this.refs.name.value;
    this.setState({ studentName: studentName }, function () {
      console.log(this.state);
    });
  }
  answerSelected(event){
    //TODO
    let answers = this.state.answers;
    if(event.target.name === 'answer1'){
        answers.answer1= event.target.value;
    }else if(event.target.name === 'answer2'){
        answers.answer2= event.target.value;
    }else if(event.target.name === 'answer3'){
        answers.answer3= event.target.value;
    }
    this.setState({answers: answers},function () {
        console.log(this.state);
      })
  }

  questionSubmit(){
    firebase.database().ref('Survey/'+this.state.uid).set({
        studentName:this.state.studentName,
        answers:this.state.answers
    
    });
    this.setState({isSubmited: true})
  }
  constructor(props) {
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: "",
      answers: {
        answer1: "",
        answer2: "",
        answer3: "",
      },

      isSubmited: false,
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this)
  }
  render() {
    let studentName;
    let questions;

    if (this.state.studentName === "" && this.state.isSubmited === false) {
      studentName = (
        <div>
          <h1>Hey Student, please let us know your name:</h1>
          <form onSubmit={this.nameSubmit}>
            <input
              className="namy"
              type="text"
              placeholder="Enter your name"
              ref="name"
            ></input>
          </form>
        </div>
      );
      questions = "";
    } else if (
      this.state.studentName !== "" &&
      this.state.isSubmited === false
    ) {
      studentName = <h1>Welcome to the Survey, {this.state.studentName} </h1>;
      questions = (
        <div>
          <h2>Here are some questions</h2>
          <form onSubmit={this.questionSubmit}>
            <div className="card">
              <label>What kind of courses you like the most?</label> <br />
              <input
                type="radio"
                name="answer1"
                value="Technology"
                onChange={this.answerSelected}
              />
              Technology
              <input
                type="radio"
                name="answer1"
                value="Design"
                onChange={this.answerSelected}
              />
              Design
              <input
                type="radio"
                name="answer1"
                value="Marketing"
                onChange={this.answerSelected}
              />
              Marketing
            </div>
            <div className="card">
              <label>You are a: </label> <br />
              <input
                type="radio"
                name="answer2"
                value="Student"
                onChange={this.answerSelected}
              />
              Student
              <input
                type="radio"
                name="answer2"
                value="in-job"
                onChange={this.answerSelected}
              />
              In-job
              <input
                type="radio"
                name="answer2"
                value="looking-job"
                onChange={this.answerSelected}
              />
              Looking-job
            </div>
            <div className="card">
              <label>Is online learning helpful?</label> <br />
              <input
                type="radio"
                name="answer3"
                value="yes"
                onChange={this.answerSelected}
              />
              Yes
              <input
                type="radio"
                name="answer3"
                value="no"
                onChange={this.answerSelected}
              />
              No
              <input
                type="radio"
                name="answer3"
                value="maybe"
                onChange={this.answerSelected}
              />
              Maybe
            </div>
            <input className="feedback-button" type='submit' value='submit' />
          </form>
        </div>
      );
    }else if(this.state.isSubmited === true){
        studentName = <h1>Thank you , {this.state.studentName}</h1>
    }
    return (
      <div>
        {studentName}
        ----------------------------------
        {questions}
      </div>
    );
  }
}

export default Survey;
