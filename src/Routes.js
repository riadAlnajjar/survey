import React from "react";
import { Route, Switch } from "react-router-dom";
import Loginpage from "./components/pages/LoginPage/LoginPage";
import SurveyBuilder from "./Containers/SurveyBuilder/SurveyBuilder";
import ProfilePage from "./components/pages/Profile/ProfilePage";
import axiosQ from "./axios/axios-question";
class Routes extends React.Component {
  state = {
    authData: {
      email: "",
      password: "",
      confirmPassWord: "",
      name: ""
    },
    isValid: false,
    token: null
  };
  componentDidMount() {
    const token = localStorage.getItem("token");
    const authData = localStorage.getItem("authData");
    if (token) {
      this.setState({ token });
    }
    if (authData) {
      this.setState({ authData });
    }
  }

  SignInHandler = auth => {
    this.setState({ authData: auth });
    axiosQ
      .post("users/login", auth)
      .then(res => {
        console.log(res);
        if (!res.data.danger) {
          localStorage.setItem("authData", auth);
        }
        this.setState({ isValid: res.data.danger });
      })
      .catch(error => console.log(error));
  };
  SignUpHandler = auth => {
    console.log(auth);
    this.setState({ authData: auth });
    axiosQ
      .post("users/register", auth)
      .then(res => {
        if (!res.data.danger) {
          this.SignInHandler(auth);
        }
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <Switch>
        <Route
          path="/profile"
          exact
          render={props => <ProfilePage {...props} />}
        />
        <Route
          path="/SignUp"
          exact
          render={props => (
            <Loginpage logHandler={this.SignUpHandler} {...props} />
          )}
        />
        <Route
          path="/SurveyLab"
          exact
          render={props => <SurveyBuilder {...props} />}
        />
        <Route
          path="/SurveyLab/:id"
          render={props => <SurveyBuilder made={true} {...props} />}
        />
        <Route
          path="/"
          exact
          render={props => (
            <Loginpage log={true} logHandler={this.SignInHandler} {...props} />
          )}
        />
      </Switch>
      /* // ) : (
    //   <Switch>
    //     <Route
    //       path="/SignUp"
    //       exact
    //       render={props => (
    //         <Loginpage logHandler={this.SignUpHandler} {...props} />
    //       )}
    //     />
    //     <Route
    //       path="/"
    //       render={props => (
    //         <Loginpage log={true} logHandler={this.SignInHandler} {...props} />
    //       )}
    //     />
    //   </Switch>
   // );*/
    );
  }
}

export default Routes;
