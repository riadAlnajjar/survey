import React, { Component } from "react";
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBFormInline
} from "mdbreact";
import "./QuestionsEdit.css";

class Edit extends Component {
  state = {
    modal: false,
    question: {
      type: "text",
      question: "",
      answer: "",
      choices: [],
      marks: [],
      validation: {
        required: false,
        valid: true,
        maxlingth: null,
        minlingth: null
      }
    },
    choice: "",
    editmode: false
  };
  clearState = () => {
    if (this.state.question.question.trim() !== "") {
      const question = {
        type: "text",
        question: "",
        answer: "",
        choices: [],
        marks: [],
        validation: {
          required: false,
          valid: true,
          maxlingth: null,
          minlingth: null
        }
      };
      this.setState({ question });
    }
  };
  toggle = () => {
    const modal = !this.state.modal;
    this.setState({ modal });
    this.clearState();
    if (this.state.editmode) {
      this.setState({ editmode: false });
    }
  };
  addHandler = () => {
    if (this.state.question.question.trim() !== "") {
      this.props.add(this.state.question);
    }
    this.toggle();
  };
  addOption = () => {
    const question = { ...this.state.question };
    const choice = this.state.choice;
    if (choice.trim() !== "") {
      this.removeChoice();
      if (
        this.state.question.type === "select" ||
        this.state.question.type === "radiobuttons"
      ) {
        question.choices.push(choice);
        this.setState({ question });
        console.log(this.state);
      } else if (this.state.question.type === "checkbox") {
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
      this.state.question.type === "select" ||
      this.state.question.type === "checkbox" ||
      this.state.question.type === "radiobuttons"
    ) {
      if (this.state.question.choices !== []) {
        addedChoices = this.state.question.choices.map((choice, index) => {
          return (
            <MDBRow key={index}>
              <MDBCol>
                <MDBInput
                  label={
                    this.state.question.type === "checkbox"
                      ? choice.label
                      : choice
                  }
                  disabled
                />
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
    let editButtons = null;
    if (!this.props.made) {
      editButtons = (
        <React.Fragment>
          <MDBRow>
            <MDBBtn
              onClick={e => {}}
              floating
              color="peach-gradient"
              className="btn-floating peach-gradient "
            >
              <MDBIcon icon="fill-drip" size="3x" />
            </MDBBtn>
          </MDBRow>
          <MDBRow>
            <MDBBtn
              onClick={this.toggle}
              floating
              color="primary"
              className="btn-floating "
            >
              <MDBIcon icon="plus" size="4x" />
            </MDBBtn>
          </MDBRow>
          <MDBRow>
            <MDBBtn
              onClick={e => {
                const question = this.props.editHandler();
                if (question) {
                  console.log(question);
                  this.setState({
                    question: question
                  });
                  this.toggle();
                  this.setState({ editmode: true });
                }
              }}
              floating
              color="unique-color"
              className="btn-floating unique-color"
            >
              <MDBIcon icon="edit" size="3x" />
            </MDBBtn>
          </MDBRow>
          <MDBRow>
            <MDBBtn
              onClick={this.props.remove}
              floating
              color="danger-color-dark"
              className="btn-floating danger-color-dark"
            >
              <MDBIcon icon="trash-alt" size="3x" />
            </MDBBtn>
          </MDBRow>
        </React.Fragment>
      );
    }

    return (
      <div className={this.props.made ? null : "sticky-container"}>
        <div>
          {editButtons}
          <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
            <MDBModalHeader toggle={this.toggle}>question edit</MDBModalHeader>
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
                >
                  <option disabled defaultValue="question Type">
                    question Type
                  </option>
                  <option value="text">text</option>
                  <option value="select">select</option>
                  <option value="checkbox">CheckBox</option>
                  <option value="radiobuttons">Radio</option>
                  <option value="DateTimePicker">Date & Time Picker</option>
                  <option value="DatePicker">Date Picker</option>
                  <option value="TimePicker">Time Picker</option>
                  <option value="Slider">Slider</option>
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
              <MDBFormInline>
                <MDBInput
                  label="required"
                  type="checkbox"
                  checked={this.state.question.validation.required}
                  id="checkbox1"
                  onChange={e => {
                    const question = { ...this.state.question };
                    question.validation.required = !this.state.question
                      .validation.required;
                    this.setState({ question: question });
                  }}
                />
              </MDBFormInline>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => {
                  this.toggle();
                  if (this.state.editmode) {
                    this.setState({ editmode: false });
                  }
                }}
              >
                Close
              </MDBBtn>
              <MDBBtn
                color="primary"
                onClick={() => {
                  if (!this.state.editmode) {
                    this.addHandler();
                  } else {
                    this.props.addEditHandler(this.state.question);
                    this.toggle();
                    this.setState({ editmode: false });
                  }
                }}
              >
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </div>
      </div>
    );
  }
}
export default Edit;
