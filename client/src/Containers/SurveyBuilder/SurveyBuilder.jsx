import React, { Component } from "react";
import QuestionsContainer from "../questionsContainer/questionsContainer";
import Edit from "../../components/QuestionsEdit/QuestionsEdit";
import "./SurveyBuilder.css";

import axiosQ from "../../axios/axios-question";

class SurveyBuilder extends Component {
  state = {
    form: {
      title: "",
      them: "#ff3533"
    },
    questions: [
      {
        type: "text",
        question: "ccc",
        answer: "",
        choices: [],
        marks: [],
        validation: {
          required: true,
          valid: true,
          maxlingth: null,
          minlingth: null
        }
      }
    ],
    validat: false,
    editindex: 0
  };
  componentDidMount() {
    console.log(this.props);
    if (this.props.made || this.props.edit) {
      axiosQ
        .get("/forms/" + this.props.match.params.id)
        .then(res => {
          console.log(res);
          const questions = [...res.data];
          this.setState({ questions: questions });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
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
    if (rules.minlingth) {
      isValid = value.length >= rules.minlingth && isValid;
    }
    if (rules.minlingth) {
      isValid = value.length >= rules.minlingth && isValid;
    }
    if (rules.maxlingth) {
      isValid = value.length <= rules.maxlingth && isValid;
    }
    return isValid;
  };
  submitHandler = e => {
    console.log(this.state);
    const questions = [...this.state.questions];
    const form = { ...this.state.form, questions };
    e.preventDefault();
    if (!this.props.made) {
      axiosQ
        .post("makeid/questions", form)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    } else {
      questions.forEach(elem => {
        elem.validation.valid = this.checkValidity(
          elem.answer,
          elem.validation
        );
      });
      this.setState({ questions, validat: true });
      let allvaled = true;
      questions.forEach(elem => {
        allvaled = elem.validation.valid && allvaled;
      });
      if (allvaled) {
        axiosQ
          .post(this.props.match.params.id + "done", questions)
          .then(res => console.log(res))
          .catch(error => console.log(error));
      }
    }
  };
  addQuestionHandler = question => {
    let questions = [...this.state.questions];
    questions = questions.concat(question);
    this.setState({ questions });
  };
  setEditindex = index => {
    this.setState({ editindex: index });
  };
  editQuestionHandler = () => {
    const questions = [...this.state.questions];
    const question = questions[this.state.editindex];
    return question;
  };
  addEditQuestionHandler = question => {
    let questions = [...this.state.questions];
    questions[this.state.editindex] = question;
    this.setState({ questions });
  };
  removeQuestionHandler = () => {
    let questions = [...this.state.questions];
    if (questions[this.state.editindex]) {
      questions.splice(this.state.editindex, 1);
      this.setState({ questions });
    }
  };
  render() {
    let questionContant = (
      <QuestionsContainer
        textOnChangeHandler={this.textOnChangeHandler}
        questions={this.state.questions}
        submit={this.submitHandler}
        validat={this.state.validat}
        setEditindex={this.setEditindex}
      />
    );
    const bgStyle = {
      backgroundColor: this.state.form.them
    };
    return (
      <React.Fragment>
        <div style={bgStyle} className="surveyBuilderColor" />
        <div className="surveyBuilderContant">
          {questionContant}
          <Edit
            made={this.props.made}
            editHandler={this.editQuestionHandler}
            addEditHandler={this.addEditQuestionHandler}
            add={this.addQuestionHandler}
            remove={this.removeQuestionHandler}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default SurveyBuilder;
