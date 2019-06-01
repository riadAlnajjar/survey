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
    image: null,
    modal: false
  };
  componentDidMount() {
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("token"))
    };
    axiosQ
      .get("/forms/u/", { headers: headers })
      .then(res => {
        if (res.data.danger) {
          const messages = res.data.messages;
          alert(messages);
        }
        console.log(res);
        const forms = [...res.data.data];
        this.setState({ forms: forms });
      })
      .catch(error => {
        console.log(error);
      });

    axiosQ
      .get("users/pic", { headers: headers })
      .then(res => {
        if (res.data.danger) {
          const messages = res.data.messages;
          alert(messages);
        } else {
          this.setState({ image: res.data.data });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  imageHandleChange = e => {
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
        <div className="formG">
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
                  {/* {console.log(this.state.image)} */}
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
                      <input type="file" onChange={this.imageHandleChange} />
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
                    <MDBBtn onClick={this.toggle} className="setting-btn ">
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
          <MDBModal
            fullHeight
            position="left"
            isOpen={this.state.modal}
            toggle={this.toggle}
          >
            <MDBModalHeader className="text-center">settings</MDBModalHeader>
            <MDBModalBody className="text-center">
              <h1> change your profile picture </h1>
              <div className="imageChangeDiv">
                <input type="file" onChange={this.imageHandleChange} />
              </div>
            </MDBModalBody>
          </MDBModal>
          <Backdrop show />
        </div>
      </React.Fragment>
    );
  }
}

export default ProfilePage;
