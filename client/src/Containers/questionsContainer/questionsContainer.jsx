import React, { Component } from "react";
import Question from "../../components/Questions/Question";
import { MDBContainer, MDBCol, MDBRow, MDBBtn } from "mdbreact";
import "./questionsContainer.css";
import { setTimeout } from "timers";

class QuestionsContainer extends Component {
  state = {
    loading: false
  };

  delye() {
    setTimeout(() => {
      this.state.loading
        ? this.setState({ loading: false })
        : console.log("done");
    }, 1000);
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
              addEditHandler={this.props.addEditHandler}
              made={this.props.made}
              remove={this.props.remove}
            />
          );
        })
      : null;
    let submit;
    if (this.props.made) {
      this.props.fillDone
        ? (submit = <h6 className="m-auto text-white">done</h6>)
        : (submit = (
            <MDBBtn
              className="m-auto Tbtn"
              onClick={e => {
                this.setState({ loading: !this.props.submit(e) });
              }}
              color="primary"
              type="submit"
            >
              Submit Form
            </MDBBtn>
          ));
    } else {
      this.state.loading
        ? (submit = (
            <React.Fragment>
              {this.delye()}
              <div className="spinner-border text-primary m-auto" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </React.Fragment>
          ))
        : (submit = (
            <MDBBtn
              className="m-auto Tbtn"
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
    }
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
