import React, { Component } from "react";
import QuestionsContainer from "../questionsContainer/questionsContainer";
import Edit from "../../components/QuestionsEdit/QuestionsEdit";
import "./SurveyBuilder.css";
import { MDBInput, MDBFormInline, MDBIcon, MDBBtn } from "mdbreact";
import axiosQ from "../../axios/axios-question";
import { Redirect } from "react-router-dom";

class SurveyBuilder extends Component {
  state = {
    form: {
      title: "form title",
      them: {
        r: "31",
        g: "53",
        b: "51",
        a: "1"
      }
    },
    questions: [],
    validat: false,
    editindex: 0,
    redirect: false
  };
  componentDidMount() {
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("token"))
    };
    if (this.props.edit) {
      axiosQ
        .post("/forms/" + this.props.match.params.id, { headers: headers })
        .then(res => {
          let form = { title: res.data.data.title, them: res.data.data.them };
          const questions = [...res.data.data.questions];
          this.setState({ questions: questions, form: form });
        })
        .catch(error => {
          console.log(error);
        });
    } else if (this.props.made) {
      axiosQ
        .get("forms/" + this.props.match.params.id)
        .then(res => {
          let form = { title: res.data.data.title, them: res.data.data.them };
          const questions = [...res.data.data.questions];
          this.setState({ questions: questions, form: form });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  themChangehandler = color => {
    const newForm = { ...this.state.form };
    newForm.them = color.rgb;
    this.setState({ form: newForm });
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
  checkOnChangeHandler = (Qindex, Cindex) => {
    const questions = [...this.state.questions];
    if (questions[Qindex].type === "checkbox") {
      questions[Qindex].choices[Cindex].checked = !questions[Qindex].choices[
        Cindex
      ].checked;
    }

    this.setState({ questions });
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "";
    }
    if (rules.minlingth !== -10000) {
      isValid = value.length >= rules.minlingth && isValid;
    }

    if (rules.maxlingth !== 10000) {
      isValid = value.length <= rules.maxlingth && isValid;
    }
    return isValid;
  };
  submitHandler = e => {
    console.log(this.state);
    const questions = [...this.state.questions];
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("token"))
    };
    const form = { ...this.state.form, questions };

    e.preventDefault();
    if (this.props.edit) {
      const headers = {
        Authorization: JSON.parse(localStorage.getItem("token"))
      };
      axiosQ
        .put("forms/" + this.props.id, form, { headers: headers })
        .then(res => {
          console.log(res);
          if (!res.data.danger) {
            this.setState({ redirect: true });
          }
        })
        .catch(error => console.log(error));
    } else if (this.props.made) {
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
    } else {
      axiosQ
        .post("forms", form, { headers: headers })
        .then(res => {
          if (!res.data.danger) {
            this.setState({ redirect: true });
          }
        })
        .catch(error => console.log(error));
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
        checkOnChangeHandler={this.checkOnChangeHandler}
        questions={this.state.questions}
        submit={this.submitHandler}
        validat={this.state.validat}
        setEditindex={this.setEditindex}
      />
    );
    const bgStyle = {
      backgroundColor: `rgba(${this.state.form.them.r}, ${
        this.state.form.them.g
      }, ${this.state.form.them.b}, ${this.state.form.them.a})`
    };
    var r = parseInt(this.state.form.them.r, 16);
    var g = parseInt(this.state.form.them.g, 16);
    var b = parseInt(this.state.form.them.b, 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    const hex = yiq >= 230 ? "#000" : "#fff";
    const textColor = {
      color: hex,
      padding: "20px",
      fontSize: "28px",
      fontWeight: "28px",
      marginLeft: "-20%"
    };
    return (
      <React.Fragment>
        {this.state.redirect ? <Redirect to="/" /> : null}
        <div style={bgStyle} className="surveyBuilderColor">
          <MDBFormInline>
            <MDBBtn
              onClick={e => {
                window.print();
              }}
              floating
              color="primary"
              className="btn-floating "
            >
              <MDBIcon icon="print" size="3x" />
            </MDBBtn>
            <div className="m-auto">
              <MDBInput
                className="text-center"
                style={textColor}
                value={this.state.form.title}
                onChange={e => {
                  const newValue = e.currentTarget.value;
                  const form = { ...this.state.form };
                  form.title = newValue;
                  this.setState({ form });
                }}
              />
            </div>
          </MDBFormInline>
        </div>
        <div className="surveyBuilderContant">
          {questionContant}
          <Edit
            made={this.props.made}
            editHandler={this.editQuestionHandler}
            addEditHandler={this.addEditQuestionHandler}
            add={this.addQuestionHandler}
            remove={this.removeQuestionHandler}
            themChangehandler={this.themChangehandler}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default SurveyBuilder;
