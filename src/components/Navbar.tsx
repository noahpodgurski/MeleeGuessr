import React, { useState } from "react";
import {
  MDBBtn,
  MDBIcon,
  MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { LoginModal } from "./LoginModal";

const NavbarPage: React.FC = () => {
	const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => setShowModal(!showModal);
  return (
      <>
      <MDBNavbar color="dark" dark expand="md">
        <MDBNavbarNav fullWidth={false} className='mr-auto mb-2 mb-lg-0'>
          <MDBNavbarBrand tag="span">
            <Link to="/">
              <strong className="white-text" style={{marginLeft: '20px'}}>MeleeGuessr</strong>
            </Link>
          </MDBNavbarBrand>
        </MDBNavbarNav>
        <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
          <MDBNavbarItem style={{paddingRight: "20px"}} active aria-current='page' onClick={toggleShowModal}>
            <MDBBtn size="sm" color="light" floating tag='a'>
              <MDBIcon fas icon='user' size='1x'/>
            </MDBBtn>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBNavbar>
      <LoginModal showModal={showModal} setShowModal={setShowModal} toggleShowModal={toggleShowModal} />
    </>
    );
  }

export default NavbarPage;