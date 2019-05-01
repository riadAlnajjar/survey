import React, { Component } from "react";
import Question from "../../components/Questions/Question";
import { MDBContainer, MDBCol, MDBRow, MDBBtn } from "mdbreact";
import "./questionsContainer.css";

class QuestionsContainer extends Component {
  componentDidMount() {
    console.log("\n", this.props, "\n");
  }
  render() {
    const questions = this.props.questions
      ? this.props.questions.map((elm, i) => {
          return (
            <Question
              index={i}
              textOnChangeHandler={this.props.textOnChangeHandler}
              checkOnChangeHandler={this.props.checkOnChangeHandler}
              radioOnClickHandler={this.props.radioOnClickHandler}
              key={i}
              questions={{ ...elm }}
              validat={this.props.validat}
              setEditindex={this.props.setEditindex}
            />
          );
        })
      : null;
    return (
      <div className="">
        <MDBContainer className="question-container">
          <MDBCol>{questions}</MDBCol>
        </MDBContainer>
        <MDBRow>
          <MDBBtn
            className="m-auto"
            onClick={this.props.submit}
            color="primary"
            type="submit"
          >
            Submit Form
          </MDBBtn>
        </MDBRow>
      </div>
    );
  }
}
export default QuestionsContainer;
