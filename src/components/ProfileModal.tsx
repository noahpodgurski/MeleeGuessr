import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, TextField, Typography, useMediaQuery } from "@suid/material";
import { Accessor, createContext, createEffect, createSignal } from 'solid-js';
import { GetStat } from "../models/Stat";
// import { createToast } from "./common/toaster";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { Component } from 'solid-js';
import { useLoader } from "./common/Loader";
import { IUser, UserContext } from "./common/User";
import useTheme from "@suid/material/styles/useTheme";
import { register } from "module";
import { AiFillCloseCircle, AiFillEye, AiFillEyeInvisible } from "solid-icons/ai";

interface IProfileModal {
  showModal: Accessor<boolean>;
  setShowModal: any;
  toggleShowModal: () => void;
  updateUser: () => void;
}

export const ProfileModal: Component<IProfileModal> = ({showModal, setShowModal, toggleShowModal, updateUser }) => {  
  const [stat, setStat] = createSignal<GetStat>();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, {setLoading}] = useLoader() as any;
  const [showPassword, setShowPassword] = createSignal(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent) => {
    event.preventDefault();
  };

  createEffect(() => {
    if (UserContext.user && showModal()){
      setLoading(true);
      UserService.getStats(UserContext.user.id)
      .then((response:any) => {
        setLoading(false);
        setStat(response.data);
      })
      .catch((err:any) => {
        setLoading(false);
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
  }, [UserContext.user, showModal, loading])
  
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
      <Dialog
          onClose={toggleShowModal}
          aria-labelledby="customized-dialog-title"
          open={showModal()}
          fullWidth={true}
          maxWidth="sm"
          fullScreen={fullScreen()}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <Grid container direction="row" alignContent="space-between" justifyContent="space-between">
                Profile
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={toggleShowModal}
                  aria-label="close"
                  >
                  <AiFillCloseCircle />
                </IconButton>
            </Grid>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => {}}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            {/* <CloseIcon /> */}
          </IconButton>
            <form onSubmit={() => {}}>
          <DialogContent dividers>
              <div class="d-flex justify-content-center align-items-center m-2">
                  <div class="row justify-content-center">
                  <div class="d-flex white-text justify-content-center align-items-center m-2" style={{"text-align": 'start'}}>
                  <div class="col-6">
                      <TextField
                        label="Username"
                        id="outlined-start-adornment"
                        value={UserContext.user?.username}
                        sx={{ m: 1, width: '25ch' }}
                      />
                      {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
                      <TextField
                        label="Email"
                        type={showPassword() ? 'text' : 'password'}
                        id="outlined-adornment-email"
                        value={UserContext.user?.email}
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                          endAdornment:
                            <InputAdornment position="end">
                              <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              >
                                {showPassword() ? <AiFillEye /> : <AiFillEyeInvisible />}
                              </IconButton>
                            </InputAdornment>
                        }}
                      />
                  </div>
                  <div class="col-6">
                      {/* <h4>Correct: {stat()?.correct}</h4>
                      <h4>Incorrect: {stat()?.incorrect}</h4>
                      <h4>High Score: {stat()?.highScore}%</h4>
                      <h4>Games: {stat()?.games}</h4> */}
                  </div>
                </div>
                <div class="d-flex justify-content-between m-4">
                  <Button sx={{m: 1}} onClick={logout} color="error" variant="contained" type="submit">Logout</Button>
                <a target="_blank" rel="noreferrer" href="https://www.paypal.com/donate/?business=TMLZ8JYEQBCY2&no_recurring=0&currency_code=USD">
                  <Button sx={{m: 1}} color="success" variant="outlined">Donate</Button>
                </a>
                </div>
                  </div>
              </div>
          </DialogContent>
          <DialogActions>
            <div class="d-flex justify-content-between m-4">
              
            </div>
          </DialogActions>
            </form>
      </Dialog>
  </>
  )
}