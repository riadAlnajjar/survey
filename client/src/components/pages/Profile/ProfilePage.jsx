import React, { Component } from "react";
import { Icon } from "rsuite";
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
  MDBBtnGroup,
  MDBView,
  MDBMask,
  MDBModal,
  MDBModalBody,
  MDBModalHeader
} from "mdbreact";

import axiosQ from "../../../axios/axios-question";
import "./ProfilePage.css";
import FormCard from "../../FormCard/FormCard";
import { Redirect } from "react-router-dom";
import Backdrop from "../../Backdrop/Backdrop";

class ProfilePage extends Component {
  state = {
    forms: [],
    redirect: false,
    quizeRedirect: false,
    image: null,
    modal1: false,
    modal2: false
  };
  componentDidMount() {
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("token"))
    };
    axiosQ
      .get("/users/info/", { headers: headers })
      .then(res => {
        if (res.data.danger) {
          const messages = res.data.messages;
          alert(messages);
        } else {
          this.setState({ image: res.data.data.image });
        }
      })
      .catch(error => {
        console.log(error);
      });
    axiosQ
      .get("/forms/u/", { headers: headers })
      .then(res => {
        if (res.data.danger) {
          const messages = res.data.messages;
          alert(messages);
        }
        const forms = [...res.data.data];
        this.setState({ forms: forms });
      })
      .catch(error => {
        console.log(error);
      });
  }
  toggle = nr => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };
  imageHandleChange = (e, Type) => {
    if (Type === 1) {
      const headers = {
        Authorization: JSON.parse(localStorage.getItem("token"))
      };
      axiosQ
        .post("users/edit", { image: "" }, { headers: headers })
        .then(res => {
          if (res.data.danger) {
            const messages = res.data.messages;
            alert(messages);
          } else {
            this.setState({ image: "" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      var input = e.target;
      var reader = new FileReader();
      let dataURL;
      reader.onload = () => {
        dataURL = reader.result;
        this.setState({ image: dataURL });
        const headers = {
          Authorization: JSON.parse(localStorage.getItem("token"))
        };
        axiosQ
          .post("users/edit", { image: this.state.image }, { headers: headers })
          .then(res => {
            if (res.data.danger) {
              const messages = res.data.messages;
              alert(messages);
            }
          })
          .catch(error => {
            console.log(error);
          });
      };
      reader.readAsDataURL(input.files[0]);
    }
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
            color={elm.theme}
            remove={this.remove}
          />
        );
      });
    }
    let redirect = null;
    if (this.state.quizeRedirect === true) {
      redirect = (
        <Redirect
          to={{
            pathname: "/SurveyLab",
            state: { quize: true }
          }}
        />
      );
    } else if (this.state.redirect === true) {
      redirect = (
        <Redirect
          to={{
            pathname: "/SurveyLab",
            state: { quize: false }
          }}
        />
      );
    }
    return (
      <React.Fragment>
        <div className="Pbg">
          {redirect}
          <div className="profilePage ">
            <NavBar
              linkDisplay
              colorStyle={{ color: "#fff" }}
              logOutHandler={this.props.logOutHandler}
            />
            <MDBRow className="justify-content-center">
              <MDBCol sm="12" md="6" lg="4" className="mb-5 userCard">
                <MDBCard className="card-cascade " style={{ margin: "-10px" }}>
                  {this.state.image && this.state.image !== "" ? (
                    <MDBView className="view-cascade">
                      <MDBCardImage
                        className="img-fluid mx-auto img-responsive"
                        src={this.state.image ? this.state.image : null}
                      />
                      <MDBMask className="flex-center" overlay="black-slight" />
                    </MDBView>
                  ) : (
                    <div className="inputImageDiv">
                      <input
                        type="file"
                        onChange={e => this.imageHandleChange(e, 2)}
                      />
                      <div>
                        <button className="cameraBtn">
                          <Icon icon="camera-retro" size="lg" />
                        </button>
                      </div>
                    </div>
                  )}
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
                    <MDBBtn
                      onClick={() => this.toggle(1)}
                      className="setting-btn "
                    >
                      <MDBIcon icon="cog" />
                    </MDBBtn>
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
                          this.setState({ modal2: true });
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
          <MDBModal
            fullHeight
            position="left"
            isOpen={this.state.modal1}
            toggle={() => this.toggle(1)}
          >
            <MDBModalHeader className="text-center">settings</MDBModalHeader>
            <MDBModalBody className="text-center">
              <h1> change your profile picture </h1>
              <div className="imageChangeDiv">
                <input
                  type="file"
                  onChange={e => this.imageHandleChange(e, 2)}
                />
                <MDBBtn
                  outline
                  color="secondary"
                  style={{ position: "inherit" }}
                >
                  select image
                </MDBBtn>
              </div>
              <MDBBtn
                outline
                color="danger"
                onClick={e => this.imageHandleChange(e, 1)}
              >
                remove
              </MDBBtn>
            </MDBModalBody>
          </MDBModal>
          <MDBModal
            centered
            isOpen={this.state.modal2}
            toggle={() => this.toggle(2)}
          >
            <MDBModalHeader className="text-center">form type</MDBModalHeader>
            <MDBModalBody className="text-center form-type">
              <MDBBtn
                color="unique-color-purple"
                className="btn-outline-unique-purple "
                onClick={() => this.setState({ redirect: true })}
              >
                normal form
              </MDBBtn>
              <MDBBtn
                outline
                color="unique-color-blue"
                className="btn-outline-unique-blue"
                onClick={() => this.setState({ quizeRedirect: true })}
              >
                quize form
              </MDBBtn>
            </MDBModalBody>
          </MDBModal>
          <Backdrop show />
        </div>
      </React.Fragment>
    );
  }
}

export default ProfilePage;
