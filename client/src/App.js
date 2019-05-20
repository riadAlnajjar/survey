import React, { Component } from "react";
import "./App.css";
import Routes from "./Routes";
class App extends Component {
  render() {
    return (
      <div style={{ overflow: "hidden" }}>
        <main>
          <Routes />
        </main>
      </div>
    );
  }
}

export default App;
