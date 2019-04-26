import React, { Component } from "react";
import "./fileinput.css";
import axiosQ from "../../axios/axios-question";
class Fileinput extends Component {
  state = {
    value: "Upload your file",
    selectedFile: null
  };
  fileSelectedHandler = e => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    this.setState({
      selectedFile: selectedFile,
      value: e.target.files[0].name
    });
    console.log("selectedFile : ", this.state.selectedFile);
  };
  fileUploadHandler = e => {
    let fd = new FormData();
    fd.append("image", this.state.selectedFile, this.state.value);
    console.log("fd", fd);
    axiosQ
      .post("", fd, {
        onUploadProgress: ProgressEvent => {
          console.log(
            "upload progress : " +
              Math.round(
                (ProgressEvent.loaded / ProgressEvent.total) * 100 + "%"
              )
          );
        }
      })
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };
  render() {
    return (
      <form className="md-form my-3">
        <div className="file-field">
          <div className="btn btn-primary btn-sm float-left waves-effect waves-light">
            <span>Choose file</span>
            <input
              onChange={e => {
                this.fileSelectedHandler(e);
              }}
              type="file"
            />
          </div>

          <div className="file-path-wrapper">
            <input
              className="file-path validate valid"
              type="text"
              placeholder={this.state.value}
              disabled
            />
          </div>
        </div>
      </form>
    );
  }
}
export default Fileinput;
