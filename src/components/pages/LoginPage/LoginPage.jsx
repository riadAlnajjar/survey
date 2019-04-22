import React from "react";
import Backdrop from "../../../components/Backdrop/Backdrop";
import "./LoginPage.css";
import FormCard from "../../LogCard/LoginCard";
import NavBar from "../../Nav/NavBar";
const Loginpage = props => {
  return (
    <div>
      <div className="formG">
        <NavBar colorStyle={{ color: "#fff" }} />
        <FormCard login={props.log} logHandler={props.logHandler} />
        <Backdrop show />
      </div>
    </div>
  );
};
export default Loginpage;
