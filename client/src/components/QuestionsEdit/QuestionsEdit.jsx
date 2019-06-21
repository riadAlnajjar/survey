import React, { Component } from "react";
import { MDBBtn, MDBIcon, MDBRow } from "mdbreact";
import "./QuestionsEdit.css";
import { BlockPicker } from "react-color";
import QuestionModal from "../QuestionModal/QuestionMoadal";

class Edit extends Component {
  state = {
    modal: false,
    question: {
      type: this.props.quize ? "CheckBox" : "PlainText",
      question: "",
      answer: "",
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
              color="trans"
              className="btn-floating trans "
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
                    "#502451",
                    "#650e44",
                    "#1c2a48",
                    "#212121",
                    "#6d4c41",
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
              color="trans"
              className="btn-floating trans"
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
              color="trans"
              className="btn-floating trans"
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
            quize={this.props.quize}
          />
        </div>
      </div>
    );
  }
}
export default Edit;
