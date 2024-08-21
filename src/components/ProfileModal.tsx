import { Box, Button, Modal, Typography } from "@suid/material";
import { createContext, createEffect, createSignal } from 'solid-js';
import { GetStat } from "../models/Stat";
// import { createToast } from "./common/toaster";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { Component } from 'solid-js';
import { ILoading, LoadingContext } from "./common/Loader";
import { IUser, UserContext } from "./common/User";
import useTheme from "@suid/material/styles/useTheme";

interface IProfileModal {
  showModal: boolean;
  setShowModal: any;
  toggleShowModal: () => void;
  updateUser: () => void;
}

export const ProfileModal: Component<IProfileModal> = ({showModal, setShowModal, toggleShowModal, updateUser }) => {  
  const [stat, setStat] = createSignal<GetStat>();
  const theme = useTheme();

  createEffect(() => {
    if (UserContext.user && showModal){
      LoadingContext.loading = true;
      UserService.getStats(UserContext.user.id)
      .then((response:any) => {
        LoadingContext.loading = false;
        setStat(response.data);
      })
      .catch((err:any) => {
        LoadingContext.loading = false;
        // createToast({
        //   title: "Failed to retrieve stats",
        //   duration: 2000,
        //   placement: "top-end"
        // })
        if (UserContext.user) {
          setStat({
            userId: UserContext.user.id,
            username: UserContext.user.username,
            correct: 0,
            incorrect: 0,
            highScore: 0,
            games: 0
          })
        }
      });
    }
  }, [UserContext.user, showModal, LoadingContext.loading])
  
  const logout = () => {
    AuthService.logout();
    updateUser();
    toggleShowModal();
    // createToast({
    //   title: "Logged out",
    //   duration: 2000,
    //   placement: "top-end"
    // })
  }
  
  return (
    <>
      {/* <MDBModal class="dark-modal" show={showModal} setShow={setShowModal} tabIndex={-1}>
      <MDBModalDialog size="fullscreen-lg-down">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Account</MDBModalTitle>
            <MDBBtn class='btn-close' color='none' onClick={toggleShowModal}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
              <div class="d-flex white-text justify-content-center align-items-center m-2" style={{"text-align": 'start'}}>
                <div class="col-6">
                    <h4>Username: {UserContext.user?.username}</h4>
                    <h4>Email: {UserContext.user?.email}</h4>
                </div>
                <div class="col-6">
                    <h4>Correct: {stat()?.correct}</h4>
                    <h4>Incorrect: {stat()?.incorrect}</h4>
                    <h4>High Score: {stat()?.highScore}%</h4>
                    <h4>Games: {stat()?.games}</h4>
                </div>
              </div>
              <div class="d-flex justify-content-between m-4">
              <a target="_blank" rel="noreferrer" href="https://www.paypal.com/donate/?business=TMLZ8JYEQBCY2&no_recurring=0&currency_code=USD">
                <MDBBtn size="lg" color="success" outline>Donate</MDBBtn>
              </a>
                <MDBBtn onClick={logout} size="lg" color="danger" type="submit">Logout</MDBBtn>
              </div>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal> */}
    <Modal
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: "24px",
            p: 4,
          }}
        >

          <Button variant="contained">Contained</Button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    
  </>
  )
}