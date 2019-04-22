import React, { Component } from "react";
import { MDBInput, MDBCard, MDBCardBody } from "mdbreact";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Question.css";
// import Fileinput from "../fileInput/fileinput";

class Question extends Component {
  state = {
    answer: "",
    startDate: new Date()
  };
  dateHandleChange = date => {
    this.setState({
      startDate: date
    });
    this.props.textOnChangeHandler(date, this.props.index);
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
            <select
              onChange={e => {
                const answer = e.currentTarget.value;
                this.setState({ answer });
                this.props.textOnChangeHandler(answer, this.props.index);
              }}
              className="browser-default custom-select"
              defaultValue={this.props.questions.question}
            >
              <option disabled value={this.props.questions.question}>
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
      case "DatePicker":
        question = (
          <div className="datePicker">
            <h4 className="datePickerLabel">{this.props.questions.question}</h4>
            <DatePicker
              className={
                "datePickerQ" + this.props.questions.validation.valid
                  ? ""
                  : "red-border"
              }
              selected={this.state.startDate}
              onChange={this.dateHandleChange}
            />
          </div>
        );
        break;
      default:
        question = null;
    }
    return (
      <MDBCard
        onClick={e => {
          this.props.setEditindex(this.props.index);
        }}
        className="question-card"
      >
        <MDBCardBody className="question">{question}</MDBCardBody>
      </MDBCard>
    );
  }
}
export default Question;
