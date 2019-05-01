import React, { Component } from "react";
import {
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBFormInline,
  MDBRow,
  MDBContainer
} from "mdbreact";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  TimePicker,
  DatePicker
} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./Question.css";
import Fileinput from "../fileInput/fileinput";

// import Fileinput from "../fileInput/fileinput";

class Question extends Component {
  state = {
    startDate: new Date("2019-06-18T21:11:54")
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
              value={this.props.questions.awnser}
              onChange={e => {
                this.props.textOnChangeHandler(
                  e.currentTarget.value,
                  this.props.index
                );
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
                this.props.textOnChangeHandler(
                  e.currentTarget.value,
                  this.props.index
                );
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
      case "checkbox":
        question = (
          <div>
            <MDBRow>
              <h4 className="datePickerLabel">
                {this.props.questions.question}
              </h4>
            </MDBRow>
            <MDBFormInline>
              {this.props.questions.choices.map((elm, index) => {
                return (
                  <MDBInput
                    label={elm.label}
                    type="checkbox"
                    id={"checkbox" + index}
                    key={index}
                    checked={this.props.questions.choices[index].checked}
                    onChange={e => {
                      this.props.checkOnChangeHandler(this.props.index, index);
                    }}
                  />
                );
              })}
            </MDBFormInline>
          </div>
        );
        break;
      case "radiobuttons":
        question = (
          <div>
            <MDBRow>
              <h4 className="datePickerLabel">
                {this.props.questions.question}
              </h4>
            </MDBRow>
            <MDBRow>
              <MDBContainer>
                {this.props.questions.choices.map((elm, index) => {
                  return (
                    <MDBInput
                      label={elm}
                      type="radio"
                      id={"radio" + index}
                      key={index}
                      checked={
                        this.props.questions.answer === index ? true : false
                      }
                      onClick={e => {
                        this.props.textOnChangeHandler(index, this.props.index);
                      }}
                    />
                  );
                })}
              </MDBContainer>
            </MDBRow>
          </div>
        );
        break;
      case "Slider":
        question = (
          <div className="my-5">
            <label htmlFor="customRange1">
              {this.props.questions.question}
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={this.props.questions.awnser}
              onChange={e => {
                this.props.textOnChangeHandler(
                  e.currentTarget.value,
                  this.props.index
                );
              }}
              className="custom-range"
              id={"customRange" + this.props.index}
            />
          </div>
        );
        break;
      case "DateTimePicker":
        question = (
          <div className="datePicker">
            <h4 className="datePickerLabel">{this.props.questions.question}</h4>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="pickers">
                <DateTimePicker
                  margin="normal"
                  label="Date & Time"
                  value={this.state.startDate}
                  onChange={e => {
                    console.log("date", this.state.startDate);
                    this.dateHandleChange();
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>
          </div>
        );
        break;
      case "TimePicker":
        question = (
          <div className="datePicker">
            <h4 className="datePickerLabel">{this.props.questions.question}</h4>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="pickers">
                <TimePicker
                  margin="normal"
                  label="Time"
                  value={this.state.startDate}
                  onChange={e => {
                    console.log("date", this.state.startDate);
                    this.dateHandleChange();
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>
          </div>
        );
        break;
      case "DatePicker":
        question = (
          <div className="datePicker">
            <h4 className="datePickerLabel">{this.props.questions.question}</h4>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="pickers">
                <DatePicker
                  margin="normal"
                  label="Date"
                  value={this.state.startDate}
                  onChange={e => {
                    console.log("date", this.state.startDate);
                    this.dateHandleChange();
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>
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
