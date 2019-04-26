import React, { Component } from "react";
import {
  MDBCard,
  MDBCol,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBIcon,
  MDBBtnGroup,
  MDBBtn
} from "mdbreact";
import "./FormCard.css";
class FormCard extends Component {
  render() {
    return (
      <MDBCol lg="6" xl="5" className="mb-3">
        <MDBCard className="d-flex mb-5">
          <div
            className="formColor"
            style={{ backgroundColor: this.props.color }}
          />

          <MDBCardBody>
            <MDBCardTitle className="font-bold mb-3">
              <strong>{this.props.title}</strong>
            </MDBCardTitle>
            <MDBCardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter className="links-light profile-card-footer">
            <MDBBtnGroup className="mr-2">
              <MDBBtn
                color="warning-color"
                className="warning-color text-white formBtn"
              >
                <MDBIcon icon="flask" />
              </MDBBtn>
              <MDBBtn
                color="unique-color-dark"
                className="unique-color-dark text-white formBtn"
              >
                <MDBIcon icon="link" />
              </MDBBtn>
              <MDBBtn
                color="cyan darken-4"
                className="cyan darken-4 text-white formBtn "
              >
                <MDBIcon icon="book-reader" />
              </MDBBtn>
              <MDBBtn
                color="danger-color-dark"
                className="danger-color-dark text-white formBtn"
              >
                <MDBIcon icon="eraser" />
              </MDBBtn>
            </MDBBtnGroup>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
    );
  }
}
export default FormCard;
