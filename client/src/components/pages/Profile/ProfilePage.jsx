import React, { Component } from "react";
import NavBar from "../../Nav/NavBar";
import {
  MDBCard,
  MDBCol,
  MDBRow,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBBtnGroup
} from "mdbreact";

import axiosQ from "../../../axios/axios-question";
import "./ProfilePage.css";
import FormCard from "../../FormCard/FormCard";
import { Redirect } from "react-router-dom";

class ProfilePage extends Component {
  state = {
    forms: [{ title: "", id: "", color: "" }],
    redirect: false
  };
  componentDidMount() {
    axiosQ
      .post("/forms/(survay id)", { user: "admin@admin.com" })
      .then(res => {
        console.log(res);
        const forms = [...res.data.data];
        this.setState({ forms: forms });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    let formCards = null;
    if (this.state.forms) {
      formCards = this.state.forms.map((elm, i) => {
        return <FormCard key={i} title={elm.title} color={elm.color} />;
      });
    }
    let redirect = null;
    if (this.state.redirect) {
      redirect = <Redirect to="/SurveyLab" />;
    }
    return (
      <React.Fragment>
        {redirect}

        <div className="profilePage ">
          <NavBar
            linkDisplay
            colorStyle={{ color: "#000" }}
            logOutHandler={this.props.logOutHandler}
          />
          <MDBRow className="justify-content-center">
            <MDBCol sm="12" md="6" lg="4" className="mb-5 userCard">
              <MDBCard>
                <MDBCardImage className="img-fluid" />
                <MDBCardBody>
                  <MDBCardTitle className="text-center mb-2 font-bold">
                    {JSON.parse(localStorage.getItem("authData")).name}
                  </MDBCardTitle>
                  <MDBCardTitle
                    sub
                    className="text-center indigo-text mb-2 font-bold"
                  >
                    {JSON.parse(localStorage.getItem("authData")).email}
                  </MDBCardTitle>
                  <MDBCardText>
                    <strong className="mb-2">About:</strong>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Ratione perferendis quod animi dignissimos consectetur
                    quibusdam numquam laboriosam, minus, provident...
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="6" lg="7" className="formCard">
              <section className="text-center pb-3">
                <MDBRow className="d-flex justify-content-center">
                  {formCards}
                  <MDBCol lg="6" xl="5" className="mb-3">
                    <MDBBtn
                      onClick={e => {
                        this.setState({ redirect: true });
                      }}
                      floating
                      color="primary"
                      className="form-add "
                    >
                      <MDBIcon icon="plus" size="4x" />
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </section>
            </MDBCol>
          </MDBRow>
          <MDBBtnGroup />
        </div>
      </React.Fragment>
    );
  }
}

export default ProfilePage;
