import React from "react";
import {
  MDBNavbar, MDBNavbarBrand
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LivesContext } from "../hooks/UseLives";

const NavbarPage: React.FC = () => {
  const {lives} = useContext(LivesContext);
  return (
      <MDBNavbar color="dark" dark expand="md">
        <MDBNavbarBrand>
          <Link to="/">
            <strong className="white-text" style={{marginLeft: '20px'}}>MeleeGuessr</strong>
          </Link>
        </MDBNavbarBrand>
        
        <span className='ms-auto navbar-text dark-red-text' style={{marginRight: '20px'}}>Lives: {lives}</span>
      </MDBNavbar>
    );
  }

export default NavbarPage;