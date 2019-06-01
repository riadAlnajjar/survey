import React, { Component } from "react";
import {
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBFormInline,
  MDBRow,
  MDBContainer,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import { InputNumber } from "rsuite";
import StarRatings from "react-star-ratings";
import { ChromePicker } from "react-color";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  TimePicker,
  DatePicker
} from "material-ui-pickers";

import DateFnsUtils from "@date-io/date-fns";
import "./Question.css";
import QuestionModal from "../QuestionModal/QuestionMoadal";

class Question extends Component {
  state = {
    startDate: new Date("2019-06-18T21:11:54"),
    answer: 0,
    editmode: false
  };
  dateHandleChange = date => {
    this.setState({
      startDate: date
    });
    this.props.textOnChangeHandler(date, this.props.index);
  };
  toggle = () => {
    const editmode = !this.state.editmode;
    this.setState({ editmode: editmode });
  };

  render() {
    let edit;
    edit = !this.props.made ? (
      <div className="edit">
        <MDBBtn
          className="editBut"
          onClick={e => {
            this.toggle();
          }}
        >
          <MDBIcon icon="edit" size="s" />
        </MDBBtn>
        <MDBBtn
          className="editBut"
          onClick={() => this.props.remove(this.props.index)}
        >
          <MDBIcon icon="trash" size="s" />
        </MDBBtn>
      </div>
    ) : null;

    let question = null;
    switch (this.props.questions.type) {
      case "PlainText":
        question = (
          <div>
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
      case "Number":
        question = (
          <div>
            <MDBRow>
              <h4 className="datePickerLabel">
                {this.props.questions.question}
              </h4>
            </MDBRow>
            <MDBRow>
              <InputNumber
                value={this.props.questions.awnser}
                size="lg"
                onChange={e => {
                  this.props.textOnChangeHandler(e, this.props.index);
                }}
                max={this.props.questions.validation.maxlength}
                min={this.props.questions.validation.minlength}
              />
            </MDBRow>
          </div>
        );
        break;
      case "Spinner":
        question = (
          <div className="mt-4 mb-4">
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
                  <option key={index} value={elm.label}>
                    {elm.label}
                  </option>
                );
              })}
            </select>
          </div>
        );
        break;
      case "CheckBox":
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
      case "RadioButton":
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
                      label={elm.label}
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
      case "Seekbar":
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
      case "StarRating":
        question = (
          <div>
            <MDBRow>
              <h4 className="datePickerLabel">
                {this.props.questions.question}
              </h4>
            </MDBRow>
            <MDBRow>
              <StarRatings
                rating={this.state.ratings}
                starRatedColor={"#4285F4"}
                changeRating={(newRating, name) => {
                  this.setState({ answer: newRating });
                  this.props.textOnChangeHandler(newRating, this.props.index);
                }}
                numberOfStars={5}
                name={"rating" + this.props.index}
              />
            </MDBRow>
          </div>
        );
        break;
      case "Color":
        question = (
          <div>
            <MDBRow>
              <h4 className="datePickerLabel">
                {this.props.questions.question}
              </h4>
            </MDBRow>
            <MDBRow>
              <ChromePicker
                color={this.state.answer}
                onChange={e => {
                  this.setState({ answer: e.hex });
                  this.props.textOnChangeHandler(e.hex, this.props.index);
                }}
              />
            </MDBRow>
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
      case "Time":
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

      case "Date":
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
      <React.Fragment>
        <MDBCard
          className={
            this.props.questions.validation.valid
              ? "question-card"
              : "required question-card"
          }
        >
          <MDBCardBody className="question">
            {edit}
            {question}
          </MDBCardBody>
        </MDBCard>
        <QuestionModal
          editmode
          question={this.props.questions}
          isOpen={this.state.editmode}
          toggle={this.toggle}
          addEditHandler={this.props.addEditHandler}
          index={this.props.index}
        />
      </React.Fragment>
    );
  }
}
export default Question;
