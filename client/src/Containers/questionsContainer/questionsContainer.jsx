import React, { Component } from "react";
import Question from "../../components/Questions/Question";
import { MDBContainer, MDBCol, MDBRow, MDBBtn } from "mdbreact";
import "./questionsContainer.css";

class QuestionsContainer extends Component {
  state = {
    loading: false
  };
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
    let submit;
    this.state.loading
      ? (submit = (
          <div className="spinner-border text-primary m-auto" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ))
      : (submit = (
          <MDBBtn
            className="m-auto"
            onClick={e => {
              this.props.submit(e);
              this.setState({ loading: true });
            }}
            color="primary"
            type="submit"
          >
            Submit Form
          </MDBBtn>
        ));
    return (
      <div className="">
        <MDBContainer className="question-container">
          <MDBCol>{questions}</MDBCol>
        </MDBContainer>
        <MDBRow>{submit}</MDBRow>
      </div>
    );
  }
}
export default QuestionsContainer;
