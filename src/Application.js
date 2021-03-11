import React, { useContext } from "react";
import { AuthContext } from "./UserContext";
import JoinMeeting from "./JoinMeeting";
import Login from "./Login";
function Application() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return <>{user !== null ? <JoinMeeting /> : <Login />}</>;
}

export default Application;
