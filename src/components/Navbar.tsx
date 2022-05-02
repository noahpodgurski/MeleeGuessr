import React, { useCallback, useContext, useState } from "react";
import {
  MDBBtn,
  MDBIcon,
  MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { LoginModal } from "./LoginModal";
import { IUser, UserContext } from "../hooks/UseUser";
import { ProfileModal } from "./ProfileModal";


const NavbarPage: React.FC = () => {
  const [showModal, setShowLoginModal] = useState(false);
  const toggleShowLoginModal = () => setShowLoginModal(!showModal);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const toggleShowProfileModal = () => setShowProfileModal(!showProfileModal);
  const { user, updateUser } = useContext<IUser>(UserContext);

  const toggleModal = useCallback(() => {
    if (user){
      toggleShowProfileModal()
    } else {
      toggleShowLoginModal();
    }
  }, [user, toggleShowProfileModal, toggleShowLoginModal]);
  
  return (
      <>
      <MDBNavbar color="dark" dark expand="md">
        <MDBNavbarNav fullWidth={false} className='mr-auto mb-2 mb-lg-0'>
          <MDBNavbarBrand tag="span">
            <Link to="/">
              <strong className="logo brand" style={{marginLeft: '20px'}}>MeleeGuessr</strong>
            </Link>
          </MDBNavbarBrand>
        </MDBNavbarNav>
        <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
          <MDBNavbarItem style={{marginRight: "20px", alignSelf: 'center'}} active aria-current='page' onClick={toggleModal}>
            <MDBBtn size="sm" color="light" floating tag={user ? "button" : "a"} >
              { user ? user.username[0] : <MDBIcon fas icon='user' size='1x'/> }
            </MDBBtn>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBNavbar>
      <ProfileModal showModal={showProfileModal} setShowModal={setShowProfileModal} toggleShowModal={toggleShowProfileModal} updateUser={updateUser} />
      <LoginModal showModal={showModal} setShowModal={setShowLoginModal} toggleShowModal={toggleShowLoginModal} updateUser={updateUser} />
    </>
    );
  }

export default NavbarPage;