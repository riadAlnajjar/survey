import React, { Component } from "react";
import {
  MDBCard,
  MDBCol,
  MDBCardBody,
  MDBCardTitle,
  MDBCardFooter,
  MDBIcon,
  MDBBtnGroup,
  MDBBtn
  // MDBCardText
} from "mdbreact";
import "./FormCard.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Redirect } from "react-router-dom";
import axiosQ from "../../axios/axios-question";
class FormCard extends Component {
  state = {
    redirect1: false,
    redirect2: false,
    path1: "/Survey/edit/" + this.props.id,
    path2: "/report/" + this.props.id // /report/F21MGr47TMi210TM0330a1103y990021GG0
  };
  deletHandler = () => {
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("token"))
    };
    axiosQ
      .delete("forms/u/" + this.props.id, { headers: headers })
      .then(res => {
        if (res.data.danger) {
          const messages = res.data.messages;
          alert(messages);
        }
        if (!res.data.danger) {
          this.props.remove(this.props.index);
        }
      })
      .catch(error => console.log(error));
  };
  editHandeler = () => {
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("token"))
    };
    axiosQ
      // .put("forms/" + this.props.id, { headers: headers })
      .get("forms/u/" + this.props.id, { headers: headers })
      .then(res => {
        if (res.data.danger) {
          const messages = res.data.messages;
          alert(messages);
        } else {
          this.setState({ redirect1: true });
        }
      })
      .catch(error => console.log(error));
  };
  reportHandeler = () => {
    this.setState({ redirect2: true });
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("token"))
    };
    axiosQ
      .post("forms/u/" + this.props.id, {}, { headers: headers })
      .then(res => {
        if (res.data.danger) {
          const messages = res.data.messages;
          alert(messages);
        }
        this.setState({ redirect2: true });
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <React.Fragment>
        {this.state.redirect2 ? (
          <Redirect from="/" to={this.state.path2} />
        ) : null}
        {this.state.redirect1 ? <Redirect to={this.state.path1} /> : null}
        <MDBCol lg="6" xl="5" className="mb-3">
          <MDBCard className="d-flex mb-5 form">
            <div
              className="formColor"
              style={{ background: this.props.color }}
              // style={{
              //   backgroundColor: `rgba(${this.props.color.r}, ${
              //     this.props.color.g
              //   }, ${this.props.color.b}, ${this.props.color.a})`
              // }}
            />

            <MDBCardBody>
              <MDBBtn className="lockbtn">
                <MDBIcon icon="lock-open" />
              </MDBBtn>
              <MDBCardTitle className="font-bold mb-3">
                <strong>{this.props.title}</strong>
              </MDBCardTitle>
              {/* <MDBCardText>{"ID :" + this.props.id}</MDBCardText> */}
            </MDBCardBody>
            <MDBCardFooter className="links-light profile-card-footer">
              <MDBBtnGroup className="mr-2">
                <MDBBtn
                  color="warning-color"
                  className="warning-color text-white formBtn"
                  onClick={this.editHandeler}
                >
                  <MDBIcon icon="flask" />
                </MDBBtn>
                <CopyToClipboard
                  // http://192.168.43.110:3000/
                  text={"http://localhost:3000/SurveyLab/" + this.props.id}
                >
                  <MDBBtn
                    color="unique-color-dark"
                    className="unique-color-dark text-white formBtn"
                  >
                    <MDBIcon icon="link" />
                  </MDBBtn>
                </CopyToClipboard>
                <MDBBtn
                  color="cyan darken-4"
                  className="cyan darken-4 text-white formBtn "
                  onClick={this.reportHandeler}
                >
                  <MDBIcon icon="book-reader" />
                </MDBBtn>
                <MDBBtn
                  color="danger-color-dark"
                  className="danger-color-dark text-white formBtn"
                  onClick={this.deletHandler}
                >
                  <MDBIcon icon="eraser" />
                </MDBBtn>
              </MDBBtnGroup>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </React.Fragment>
    );
  }
}
export default FormCard;
