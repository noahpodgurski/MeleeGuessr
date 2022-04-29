import React, { useState } from "react";
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { MDBInput } from "mdb-react-ui-kit";

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
          <MDBNavbarItem>
            <MDBNavbarLink style={{paddingRight: "20px"}} active aria-current='page' href='#' onClick={toggleShowModal}>
              <MDBBtn size="sm" color="light" floating tag='a'>
                <MDBIcon fas icon='user' size='1x'/>
              </MDBBtn>
            </MDBNavbarLink>
          </MDBNavbarItem>
          {/* <MDBNavbarItem>
            <MDBNavbarLink href='/register'>Register</MDBNavbarLink>
          </MDBNavbarItem> */}
        </MDBNavbarNav>
      </MDBNavbar>
        <MDBModal className="dark-modal" show={showModal} setShow={setShowModal} tabIndex={-1}>
        <MDBModalDialog size="fullscreen-lg-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Login</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShowModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="d-flex justify-content-center align-items-center m-2">
                <div className="row justify-content-center">
                  <div className="m-1">
                    <MDBInput size="lg" className="login-form" contrast style={{background: "#2d313a", color: 'white'}} label='Email' id='email' type='text' />
                  </div>
                  <div className="m-1">
                    <MDBInput size="lg" className="login-form" contrast style={{background: "#2d313a", color: 'white'}} label='Password'  id='password' type='password' />
                  </div>
                  <a className="forgot-pass" href="#">Forgot password?</a>
                </div>
              </div>
              <div className="d-flex justify-content-between m-4">
                <MDBBtn size="lg" outline color='light' onClick={toggleShowModal}>Create Account</MDBBtn>
                <MDBBtn size="lg" color="success" onClick={toggleShowModal}>Login</MDBBtn>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
    );
  }

export default NavbarPage;