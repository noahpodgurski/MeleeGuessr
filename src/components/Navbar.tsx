import { LoginModal } from "./LoginModal";
import { ProfileModal } from "./ProfileModal";
import { Component, createSignal } from "solid-js";
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Link } from "@suid/material";
import { userStore } from "~/state/userStore";
import { AiOutlineUser } from "solid-icons/ai";


const NavbarPage: Component<any> = ({ updateUser }) => {
  const [showModal, setShowLoginModal] = createSignal(false);
   const toggleShowLoginModal = () => setShowLoginModal(!showModal());
   const [showProfileModal, setShowProfileModal] = createSignal(false);
  const toggleShowProfileModal = () => setShowProfileModal(!showProfileModal());
  
  
  return (
      <>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
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
            
			      { userStore.data !== null ?
              <Button  onClick={() => setShowProfileModal(!showProfileModal())} >
                <AiOutlineUser size={24} />
              </Button> :
              <Button onClick={() => setShowLoginModal(!showModal())} color="inherit">Login</Button>
            }
            </Toolbar>
          </AppBar>
        </Box>
        <ProfileModal showModal={showProfileModal} setShowModal={setShowProfileModal} toggleShowModal={toggleShowProfileModal} updateUser={updateUser} />
        <LoginModal showModal={showModal} setShowModal={setShowLoginModal} toggleShowModal={toggleShowLoginModal} updateUser={updateUser} />
    </>
    );
  }

export default NavbarPage;