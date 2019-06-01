import React, { Component } from "react";
import { MDBBtn, MDBIcon, MDBRow } from "mdbreact";
import "./QuestionsEdit.css";
import { BlockPicker } from "react-color";
import QuestionModal from "../QuestionModal/QuestionMoadal";

class Edit extends Component {
  state = {
    modal: false,
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
    choice: "",
    displayColorPicker: false,
    color: "#333333",
    maxerror: false
  };

  toggle = () => {
    const modal = !this.state.modal;
    this.setState({ modal });
  };
  addHandler = q => {
    if (q.question.trim() !== "") {
      this.props.add(q);
      console.log("question", q);
      this.toggle();
    } else {
      alert("question is empty");
    }
  };

  render() {
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
              <MDBIcon icon="fill-drip" size="2x" />
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
                    this.setState({ color: e.hex });
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
              <MDBIcon icon="plus" size="3x" />
            </MDBBtn>
          </MDBRow>
          <MDBRow>
            <MDBBtn
              onClick={e => {
                window.print();
              }}
              floating
              color="primary"
              className="btn-floating "
            >
              <MDBIcon icon="print" size="2x" />
            </MDBBtn>
          </MDBRow>
        </React.Fragment>
      );
    }

    return (
      <div className={this.props.made ? null : "sticky-container"}>
        <div>
          {editButtons}

          <QuestionModal
            question={this.state.question}
            isOpen={this.state.modal}
            toggle={this.toggle}
            addHandler={this.addHandler}
          />
        </div>
      </div>
    );
  }
}
export default Edit;
