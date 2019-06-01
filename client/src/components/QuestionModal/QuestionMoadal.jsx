import React, { Component } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBFormInline,
  MDBCol,
  MDBRow,
  MDBContainer
} from "mdbreact";
class QuestionModal extends Component {
  state = {
    question: {
      type: "PlainText",
      question: "",
      answer: "",
      correct_answer: "",
      choices: [],
      mark: "",
      validation: {
        required: false,
        valid: true,
        maxlength: 10000,
        minlength: -10000
      }
    },
    maxerror: false,
    choice: ""
  };
  componentDidMount() {
    this.setState({ question: this.props.question });
  }
  clearState = () => {
    const question = {
      type: "PlainText",
      question: "",
      answer: "",
      correct_answer: "",
      choices: [],
      mark: "",
      validation: {
        required: false,
        valid: true,
        maxlength: 10000,
        minlength: -10000
      }
    };
    this.setState({ question });
  };
  addOption = () => {
    const question = { ...this.state.question };
    const choice = this.state.choice;
    if (choice.trim() !== "") {
      this.removeChoice();
      if (
        this.state.question.type === "Spinner" ||
        this.state.question.type === "RadioButton"
      ) {
        const choices = { label: choice };
        question.choices.push(choices);
        this.setState({ question });
        console.log(this.state);
      } else if (this.state.question.type === "CheckBox") {
        const newchoices = { label: choice, checked: false };
        question.choices.push(newchoices);
        this.setState({ question });
        console.log(this.state);
      }
    }
  };
  removeChoice = () => {
    const choice = "";
    this.setState({ choice });
  };
  removeOption = index => {
    const question = { ...this.state.question };
    question.choices.splice(index, 1);
    this.setState({ question });
  };

  render() {
    let selectChoices = null;
    let addedChoices = null;
    if (
      this.state.question.type === "Spinner" ||
      this.state.question.type === "CheckBox" ||
      this.state.question.type === "RadioButton"
    ) {
      if (this.state.question.choices !== []) {
        addedChoices = this.state.question.choices.map((choice, index) => {
          return (
            <MDBRow key={index}>
              <MDBCol>
                <MDBInput label={choice.label} disabled />
              </MDBCol>
              <MDBCol>
                <MDBBtn
                  color="danger option-button"
                  onClick={e => {
                    this.removeOption(index);
                  }}
                >
                  remove option
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          );
        });
      }
      selectChoices = (
        <div>
          <MDBContainer>
            {addedChoices}
            <MDBRow>
              <MDBCol>
                <MDBInput
                  value={this.state.choice}
                  onChange={e => {
                    const choice = e.currentTarget.value;
                    this.setState({ choice });
                  }}
                />
              </MDBCol>
              <MDBCol>
                <MDBBtn
                  color="primary option-button"
                  onClick={e => {
                    this.addOption();
                  }}
                >
                  add option
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      );
    }
    return (
      <MDBModal isOpen={this.props.isOpen} toggle={this.props.toggle} centered>
        <MDBModalHeader toggle={this.props.toggle}>
          question edit
        </MDBModalHeader>
        <MDBModalBody>
          <div>
            <select
              onChange={e => {
                const newValue = e.currentTarget.value;
                const question = { ...this.state.question };
                question.type = newValue;
                question.choices = [];
                this.setState({ question });
              }}
              className="browser-default custom-select"
              defaultValue={
                this.props.editmode ? this.state.question.type : "PlainText"
              }
            >
              <option disabled value="question Type">
                question Type
              </option>
              <option value="PlainText">text</option>
              <option value="Number">Number</option>
              <option value="Spinner">select</option>
              <option value="CheckBox">CheckBox</option>
              <option value="RadioButton">Radio</option>
              <option value="DateTimePicker">Date & Time Picker</option>
              <option value="Date">Date Picker</option>
              <option value="Time">Time Picker</option>
              <option value="Seekbar">Slider</option>
              <option value="StarRating">Star Rating</option>
              <option value="Color">Color Picker </option>
            </select>
          </div>
          {selectChoices}
          <MDBInput
            value={this.state.question.question}
            onChange={e => {
              const newValue = e.currentTarget.value;
              const question = { ...this.state.question };
              question.question = newValue;
              this.setState({ question });
            }}
            size="lg"
            label="question"
          />
          {this.state.question.type === "PlainText" ||
          this.state.question.type === "Number" ? (
            <div className={this.state.maxerror ? "required" : ""}>
              <MDBFormInline className=" lingth">
                <MDBInput
                  label="max"
                  type="number"
                  value={
                    this.state.question.validation.maxlength === 10000
                      ? ""
                      : this.state.question.validation.maxlength
                  }
                  onChange={e => {
                    const newValue = (e.currentTarget.value = ""
                      ? 10000
                      : e.currentTarget.value);
                    const question = { ...this.state.question };
                    question.validation.maxlength = newValue;
                    this.setState({ question });
                  }}
                  size="sm"
                />
                <MDBInput
                  label="min"
                  type="number"
                  value={
                    this.state.question.validation.minlingth === -10000
                      ? ""
                      : this.state.question.validation.minlingth
                  }
                  onChange={e => {
                    const newValue = (e.currentTarget.value = ""
                      ? -10000
                      : e.currentTarget.value);
                    const question = { ...this.state.question };
                    question.validation.minlingth = newValue;
                    this.setState({ question });
                  }}
                  size="sm"
                />
              </MDBFormInline>
            </div>
          ) : null}
          <MDBFormInline>
            <MDBInput
              label="required"
              type="checkbox"
              checked={this.state.question.validation.required}
              id="checkbox1"
              onChange={e => {
                const question = { ...this.state.question };
                question.validation.required = !this.state.question.validation
                  .required;
                this.setState({ question: question });
              }}
            />
          </MDBFormInline>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn
            color="secondary"
            onClick={() => {
              this.props.toggle();
            }}
          >
            Close
          </MDBBtn>
          <MDBBtn
            color="primary"
            onClick={() => {
              console.log("state :", this.state);
              if (
                parseInt(this.state.question.validation.maxlength) <
                parseInt(this.state.question.validation.minlength)
              ) {
                this.setState({ maxerror: true });
              } else if (
                parseInt(this.state.question.validation.maxlength) >
                parseInt(this.state.question.validation.minlength)
              ) {
                this.setState({ maxerror: false });
                if (this.props.editmode) {
                  this.props.addEditHandler(
                    this.state.question,
                    this.props.index
                  );

                  this.props.toggle();
                } else {
                  this.props.addHandler(this.state.question);
                  this.clearState();
                }
              }
            }}
          >
            Save changes
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  }
}
export default QuestionModal;
