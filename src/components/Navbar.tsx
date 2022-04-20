import React from "react";
import {
  MDBNavbar, MDBNavbarBrand
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const NavbarPage: React.FC = () => {
  return (
      <MDBNavbar color="dark" dark expand="md">
        <MDBNavbarBrand>
          <Link to="/">
            <strong className="white-text" style={{marginLeft: '20px'}}>MeleeGuessr</strong>
          </Link>
        </MDBNavbarBrand>
      </MDBNavbar>
    );
  }

export default NavbarPage;