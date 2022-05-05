import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBBtn, MDBModalBody, MDBInput } from "mdb-react-ui-kit"
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { ILoading, LoadingContext } from "../hooks/UseLoader";
import AuthService from "../services/auth.service";

interface ILoginModal {
  showModal: boolean;
  setShowModal: any;
  toggleShowModal: () => void;
  updateUser: () => void;
}

export const LoginModal: React.FC<ILoginModal> = ({showModal, setShowModal, toggleShowModal, updateUser}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [endpoint, setEndpoint] = useState("/login");
  const [register, setRegister] = useState(false);
  const { setLoading } = useContext<ILoading>(LoadingContext)
  // const navigate = useNavigate();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (email === "" || password === ""){
      toast.error("Unknown error")
      return;
    }
    setLoading(true);

    if (endpoint === "/login"){
      AuthService.login(email, password)
      .then((data:any) => {
        if (data.status === "ok"){
          setLoading(false);
          // navigate("/play"); //navigate somewhere after login?
          toggleShowModal();
          toast.success(data.message)
          updateUser();
        } else {
          setLoading(false);
          toast.error(data.message)
        }
      })
      .catch((err:any) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
    }

    else if (endpoint === "/register"){
      if (username === ""){
        toast.error("Unknown error");
        return;
      }
      setLoading(true);
      AuthService.register(email, username, password)
      .then((data:any) => {
        setLoading(false);
        if (data.status === "ok"){
          // navigate("/play");
          setEmail("");
          setUsername("");
          setPassword("");
          setRegister(false);
          toggleShowModal();
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      })
      .catch((err:any) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
    } else if (endpoint === "/forgot"){
      setLoading(false);
      // do forgot stuff here todo
    }
  }
  
  return (
    <>
      <MDBModal className="dark-modal" show={showModal} setShow={setShowModal} tabIndex={9}>
      <MDBModalDialog size="fullscreen-lg-down">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Login</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={toggleShowModal} tabIndex={10}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <form onSubmit={handleSubmit}>
              <div className="d-flex justify-content-center align-items-center m-2">
                  <div className="row justify-content-center">
                    <div className="m-1">
                      <MDBInput required tabIndex={0} value={email} onChange={(v) => setEmail(v.target.value)} size="lg" className="login-form" autoComplete="email" contrast style={{background: "#2d313a", color: 'white'}} label='Email' id='email' type='email' name="email" />
                    </div>
                    <div className="m-1">
                      <MDBInput required tabIndex={1} value={password} onChange={(v) => setPassword(v.target.value)} size="lg" className="login-form" autoComplete="current-password" contrast style={{background: "#2d313a", color: 'white'}} label='Password'  id='password' type='password' name="password" minLength={8} />
                    </div>
                    { register && <div className="m-1">
                      <MDBInput required tabIndex={2} value={username} onChange={(v) => setUsername(v.target.value)} size="lg" className="login-form" autoComplete="current-username" contrast style={{background: "#2d313a", color: 'white'}} label='Username'  id='username' type='username' name="username" />
                    </div>}
                  {/* <MDBBtn color="link">Forgot password?</MDBBtn> */}
                    {/* <div>
                      <MDBBtn tabIndex={5} onClick={() => setEndpoint('/forgot')} color="link" className="forgot-pass">Forgot password?</MDBBtn>
                    </div> */}
                  </div>
              </div>
              <div className="d-flex justify-content-between m-4">
                { register ? <MDBBtn tabIndex={3} onClick={() => setEndpoint('/register')} size="lg" outline color='light' type="submit">Create Account</MDBBtn> : 
                  <MDBBtn tabIndex={3} onClick={() => setRegister(true)} size="lg" outline color='light'>Create Account</MDBBtn>
                }
                <MDBBtn tabIndex={4} onClick={() => setEndpoint('/login')} size="lg" color="success" type="submit">Login</MDBBtn>
              </div>
            </form>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  </>
  )
}