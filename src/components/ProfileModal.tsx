import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBBtn, MDBModalBody } from "mdb-react-ui-kit"
import { useEffect, useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { ILoading, LoadingContext } from "../hooks/UseLoader";
import { IUser, UserContext } from "../hooks/UseUser";
import { GetStat } from "../models/Stat";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

interface IProfileModal {
  showModal: boolean;
  setShowModal: any;
  toggleShowModal: () => void;
  updateUser: () => void;
}

export const ProfileModal: React.FC<IProfileModal> = ({showModal, setShowModal, toggleShowModal, updateUser }) => {  
  const { user } = useContext<IUser>(UserContext);
  const { setLoading } = useContext<ILoading>(LoadingContext);
  const [stat, setStat] = useState<GetStat>();

  useEffect(() => {
    if (user && showModal){
      setLoading(true);
      UserService.getStats(user.id)
      .then((response:any) => {
        setLoading(false);
        setStat(response.data);
      })
      .catch((err:any) => {
        setLoading(false);
        toast.error(err)
      });
    }
  }, [user, showModal, setLoading])
  
  const logout = () => {
    AuthService.logout();
    updateUser();
    toggleShowModal();
    toast.success("Logged out")
  }
  
  return (
    <>
      <MDBModal className="dark-modal" show={showModal} setShow={setShowModal} tabIndex={-1}>
      <MDBModalDialog size="fullscreen-lg-down">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Account</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={toggleShowModal}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
              <div className="d-flex white-text justify-content-center align-items-center m-2" style={{textAlign: 'start'}}>
                <div className="col-6">
                    <h4>Username: {user?.username}</h4>
                    <h4>Email: {user?.email}</h4>
                </div>
                <div className="col-6">
                    <h4>Correct: {stat?.correct}</h4>
                    <h4>Incorrect: {stat?.incorrect}</h4>
                    <h4>High Score: {stat?.highScore}%</h4>
                    <h4>Games: {stat?.games}</h4>
                </div>
              </div>
              <div className="d-flex justify-content-between m-4">
              <a target="_blank" rel="noreferrer" href="https://www.paypal.com/donate/?business=TMLZ8JYEQBCY2&no_recurring=0&currency_code=USD">
                <MDBBtn size="lg" color="success" outline>Donate</MDBBtn>
              </a>
                <MDBBtn onClick={logout} size="lg" color="danger" type="submit">Logout</MDBBtn>
              </div>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  </>
  )
}