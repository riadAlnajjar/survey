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
    redirect: false,
    path: "/Survey/edit/" + this.props.id
  };
  deletHandler = () => {
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("token"))
    };
    axiosQ
      .delete("forms/" + this.props.id, { headers: headers })
      .then(res => {
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
      .post("forms/" + this.props.id, { headers: headers })
      .then(res => {
        this.setState({ redirect: true });
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <React.Fragment>
        {this.state.redirect ? <Redirect to={this.state.path} /> : null}
        <MDBCol lg="6" xl="5" className="mb-3">
          <MDBCard className="d-flex mb-5">
            <div
              className="formColor"
              style={{
                backgroundColor: `rgba(${this.props.color.r}, ${
                  this.props.color.g
                }, ${this.props.color.b}, ${this.props.color.a})`
              }}
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
                  text={"http://192.168.1.106:3000/SurveyLab/" + this.props.id}
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
