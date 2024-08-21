// import { createToast } from "./common/toaster";
import { LoadingContext } from "../components/common/Loader";
import AuthService from "../services/auth.service";
import { Component, createContext, createSignal } from 'solid-js';

interface ILoginModal {
  showModal: boolean;
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
    LoadingContext.loading = true;

    if (endpoint() === "/login"){
      AuthService.login(email(), password())
      .then((data:any) => {
        if (data.status === "ok"){
          LoadingContext.loading = false;
          // navigate("/play"); //navigate somewhere after login?
          toggleShowModal();
          // createToast({
          //   title: data.message,
          //   duration: 2000,
          //   placement: "top-end"
          // })
          updateUser();
        } else {
          LoadingContext.loading = false;
          // createToast({
          //   title: data.message,
          //   duration: 2000,
          //   placement: "top-end"
          // })
        }
      })
      .catch((err:any) => {
        LoadingContext.loading = false;
        // createToast({
        //   title: err.response.data.message,
        //   duration: 2000,
        //   placement: "top-end"
        // })
      });
    }

    else if (endpoint() === "/register"){
      if (username() === ""){
        // createToast({
        //   title: "Unknown error",
        //     duration: 2000,
        //     placement: "top-end"
        // })
        return;
      }
      LoadingContext.loading = true;
      AuthService.register(email(), username(), password())
      .then((data:any) => {
        LoadingContext.loading = false;
        if (data.status === "ok"){
          // navigate("/play");
          setEmail("");
          setUsername("");
          setPassword("");
          setRegister(false);
          toggleShowModal();
          // createToast({
          //   title: data.message,
          //   duration: 2000,
          //   placement: "top-end"
          // })
        } else {
          // createToast({
          //   title: data.message,
          //   duration: 2000,
          //   placement: "top-end"
          // })
        }
      })
      .catch((err:any) => {
        LoadingContext.loading = false;
        // createToast({
        //   title: err.response.data.message,
        //   duration: 2000,
        //   placement: "top-end"
        // })
      });
    } else if (endpoint() === "/forgot"){
      LoadingContext.loading = false;
      // do forgot stuff here todo
    }
  }
  
  return (
    <>
      {/* <MDBModal class="dark-modal" show={showModal} setShow={setShowModal} tabIndex={9}>
      <MDBModalDialog size="fullscreen-lg-down">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Login</MDBModalTitle>
            <MDBBtn class='btn-close' color='none' onClick={toggleShowModal} tabIndex={10}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <form onSubmit={handleSubmit}>
              <div class="d-flex justify-content-center align-items-center m-2">
                  <div class="row justify-content-center">
                    <div class="m-1">
                      <MDBInput required tabIndex={0} value={email} onChange={(v) => setEmail(v.target.value)} size="lg" class="login-form" autoComplete="email" contrast style={{background: "#2d313a", color: 'white'}} label='Email' id='email' type='email' name="email" />
                    </div>
                    <div class="m-1">
                      <MDBInput required tabIndex={1} value={password} onChange={(v) => setPassword(v.target.value)} size="lg" class="login-form" autoComplete="current-password" contrast style={{background: "#2d313a", color: 'white'}} label='Password'  id='password' type='password' name="password" minLength={8} />
                    </div>
                    { register && <div class="m-1">
                      <MDBInput required tabIndex={2} value={username} onChange={(v) => setUsername(v.target.value)} size="lg" class="login-form" autoComplete="current-username" contrast style={{background: "#2d313a", color: 'white'}} label='Username'  id='username' type='username' name="username" />
                    </div>}
                  </div>
              </div>
              <div class="d-flex justify-content-between m-4">
                { register ? <MDBBtn tabIndex={3} onClick={() => setEndpoint('/register')} size="lg" outline color='light' type="submit">Create Account</MDBBtn> : 
                  <MDBBtn tabIndex={3} onClick={() => setRegister(true)} size="lg" outline color='light'>Create Account</MDBBtn>
                }
                <MDBBtn tabIndex={4} onClick={() => setEndpoint('/login')} size="lg" color="success" type="submit">Login</MDBBtn>
              </div>
            </form>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal> */}
  </>
  )
}