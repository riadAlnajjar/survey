import React, { Component } from "react";
import Question from "../../components/Questions/Question";
import { MDBContainer, MDBCol, MDBRow, MDBBtn } from "mdbreact";
import "./questionsContainer.css";

class QuestionsContainer extends Component {
  render() {
    const questions = this.props.questions
      ? this.props.questions.map((elm, i) => {
          return (
            <Question
              index={i}
              textOnChangeHandler={this.props.textOnChangeHandler}
              key={i}
              questions={{ ...elm }}
              validat={this.props.validat}
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
