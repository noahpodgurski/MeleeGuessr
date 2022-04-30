import React, { useContext } from "react";
import { IUser, UserContext } from "../hooks/UseUser";
const Profile: React.FC = () => {
  const { user } = useContext<IUser>(UserContext);
  console.log(user)
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
        <strong>Profile:</strong> {user?.email}
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {user?.id}
      </p>
    </div>
  );
};
export default Profile;