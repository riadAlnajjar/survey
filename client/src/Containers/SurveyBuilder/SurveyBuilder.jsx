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
      enable: true,
      theme: "#333333"
    },
    questions: [],
    validat: false,
    editindex: 0,
    redirect: false,
    fillDone: false
  };
  componentDidMount() {
    console.log(this.props);
    const headers = {
      Authorization: localStorage.getItem("token")
    };
    if (this.props.edit) {
      axiosQ
        .get("/forms/u/" + this.props.match.params.id, { headers: headers })
        .then(res => {
          if (res.data.danger) {
            const messages = res.data.messages;
            alert(messages);
          }
          let form = {
            title: res.data.data.title,
            theme: res.data.data.theme,
            enable: true
          };
          const questions = [...res.data.data.questions];
          this.setState({ questions: questions, form: form });
        })
        .catch(error => {
          console.log(error);
        });
    } else if (this.props.made) {
      axiosQ
        .get("forms/c/" + this.props.match.params.id)
        .then(res => {
          if (res.data.danger) {
            const messages = res.data.messages;
            alert(messages);
          }
          let form = {
            title: res.data.data.title,
            theme: res.data.data.theme,
            enable: true
          };
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
    newForm.theme = color.hex;
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
    if (questions[Qindex].type === "CheckBox") {
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
    if (rules.minlength !== -10000) {
      isValid = value.length >= rules.minlength && isValid;
    }

    if (rules.maxlength !== 10000) {
      isValid = value.length <= rules.maxlength && isValid;
    }
    return isValid;
  };
  submitHandler = e => {
    console.log(this.state);
    console.log(this.props.match.params.id);
    const questions = [...this.state.questions];
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("token"))
    };
    const form = { ...this.state.form, questions };

    e.preventDefault();
    if (this.props.edit) {
      axiosQ
        .put("forms/u/" + this.props.match.params.id, form, {
          headers: headers
        })
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
        let ans = [];
        let ch = [];
        this.state.questions.map(elm => {
          if (elm.type === "CheckBox") {
            elm.choices.map(elm => {
              if (elm.checked === true) {
                ch.push(elm.label);
              }
            });
            ans = [...ans, ch];
          } else if (elm.type === "RadioButton") {
            if (elm.choices[parseInt(elm.answer)]) {
              ans.push(elm.choices[parseInt(elm.answer)].label);
            }
          } else {
            ans.push(elm.answer);
          }
        });
        const a = { answers: ans };
        console.log(a);
        axiosQ
          .post("forms/c/" + this.props.match.params.id, a)
          .then(res => {
            if (!res.data.danger) {
              this.setState({ fillDone: true });
            }
            console.log(res);
          })
          .catch(error => console.log(error));
      }
    } else {
      axiosQ
        .post("forms/u/", form, { headers: headers })
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
        fillDone={this.state.fillDone}
        validat={this.state.validat}
        setEditindex={this.setEditindex}
      />
    );
    const bgStyle = {
      backgroundColor: this.state.form.theme
      // backgroundColor: `rgba(${this.state.form.theme.r}, ${
      //   this.state.form.theme.g
      // }, ${this.state.form.theme.b}, ${this.state.form.theme.a})`
    };
    var r = parseInt(this.state.form.theme.r, 16);
    var g = parseInt(this.state.form.theme.g, 16);
    var b = parseInt(this.state.form.theme.b, 16);
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
        </div>
      </React.Fragment>
    );
  }
}

export default SurveyBuilder;
