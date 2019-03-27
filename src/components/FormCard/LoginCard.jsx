import React from "react";
import "./LoginCard.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";

const FormCard = props => {
  let input;
  if (props.login) {
    input = (
      <React.Fragment>
        <MDBInput
          label="Type your email"
          icon="envelope"
          group
          type="email"
          validate
          error="wrong"
          success="right"
        />
        <MDBInput
          label="Type your password"
          icon="lock"
          group
          type="password"
          validate
        />{" "}
      </React.Fragment>
    );
  } else {
    input = (
      <React.Fragment>
        <MDBInput
          label="Your name"
          icon="user"
          group
          type="text"
          validate
          error="wrong"
          success="right"
        />
        <MDBInput
          label="Your email"
          icon="envelope"
          group
          type="email"
          validate
          error="wrong"
          success="right"
        />
        <MDBInput
          label="Your password"
          icon="lock"
          group
          type="password"
          validate
        />

        <MDBInput
          label="Confirm your password"
          icon="exclamation-triangle"
          group
          type="text"
          validate
          error="wrong"
          success="right"
        />
      </React.Fragment>
    );
  }
  return (
    <MDBContainer className="mt-5 my-card">
      <MDBRow center>
        <MDBCol md="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardHeader className="form-header deep-blue-gradient rounded">
                <h3 className="my-3">
                  <MDBIcon icon="lock" />
                  {props.login ? " Login :" : " Sign Up :"}
                </h3>
              </MDBCardHeader>
              <form>
                <div className="grey-text">{input}</div>

                <div className="text-center mt-4">
                  <MDBBtn color="light-blue" className="mb-3" type="submit">
                    {props.login ? " Login " : " Sign Up "}
                  </MDBBtn>
                </div>
              </form>
              {props.login ? (
                <MDBModalFooter>
                  <div className="font-weight-light text-center">
                    <p>Not a member? Sign Up</p>
                    <p>Forgot Password?</p>
                  </div>
                </MDBModalFooter>
              ) : null}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormCard;
