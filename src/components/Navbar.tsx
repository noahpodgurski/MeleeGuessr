import { LoginModal } from "./LoginModal";
import { ProfileModal } from "./ProfileModal";
import { Component, createSignal } from "solid-js";
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Link } from "@suid/material";
import { AiOutlineUser } from "solid-icons/ai";
import { createStore } from "solid-js/store";
import AuthService from "~/services/auth.service";

export interface LoginModal {
  showLogin?: boolean;
}
const [state, setState] = createStore<LoginModal>({ showLogin: false});
export const loginStore = state;
export const setLoginModal = (show: boolean) => {
  setState("showLogin", show);
}

const NavbarPage: Component<any> = ({ updateUser }) => {
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
            
			      { AuthService.getCurrentUser() ?
              <Button  onClick={() => setShowProfileModal(!showProfileModal())} >
                <AiOutlineUser size={24} />
              </Button> :
              <Button onClick={() => setState("showLogin", !state.showLogin)} color="inherit">Login</Button>
            }
            </Toolbar>
          </AppBar>
        </Box>
        <ProfileModal showModal={showProfileModal} setShowModal={setShowProfileModal} toggleShowModal={toggleShowProfileModal} updateUser={updateUser} />
        <LoginModal updateUser={updateUser} />
    </>
    );
  }

export default NavbarPage;