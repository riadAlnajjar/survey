import React from "react";
import Backdrop from "../../../components/Backdrop/Backdrop";
import "./LoginPage.css";
import FormCard from "../../LogCard/LoginCard";
import NavBar from "../../Nav/NavBar";
//import Loading from "../../loading/loading";
const Loginpage = props => {
  return (
    <div>
      <div className="formG">
        <NavBar colorStyle={{ color: "#fff" }} />
        <FormCard login={props.log} logHandler={props.logHandler} />
        <Backdrop show />
      </div>
      {/* <Loading /> */}
    </div>
  );
};
export default Loginpage;
