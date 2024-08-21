import { LoginModal } from "./LoginModal";
import { IUser, UserContext } from "../components/common/User";
import { ProfileModal } from "./ProfileModal";
import { Component, createContext, createMemo, createSignal } from "solid-js";


const NavbarPage: Component = () => {
  const [showModal, setShowLoginModal] = createSignal(false);
   // eslint-disable-next-line
   const toggleShowLoginModal = () => setShowLoginModal(!showModal);
   const [showProfileModal, setShowProfileModal] = createSignal(false);
   // eslint-disable-next-line
  const toggleShowProfileModal = () => setShowProfileModal(!showProfileModal);
  
  const toggleModal = createMemo(() => {
    if (UserContext.user){
      toggleShowProfileModal()
    } else {
      toggleShowLoginModal();
    }
  }, [UserContext.user, toggleShowProfileModal, toggleShowLoginModal]);
  
  return (
      <>
      {/* <MDBNavbar color="dark" dark expand="md">
        <MDBNavbarNav fullWidth={false} class='mr-auto mb-2 mb-lg-0'>
          <MDBNavbarBrand tag="span">
            <Link to="/">
              <strong class="logo brand" style={{marginLeft: '20px'}}>MeleeGuessr</strong>
            </Link>
          </MDBNavbarBrand>
        </MDBNavbarNav>
        <MDBNavbarNav right fullWidth={false} class='mb-2 mb-lg-0'>
          <MDBNavbarItem style={{marginRight: "20px", alignSelf: 'center'}} active aria-current='page' onClick={toggleModal}>
            <MDBBtn size="sm" color="light" floating tag={user ? "button" : "a"} >
              { user ? user.username[0] : <MDBIcon fas icon='user' size='1x'/> }
            </MDBBtn>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBNavbar>
      <Alert variant='danger'>
				Unfortunately the servers are too expensive for me to maintain by myself so the website will be shutting down on 5/15/22, only 7 days after launch. Thanks for playing! - Noah
			</Alert> */}
			
      {/* <ProfileModal showModal={showProfileModal()} setShowModal={setShowProfileModal} toggleShowModal={toggleShowProfileModal} updateUser={updateUser} />
      <LoginModal showModal={showModal()} setShowModal={setShowLoginModal} toggleShowModal={toggleShowLoginModal} updateUser={updateUser} /> */}
    </>
    );
  }

export default NavbarPage;