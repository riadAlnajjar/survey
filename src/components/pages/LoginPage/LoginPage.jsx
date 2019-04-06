import React from "react";
import Backdrop from "../../../components/Backdrop/Backdrop";
import "./LoginPage.css";
import FormCard from "../../FormCard/LoginCard";
import NavBar from "../../Nav/NavBar";
const Loginpage = props => {
  return (
    <div>
      <div className="formG">
        <NavBar />
        <FormCard login={props.log} />
        <Backdrop show />
      </div>
    </div>
  );
};
export default Loginpage;
