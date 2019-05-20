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
import { BlockPicker } from "react-color";

class Edit extends Component {
  state = {
    modal: false,
    question: {
      type: "text",
      question: "",
      answer: "",
      rightanswer: "",
      choices: [],
      marks: [],
      validation: {
        required: false,
        valid: true,
        maxlingth: 10000,
        minlingth: -10000
      }
    },
    choice: "",
    editmode: false,
    displayColorPicker: false,
    color: "#ff3533",
    maxerror: false
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
          maxlingth: 10000,
          minlingth: -10000
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
              onClick={e => {
                this.setState({
                  displayColorPicker: !this.state.displayColorPicker
                });
              }}
              floating
              color="peach-gradient"
              className="btn-floating peach-gradient "
            >
              <MDBIcon icon="fill-drip" size="3x" />
            </MDBBtn>
            {this.state.displayColorPicker ? (
              <div className="popover">
                <div
                  className="cover"
                  onClick={e => {
                    this.setState({ displayColorPicker: false });
                  }}
                />
                <BlockPicker
                  triangle="hide"
                  color={this.state.color}
                  onChange={e => {
                    this.setState({ color: e.rgb });
                    this.props.themChangehandler(e);
                  }}
                  colors={[
                    "#63B5F7",
                    "#1c2a48",
                    "#212121",
                    "#6d4c41",
                    "#1b5e20",
                    "#006064",
                    "#00796b",
                    "#1e88e5",
                    "#1C2331"
                  ]}
                />
              </div>
            ) : null}
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
                  <option value="number">Number</option>
                  <option value="select">select</option>
                  <option value="checkbox">CheckBox</option>
                  <option value="radiobuttons">Radio</option>
                  <option value="DateTimePicker">Date & Time Picker</option>
                  <option value="DatePicker">Date Picker</option>
                  <option value="TimePicker">Time Picker</option>
                  <option value="Slider">Slider</option>
                  <option value="StarRating">Star Rating</option>
                  <option value="ColorPicker">Color Picker </option>
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
              {this.state.question.type === "text" ||
              this.state.question.type === "number" ? (
                <div className={this.state.maxerror ? "required" : ""}>
                  <MDBFormInline className=" lingth">
                    <MDBInput
                      label="max"
                      type="number"
                      value={
                        this.state.question.validation.maxlingth === 10000
                          ? ""
                          : this.state.question.validation.maxlingth
                      }
                      onChange={e => {
                        const newValue = (e.currentTarget.value = ""
                          ? 10000
                          : e.currentTarget.value);
                        const question = { ...this.state.question };
                        question.validation.maxlingth = newValue;
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
                  console.log("state :", this.state);
                  if (
                    parseInt(this.state.question.validation.maxlingth) <
                    parseInt(this.state.question.validation.minlingth)
                  ) {
                    this.setState({ maxerror: true });
                  } else if (
                    parseInt(this.state.question.validation.maxlingth) >
                    parseInt(this.state.question.validation.minlingth)
                  ) {
                    this.setState({ maxerror: false });
                    if (!this.state.editmode) {
                      this.addHandler();
                    } else {
                      this.props.addEditHandler(this.state.question);

                      this.toggle();
                      this.setState({ editmode: false });
                    }
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
