import React, { Component } from "react";
import QuestionsContainer from "../questionsContainer/questionsContainer";
import Edit from "../../components/QuestionsEdit/QuestionsEdit";

class SurveyBuilder extends Component {
  state = {
    questions: [
      {
        type: "text",
        question: "ccc",
        answer: "",
        choices: [],
        marks: [],
        validation: {
          required: true,
          valid: true
        }
      }
    ],
    validat: false
  };
  textOnChangeHandler = (answer, index) => {
    const questions = [...this.state.questions];
    //questions[index].answer = e.currentTarget.value;
    if (this.state.validat) {
      questions[index].validation.valid = this.checkValidity(
        answer,
        questions[index].validation
      );
    }
    questions[index].answer = answer;
    this.setState({ questions });
    console.log(this.state);
  };
  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "";
    }
    console.log(isValid);
    return isValid;
  };
  submitHandler = e => {
    e.preventDefault();
    const questions = [...this.state.questions];
    questions.forEach(elem => {
      elem.validation.valid = this.checkValidity(elem.answer, elem.validation);
    });
    this.setState({ questions, validat: true });
  };
  addQuestionHandler = question => {
    let questions = [...this.state.questions];
    questions = questions.concat(question);
    this.setState({ questions });
    console.log(question, questions, this.state);
  };
  render() {
    let questionContant = (
      <QuestionsContainer
        textOnChangeHandler={this.textOnChangeHandler}
        questions={this.state.questions}
        submit={this.submitHandler}
        validat={this.state.validat}
      />
    );
    return (
      <React.Fragment>
        {questionContant}
        <Edit add={this.addQuestionHandler} />
      </React.Fragment>
    );
  }
}

export default SurveyBuilder;
