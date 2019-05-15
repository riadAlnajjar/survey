import React, { Component } from "react";
import { Uploader, Icon } from "rsuite";
import NavBar from "../../Nav/NavBar";
import {
  MDBCard,
  MDBCol,
  MDBRow,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
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
    forms: [],
    redirect: false,
    image: []
  };
  componentDidMount() {
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("token"))
    };
    axiosQ
      .get("/forms", { headers: headers })
      .then(res => {
        console.log(res);
        const forms = [...res.data.data];
        this.setState({ forms: forms });
      })
      .catch(error => {
        console.log(error);
      });
  }
  imageHandleChange = image => {
    this.setState({ image: image });
    console.log(image);
  };
  remove = index => {
    let forms = [...this.state.forms];
    if (forms[index]) {
      forms.splice(index, 1);
      this.setState({ forms });
    }
  };

  render() {
    let formCards = null;
    if (this.state.forms) {
      formCards = this.state.forms.map((elm, i) => {
        return (
          <FormCard
            key={i}
            index={i}
            id={elm.id}
            title={elm.title}
            color={elm.them}
            remove={this.remove}
          />
        );
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
                <MDBCardImage
                  className="img-fluid"
                  src={this.state.image ? this.state.image[0] : null}
                />
                <Uploader
                  multiple={false}
                  disabled
                  fileList={this.state.image}
                  listType="picture"
                  action="//jsonplaceholder.typicode.com/posts/"
                  onChange={e => {
                    this.setState({ image: e });
                    console.log(this.state.image);
                    setTimeout(() => {
                      this.setState({ image: e });
                      console.log(this.state.image);
                    }, 3000);
                  }}
                >
                  <button>
                    <Icon icon="camera-retro" size="lg" />
                  </button>
                </Uploader>
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
