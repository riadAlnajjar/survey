import React from "react";
import { NavLink } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBContainer
} from "mdbreact";
import "./NavBar.css";
class NavBar extends React.Component {
  state = {
    collapseID: ""
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("navbarCollapse")}
      />
    );
    return (
      <div id="classicformpage">
        <div>
          <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
            <MDBContainer>
              <MDBNavbarBrand>
                <strong style={this.props.colorStyle}>Survey lab</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler
                onClick={this.toggleCollapse("navbarCollapse")}
              />
              <MDBCollapse
                id="navbarCollapse"
                isOpen={this.state.collapseID}
                navbar
              >
                {this.props.linkDisplay ? (
                  <MDBNavbarNav left>
                    <MDBNavItem active>
                      <NavLink
                        style={this.props.colorStyle}
                        to="/SurveyLab"
                        exact
                      >
                        laboratory
                      </NavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                ) : null}
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
          {this.state.collapseID && overlay}
        </div>
      </div>
    );
  }
}
export default NavBar;
