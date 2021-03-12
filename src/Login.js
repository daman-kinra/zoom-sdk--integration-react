import React, { useState, useContext } from "react";
import app from "./firbase";
import zoom from "./zoom.png";
import { AuthContext } from "./UserContext";
function Login() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const { setShowMeeting } = useContext(AuthContext);
  const login = async (e) => {
    e.preventDefault();
    try {
      await app
        .auth()
        .signInWithEmailAndPassword(
          (name + "@gmail.com").trim().toLocaleLowerCase(),
          name + "@gmail.com" + "123456"
        );
      setShowMeeting(true);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        try {
          console.log("in");
          await app
            .auth()
            .createUserWithEmailAndPassword(
              (name + "@gmail.com").trim().toLocaleLowerCase(),
              name + "@gmail.com" + "123456"
            );
          setShowMeeting(true);
          return;
        } catch (error) {
          if (error.code === "NoUserFound") {
          }
        }
      }
    }
  };
  return (
    <div className="mian_login_cont">
      <div className="center_login_cont">
        <img src={zoom} alt="" className="img" />
        <form action="" className="form">
          <input
            value={name}
            className="input"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="ENTER YOUR NAME"
          />
          <input
            value={mobile}
            className="input"
            type="number"
            onChange={(e) => setMobile(e.target.value.substring(0, 10))}
            placeholder="ENTER YOUR MOBILE"
          />
          <button className="myBtn" onClick={login}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
