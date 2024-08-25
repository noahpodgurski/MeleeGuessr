import { LoginModal } from "./LoginModal";
import { IUser, UserContext } from "../components/common/User";
import { ProfileModal } from "./ProfileModal";
import { Component, createContext, createEffect, createMemo, createSignal } from "solid-js";
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Link } from "@suid/material";


const NavbarPage: Component<any> = ({ updateUser }) => {
  const [showModal, setShowLoginModal] = createSignal(false);
   const toggleShowLoginModal = () => setShowLoginModal(!showModal());
   const [showProfileModal, setShowProfileModal] = createSignal(false);
  const toggleShowProfileModal = () => setShowProfileModal(!showProfileModal());
  
  // createEffect(() => {
  //   if (UserContext.user){
  //     setShowProfileModal(showProfileModal() === false);
  //   } else {
  //     setShowLoginModal(showModal() === false);
  //   }
  // });
  
  return (
      <>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="absolute">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/" sx={{display: 'flex', 'alignItems': 'center'}}><h1 class="navbar-brand logo">MeleeGuessr</h1></Link>
            </Typography>
            <Button onClick={() => setShowLoginModal(!showModal())} color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
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
			
      {/* <ProfileModal showModal={showProfileModal()} setShowModal={setShowProfileModal} toggleShowModal={toggleShowProfileModal} updateUser={updateUser} /> */}
      <LoginModal showModal={showModal} setShowModal={setShowLoginModal} toggleShowModal={toggleShowLoginModal} updateUser={updateUser} />
    </>
    );
  }

export default NavbarPage;