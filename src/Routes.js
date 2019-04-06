import React from "react";
import { Route, Switch } from "react-router-dom";
// import DashboardPage from './pages/DashboardPage';
// import ProfilePage from './pages/ProfilePage';
import Loginpage from "./components/pages/LoginPage/LoginPage";
import SurveyBuilder from "./Containers/SurveyBuilder/SurveyBuilder";
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/SignUp" exact render={() => <Loginpage />} />
        <Route path="/SurveyLab" render={() => <SurveyBuilder />} />
        <Route path="/" exact render={() => <Loginpage log={true} />} />
      </Switch>
    );
  }
}

export default Routes;
