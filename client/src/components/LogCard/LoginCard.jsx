import React, {Component} from "react";
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

class FormCard extends Component {
    state = {
        authData: {
            email: "",
            password: "",
            password2: "",
            name: ""
        }
    };

    render() {
        let input;
        if (this.props.login) {
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
                        value={this.state.authData.email}
                        onChange={e => {
                            const newAuthDatda = {...this.state.authData};
                            newAuthDatda.email = e.currentTarget.value;
                            this.setState({authData: newAuthDatda});
                        }}
                    />
                    <MDBInput
                        label="Type your password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        value={this.state.authData.password}
                        onChange={e => {
                            const newAuthDatda = {...this.state.authData};
                            newAuthDatda.password = e.currentTarget.value;
                            this.setState({authData: newAuthDatda});
                        }}
                    />
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
                        value={this.state.authData.name}
                        onChange={e => {
                            const newAuthDatda = {...this.state.authData};
                            newAuthDatda.name = e.currentTarget.value;
                            this.setState({authData: newAuthDatda});
                        }}
                    />
                    <MDBInput
                        label="Your email"
                        icon="envelope"
                        group
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                        value={this.state.authData.email}
                        onChange={e => {
                            const newAuthDatda = {...this.state.authData};
                            newAuthDatda.email = e.currentTarget.value;
                            this.setState({authData: newAuthDatda});
                        }}
                    />
                    <MDBInput
                        label="Your password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        value={this.state.authData.password}
                        onChange={e => {
                            const newAuthDatda = {...this.state.authData};
                            newAuthDatda.password = e.currentTarget.value;
                            this.setState({authData: newAuthDatda});
                        }}
                    />

                    <MDBInput
                        label="Confirm your password"
                        icon="exclamation-triangle"
                        group
                        type="password"
                        validate
                        error="wrong"
                        success="right"
                        value={this.state.password2}
                        onChange={e => {
                            const newAuthDatda = {...this.state.authData};
                            newAuthDatda.password2 = e.currentTarget.value;
                            this.setState({authData: newAuthDatda});
                        }}
                    />
                </React.Fragment>
            );
        }
        return (
            <MDBContainer className="mt-5 my-card">
                <MDBRow center>
                    <MDBCol lg="4" md="6">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardHeader className="form-header deep-blue-gradient rounded">
                                    <h3 className="my-3">
                                        <MDBIcon icon="lock"/>
                                        {this.props.login ? " Login :" : " Sign Up :"}
                                    </h3>
                                </MDBCardHeader>
                                <form>
                                    <div className="grey-text">{input}</div>

                                    <div className="text-center mt-4">
                                        <MDBBtn
                                            onClick={e => {
                                                e.preventDefault();
                                                this.props.logHandler(this.state.authData);
                                            }}
                                            color="light-blue"
                                            className="mb-3"
                                            type="submit"
                                        >
                                            {this.props.login ? " Login " : " Sign Up "}
                                        </MDBBtn>
                                    </div>
                                </form>
                                {this.props.login ? (
                                    <MDBModalFooter>
                                        <div className="font-weight-light text-center">
                                            <p>
                                                Not a member? <a href="/SignUp">Sign Up</a>
                                            </p>
                                            {/* <p>Forgot Password?</p> */}
                                        </div>
                                    </MDBModalFooter>
                                ) : null}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default FormCard;
