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
  MDBRow
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
        valid: true
      }
    },
    choice: ""
  };

  toggle = () => {
    const modal = !this.state.modal;
    this.setState({ modal });
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
      question.choices.push(choice);
      this.setState({ question });
      console.log(this.state);
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
    if (this.state.question.type === "select") {
      if (this.state.question.choices !== []) {
        addedChoices = this.state.question.choices.map((choice, index) => {
          return (
            <MDBRow key={index}>
              <MDBCol>
                <MDBInput label={choice} disabled />
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
      <div className="sticky-container">
        <div>
          <MDBBtn
            onClick={this.toggle}
            floating
            color="primary"
            className="btn-floating "
          >
            <MDBIcon icon="plus" size="4x" />
          </MDBBtn>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
            <MDBModalHeader toggle={this.toggle}>question edit</MDBModalHeader>
            <MDBModalBody>
              <div>
                <select
                  onChange={e => {
                    const newValue = e.currentTarget.value;
                    const question = { ...this.state.question };
                    question.type = newValue;
                    this.setState({ question });
                  }}
                  className="browser-default custom-select"
                >
                  <option disabled selected>
                    question Type
                  </option>
                  <option value="text">text</option>
                  <option value="select">select</option>
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
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggle}>
                Close
              </MDBBtn>
              <MDBBtn color="primary" onClick={this.addHandler}>
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
