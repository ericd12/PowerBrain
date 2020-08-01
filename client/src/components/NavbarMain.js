import React from "react";
import { Nav, Navbar, NavDropdown, Dropdown } from "react-bootstrap";
import logo from "../logo.png";

const NavbarMain = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img
          alt=""
          className="d-inline-block align-top"
          height="40"
          src={logo}
          width="200"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="/">Home</Nav.Link> */}
          <NavDropdown id="element-dropdown" title="Elements">
            <NavDropdown.Item href="/-elements/create">
              Create Element
            </NavDropdown.Item>
            <NavDropdown.Item href="/-elements">
              Manage Elements
            </NavDropdown.Item>
            <Dropdown.Divider />
            <NavDropdown id="items-dropdown" title="Manage Dropdown Options">
              <NavDropdown.Item href="/-formats">Format</NavDropdown.Item>
              <NavDropdown.Item href="/-categories">Category</NavDropdown.Item>
              <NavDropdown.Item href="/-markets">Market</NavDropdown.Item>
            </NavDropdown>
          </NavDropdown>
          <NavDropdown id="track-dropdown" title="Tracks">
            <NavDropdown.Item href="/-tracks/create">
              Create Track
            </NavDropdown.Item>
            <NavDropdown.Item href="/-tracks">Manage Tracks</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown id="basic-nav-dropdown" title="Programs">
            <NavDropdown.Item href="/-programs/create">
              Create Program
            </NavDropdown.Item>
            <NavDropdown.Item href="/-programs">
              Manage Programs
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMain;
