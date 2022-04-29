import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBBtn, MDBModalBody, MDBInput } from "mdb-react-ui-kit"
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { choiceTime } from "../consts/Time";

interface ILoginModal {
  showModal: boolean;
  setShowModal: any;
  toggleShowModal: () => void;
}

export const LoginModal: React.FC<ILoginModal> = ({showModal, setShowModal, toggleShowModal}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e:any, endpoint:string) => {
    e.preventDefault();
    console.log(email)
    console.log(password)
    fetch(endpoint, {
      headers: {"Content-Type": "application/json"},
      method: "POST",
      mode: "cors",
      body: JSON.stringify({email, password})
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === "error"){
          alert(data.message)
        } else {
          toast.success(data.message)
        }
      })
    .catch((err) => {
      if (endpoint === "/login")
        alert("Error logging in")
      else
        alert("Error registering");
    })
  }
  
  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: choiceTime,
          style: {}
        }}
      />
      <MDBModal className="dark-modal" show={showModal} setShow={setShowModal} tabIndex={-1}>
      <MDBModalDialog size="fullscreen-lg-down">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Login</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={toggleShowModal}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <form>
              <div className="d-flex justify-content-center align-items-center m-2">
                  <div className="row justify-content-center">
                    <div className="m-1">
                      <MDBInput required value={email} onChange={(v) => setEmail(v.target.value)} size="lg" className="login-form" autoComplete="email" contrast style={{background: "#2d313a", color: 'white'}} label='Email' id='email' type='email' name="email" />
                    </div>
                    <div className="m-1">
                      <MDBInput required value={password} onChange={(v) => setPassword(v.target.value)} size="lg" className="login-form" autoComplete="current-password" contrast style={{background: "#2d313a", color: 'white'}} label='Password'  id='password' type='password' name="password" minLength={8} />
                    </div>
                  {/* <MDBBtn color="link">Forgot password?</MDBBtn> */}
                    <div>
                      <MDBBtn color="link" className="forgot-pass" onClick={toggleShowModal}>Forgot password?</MDBBtn>
                    </div>
                  </div>
              </div>
              <div className="d-flex justify-content-between m-4">
                <MDBBtn size="lg" outline color='light' onClick={(e) => handleSubmit(e, "/register")}>Create Account</MDBBtn>
                <MDBBtn size="lg" color="success" onClick={(e) => handleSubmit(e, "/login")}>Login</MDBBtn>
              </div>
            </form>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  </>
  )
}