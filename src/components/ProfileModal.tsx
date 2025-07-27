import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, TextField, Typography, useMediaQuery } from "@suid/material";
import { Accessor, createEffect, createSignal } from 'solid-js';
import AuthService from "../services/auth.service";
import { Component } from 'solid-js';
import { useLoader } from "./common/Loader";
import useTheme from "@suid/material/styles/useTheme";
import { AiFillCloseCircle, AiFillEye, AiFillEyeInvisible } from "solid-icons/ai";
import UserService from "~/services/user.service";
import { setLoaderIsHexType } from "./Loader";
import toast from "solid-toast";

interface IProfileModal {
  showModal: Accessor<boolean>;
  setShowModal: any;
  toggleShowModal: () => void;
  updateUser: () => void;
}

export const ProfileModal: Component<IProfileModal> = ({showModal, setShowModal, toggleShowModal, updateUser }) => {  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, {setLoading}] = useLoader() as any;
  const [showPassword, setShowPassword] = createSignal(false);
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent) => {
    event.preventDefault();
  };

  createEffect(() => {
    if (showModal()){
      setLoaderIsHexType(true);
      setLoading(true);
      UserService.getStats()
      .then((response:any) => {
        setLoading(false);
        setUsername(response.data.data.username);
        setEmail(response.data.data.email);
      })
      .catch((err:any) => {
        setLoading(false);
        toast("Failed to retrieve info");
        // createToast({
        //   title: "Failed to retrieve stats",
        //   duration: 2000,
        //   placement: "top-end"
        // })
      });
    }
  })
  
  const logout = async () => {
    if (loading()) return;
    setLoaderIsHexType(true);
    setLoading(true);
    await AuthService.logout()
    updateUser();
    toggleShowModal();
    setLoading(false);
    toast('Logged out')
    // navigate('/');
    window.location.pathname = '/'
    // window.location.reload();
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
                        disabled
                        label="Username"
                        id="outlined-start-adornment"
                        value={username()}
                        sx={{ m: 1, width: '25ch' }}
                      />
                      {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
                      <TextField
                        disabled
                        label="Email"
                        type={showPassword() ? 'text' : 'password'}
                        id="outlined-adornment-email"
                        value={email()}
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