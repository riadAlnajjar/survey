import React, { Component } from "react";
import QuestionsContainer from "../questionsContainer/questionsContainer";
import Edit from "../../components/QuestionsEdit/QuestionsEdit";
import "./SurveyBuilder.css";
import { MDBInput, MDBFormInline } from "mdbreact";
import axiosQ from "../../axios/axios-question";
import { Redirect } from "react-router-dom";

class SurveyBuilder extends Component {
  state = {
    form: {
      title: "form title",
      enable: true,
      quize: false,
      theme: "#333333"
    },
    questions: [],
    validat: false,
    redirect: false,
    fillDone: false
  };
  componentWillMount() {
    try {
      if (this.props.location.state.quize) {
        let form = { ...this.state.form };
        form.quize = true;
        this.setState({ form });
      }
    } catch (error) {}
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
    console.log("builder state ", this.state);
  }
  componentDidMount() {}
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
  };
  checkOnChangeHandler = (Qindex, Cindex) => {
    const questions = [...this.state.questions];
    if (questions[Qindex].type === "CheckBox") {
      questions[Qindex].choices[Cindex].selected = !questions[Qindex].choices[
        Cindex
      ].selected;
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
    console.log("1", this.state);
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
          if (!res.data.danger) {
            this.setState({ redirect: true });
          }
        })
        .catch(error => console.log(error));
    } else if (this.props.made) {
      console.log("2", "made");
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
        console.log("3", "allvaled");
        let questions = [];
        // let ans = [];
        // let ch = [];
        let answer;
        this.state.questions.forEach(elm => {
          answer = "";
          let type = elm.type;
          let question = elm.question;
          if (elm.type === "CheckBox") {
            elm.choices.forEach((elm, i) => {
              if (elm.selected === true) {
                // ch.push(elm.label);
                answer = answer + i + " ";
                console.log("3.2", i, answer);
              }
            });
          } else if (elm.type === "RadioButton") {
            if (elm.choices[parseInt(elm.answer)]) {
              // ans.push(elm.choices[parseInt(elm.answer)].label);
              answer = elm.answer;
            }
          } else {
            // ans.push(elm.answer);
            answer = elm.answer;
          }
          questions.push({ question: question, type: type, answer: answer });
        });
        console.log("4", questions);
        axiosQ
          .post("forms/c/" + this.props.match.params.id, questions)
          .then(res => {
            if (!res.data.danger) {
              this.setState({ fillDone: true });
              return true;
            }
            console.log(res);
          })
          .catch(error => console.log(error));
      }
    } else {
      console.log("form", form);
      axiosQ
        .post("forms/u/", form, { headers: headers })
        .then(res => {
          if (!res.data.danger) {
            setTimeout(() => {
              this.setState({ redirect: true });
            }, 1000);
          } else {
            alert(res.data.messages);
            return false;
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

  addEditQuestionHandler = (question, index) => {
    let questions = [...this.state.questions];
    questions[index] = question;
    this.setState({ questions });
  };
  removeQuestionHandler = index => {
    let questions = [...this.state.questions];
    if (questions[index]) {
      questions.splice(index, 1);
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
        addEditHandler={this.addEditQuestionHandler}
        made={this.props.made}
        remove={this.removeQuestionHandler}
      />
    );
    const bgStyle = {
      backgroundColor: this.state.form.theme
      // backgroundColor: `rgba(${this.state.form.theme.r}, ${
      //   this.state.form.theme.g
      // }, ${this.state.form.theme.b}, ${this.state.form.theme.a})`
    };

    var r = parseInt(this.state.form.theme.substr(1, 2), 16),
      g = parseInt(this.state.form.theme.substr(3, 2), 16),
      b = parseInt(this.state.form.theme.substr(5, 2), 16),
      yiq = (r * 299 + g * 587 + b * 114) / 1000;
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
            <div className="m-auto">
              {this.props.made ? (
                <MDBInput
                  className="text-center ml-0"
                  style={textColor}
                  value={this.state.form.title}
                  disabled
                  onChange={e => {
                    const newValue = e.currentTarget.value;
                    const form = { ...this.state.form };
                    form.title = newValue;
                    this.setState({ form });
                  }}
                />
              ) : (
                <MDBInput
                  className="text-center ml-0"
                  style={textColor}
                  value={this.state.form.title}
                  onChange={e => {
                    const newValue = e.currentTarget.value;
                    const form = { ...this.state.form };
                    form.title = newValue;
                    this.setState({ form });
                  }}
                />
              )}
            </div>
          </MDBFormInline>
          <div className="surveyBuilderContant">
            {questionContant}
            <Edit
              made={this.props.made}
              add={this.addQuestionHandler}
              quize={this.state.form.quize}
              themChangehandler={this.themChangehandler}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SurveyBuilder;
