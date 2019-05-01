import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Loginpage from "./components/pages/LoginPage/LoginPage";
import SurveyBuilder from "./Containers/SurveyBuilder/SurveyBuilder";
import ProfilePage from "./components/pages/Profile/ProfilePage";
import axiosQ from "./axios/axios-question";

class Routes extends React.Component {
  state = {
    authData: {
      email: "",
      password: "",
      passWord2: "",
      name: ""
    },
    isValid: false,
    token: null
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const authData = localStorage.getItem("authData");
    const isValid = localStorage.getItem("isValid");
    if (token) {
      this.setState({ token: JSON.parse(token) });
    }
    if (isValid) {
      this.setState({ isValid: isValid });
    }
    if (authData) {
      this.setState({ authData: JSON.parse(authData) });
    }
  }

  SignInHandler = auth => {
    axiosQ
      .post("users/login", auth)
      .then(res => {
        console.log("signin", res);
        auth.name = res.data.data.name;
        auth.password = "";
        auth.password2 = "";
        this.setState({ authData: auth });
        if (!res.data.danger) {
          let authData = { name: "", email: "" };
          authData.name = auth.name;
          authData.email = auth.email;

          localStorage.setItem("authData", JSON.stringify(authData));
          localStorage.setItem("token", JSON.stringify(res.data.data.token));
          this.setState({ isValid: !res.data.danger });
          this.setState({ token: res.data.data.token });
          localStorage.setItem("isValid", !res.data.danger);
        }
      })
      .catch(error => console.log(error));
  };
  SignUpHandler = auth => {
    console.log("signup", auth);
    console.log(auth);
    axiosQ
      .post("users/register", auth)
      .then(res => {
        console.log(res);
        if (!res.data.danger) {
          this.SignInHandler(auth);
        }
      })
      .catch(error => console.log(error));
  };
  logOutHandler = () => {
    localStorage.clear();
    const isValid = false;
    this.setState({ isValid: isValid });
  };

  render() {
    return this.state.isValid ? (
      <Switch>
        <Redirect from="/SignUp" to="/" />
        <Redirect from="/SignIn" to="/" />
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
          path="/SurveyLab/edit/:id"
          render={props => <SurveyBuilder edit={true} {...props} />}
        />
        <Route
          path="/"
          render={props => (
            <ProfilePage {...props} logOutHandler={this.logOutHandler} />
          )}
        />
      </Switch>
    ) : (
      <Switch>
        <Route
          path="/SignUp"
          exact
          render={props => (
            <Loginpage logHandler={this.SignUpHandler} {...props} />
          )}
        />
        <Route
          path="/SignIn"
          render={props => (
            <Loginpage log={true} logHandler={this.SignInHandler} {...props} />
          )}
        />
        <Redirect from="/" to="/SignIn" />
      </Switch>
    );
  }
}

export default Routes;
