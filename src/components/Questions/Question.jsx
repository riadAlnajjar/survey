import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import "./Question.css";

class Question extends Component {
  state = {
    answer: ""
  };
  render() {
    console.log(this.props);
    let question = null;
    switch (this.props.questions.type) {
      case "text":
        question = (
          <div
            className={this.props.questions.validation.valid ? "" : "required"}
          >
            <MDBInput
              outline
              value={this.state.awnser}
              onChange={e => {
                const answer = e.currentTarget.value;
                this.setState({ answer });
                this.props.textOnChangeHandler(answer, this.props.index);
              }}
              size="lg"
              label={this.props.questions.question}
            />
          </div>
        );
        break;
      case "select":
        question = (
          <div
            className={
              this.props.questions.validation.valid
                ? "mt-4 mb-4"
                : "required mt-4 mb-4"
            }
          >
            <select className="browser-default custom-select">
              <option disabled selected value={this.props.questions.question}>
                {this.props.questions.question}
              </option>
              {this.props.questions.choices.map((elm, index) => {
                return (
                  <option key={index} value={elm}>
                    {elm}
                  </option>
                );
              })}
            </select>
          </div>
        );
        break;
      default:
        question = null;
    }
    return question;
  }
}
export default Question;
