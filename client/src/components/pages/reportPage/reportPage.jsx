import React, { Component } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import NavBar from "../../Nav/NavBar";
import Backdrop from "../../Backdrop/Backdrop";
import "./reportPage.css";
//import axiosQ from "../../../axios/axios-question";

class ReportPage extends Component {
  state = {
    title: "",
    id: "",
    questions: [{ type: "type", question: "question" }],
    answers: [["1", "2", "3", "4"], ["1", "2", "3", "4"], ["1", "2", "3", "4"]]
  };
  componentDidMount() {
    console.log(this.props);
    //     const headers = {
    //       Authorization: JSON.parse(localStorage.getItem("token"))
    //     };
    //     axiosQ
    //       .post("" + this.props.match.params.id, { headers: headers })
    //       .then(res => {
    //         if (res.data.danger) {
    //           const messages = res.data.messages;
    //           alert(messages);
    //         }

    //         const questions = [...res.data.data.questions];
    //         const answers = [...res.data.data.answers];
    //         this.setState({ questions: questions, answers: answers });
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
  }
  render() {
    return (
      <React.Fragment>
        <div className="formG">
          <NavBar
            profile
            linkDisplay
            colorStyle={{ color: "#fff" }}
            logOutHandler={this.props.logOutHandler}
          />
          <div className="reportPage">
            <div className="table-con">
              <div className="table-info">{this.state.title}</div>
              <MDBTable hover>
                <MDBTableHead color="primary-color" textWhite>
                  <tr>
                    {/* <th>#</th> */}
                    {this.state.questions.map((elm, i) => {
                      return <th key={i}>{elm.question}</th>;
                    })}
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {this.state.answers.map((elm, index) => {
                    return (
                      <tr key={index} className="TrBody">
                        {elm.a.map((e, i) => {
                          return <td key={i}>{e}</td>;
                        })}
                      </tr>
                    );
                  })}
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
          <Backdrop show />
        </div>
      </React.Fragment>
    );
  }
}
export default ReportPage;
