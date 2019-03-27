import React from "react";
import Backdrop from "../../../components/Backdrop/Backdrop";
import "./LoginPage.css";
import FormCard from "../../FormCard/LoginCard";
const Loginpage = props => {
  return (
    <div>
      <div className="formG">
        <Backdrop show />
        <FormCard />
      </div>
    </div>
  );
};
export default Loginpage;
