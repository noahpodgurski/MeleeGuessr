// import { createToast } from "./common/toaster";
import { Button, Modal, Box, Typography, Input, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useMediaQuery, useTheme, Grid } from "@suid/material";
import { useLoader } from "../components/common/Loader";
import AuthService from "../services/auth.service";
import { Accessor, Component, createContext, createSignal } from 'solid-js';
import { AiFillCloseCircle } from 'solid-icons/ai'
import toast from "solid-toast";

interface ILoginModal {
  showModal: Accessor<boolean>;
  setShowModal: any;
  toggleShowModal: () => void;
  updateUser: () => void;
}

export const LoginModal: Component<ILoginModal> = ({showModal, setShowModal, toggleShowModal, updateUser}) => {
  const [email, setEmail] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [endpoint, setEndpoint] = createSignal("/login");
  const [register, setRegister] = createSignal(false);
  const theme = useTheme();
  const [, {setLoading}] = useLoader() as any
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  // const navigate = useNavigate();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (email() === "" || password() === ""){
      // createToast({
      //   title: "Unknown error",
      //     duration: 2000,
      //     placement: "top-end"
      // })
      return;
    }
    setLoading(true)

    if (endpoint() === "/login"){
      AuthService.login(email(), password())
      .then((response) => {
        const data = response.data;
        setLoading(false)
        toast(data.message);
        if (response.status === 200){
          // navigate("/play"); //navigate somewhere after login?
          toggleShowModal();
          updateUser();
        } else {
        }
      })
      .catch((err:any) => {
        console.log(err);
        console.log('err from login cb')
        setLoading(false)
      });
    }

    else if (endpoint() === "/register"){
      if (username() === ""){
        toast("Please fill out all required fields");
        return;
      }
      setLoading(true)
      AuthService.register(email(), username(), password())
      .then((response) => {
        toast(response.data.message)
        setLoading(false)
        if (response.status === 200){
          // navigate("/play");
          setEmail("");
          setUsername("");
          setPassword("");
          setRegister(false);
          toggleShowModal();
        } else {
        }
      })
      .catch((err:any) => {
        console.log(err)
        console.log('err from register cb')
        setLoading(false)
      });
    } else if (endpoint() === "/forgot"){
      setLoading(false)
      // do forgot stuff here todo
    }
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
              Login
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
          <form onSubmit={handleSubmit}>
        <DialogContent dividers>
            <div class="d-flex justify-content-center align-items-center m-2">
                <div class="row justify-content-center">
                  <div class="m-1">
                    {/* <Input required value={email} onChange={(v) => setEmail(v.target.value)} class="login-form" autoComplete="email" sx={{background: "#2d313a", color: 'white'}} id='email' type='email' name="email">test</Input> */}
                    <TextField sx={{width: '100%'}} required value={email()} onChange={(v) => setEmail(v.target.value)} autoComplete="email" id="email" label="Email" variant="standard" type='email' name="email"/>
                    
                  </div>
                  { register() && <div class="m-1">
                    <TextField sx={{width: '100%'}} required value={username()} onChange={(v) => setUsername(v.target.value)} autoComplete="current-username" id="username" label="Username" variant="standard" type='username' name="username"/>
                  </div> }
                  <div class="m-1">
                    <TextField sx={{width: '100%'}} required value={password()} onChange={(v) => setPassword(v.target.value)} autoComplete="current-password" id="password" label="Password" variant="standard" type='password' name="password"/>
                    {/* <Input required tabIndex={1} value={password} onChange={(v) => setPassword(v.target.value)} class="login-form" autoComplete="current-password" contrast style={{background: "#2d313a", color: 'white'}}  id='password' type='password' name="password" minLength={8} /> */}
                  </div>
                </div>
            </div>
        </DialogContent>
        <DialogActions>
          <div class="d-flex justify-content-between m-4">
            { register() ? <Button onClick={() => setEndpoint('/register')} type="submit">Create Account</Button> : 
              <Button onClick={() => setRegister(true)}>Create Account</Button>
            }
            <Button onClick={() => {setRegister(false); setEndpoint('/login')}} color="success" type="submit">Login</Button>
          </div>
        </DialogActions>
          </form>
    </Dialog>
  </>
  )
}