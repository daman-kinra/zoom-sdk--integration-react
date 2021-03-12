import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./UserContext";
import JoinMeeting from "./JoinMeeting";
import app from "./firbase";
import Login from "./Login";
function Application() {
  const [signature, setSignature] = useState("");
  const [apiKey, setApikey] = useState("Tp3phWY0QFiQdAW66pMGfg");
  const [apiSecret, setApisecret] = useState(
    "vUvAeJiTw8UgyEGAXq30Gcd39JAKnmtw5MWz"
  );
  const [meeting, setMeeting] = useState([]);
  const { user } = useContext(AuthContext);
  const ref = app.firestore().collection("Meetings");
  useEffect(() => {
    console.log("in effect");
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setMeeting(items);
    });
  }, []);
  useEffect(() => {
    if (meeting.length !== 0) {
      generateSignature(apiKey, apiSecret, meeting[0].MeetingID, 0).then(
        (res) => {
          setSignature(res);
          console.log(signature);
        }
      );
    }
  }, [meeting]);
  const crypto = require("crypto");
  function generateSignature(apiKey, apiSecret, meetingNumber, role) {
    return new Promise((res, rej) => {
      try {
        const timestamp = new Date().getTime() - 30000;

        const msg = Buffer.from(
          apiKey + `${meetingNumber}` + `${timestamp}` + role
        ).toString("base64");
        const hash = crypto
          .createHmac("sha256", apiSecret.toString())
          .update(msg)
          .digest("base64");
        const sign = Buffer.from(
          `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
        ).toString("base64");

        res(sign);
      } catch (error) {
        console.log(error);
      }
    });
  }
  useEffect(() => {
    console.log(user);
    if (user) {
      console.log(user.email);
    }
  }, [user]);
  return (
    <>
      {user !== null && signature.length !== 0 ? (
        <JoinMeeting
          signature={signature}
          meetingNumber={meeting[0].MeetingID}
          password={meeting[0].password}
          apiKey={apiKey}
          user={user.email}
        />
      ) : (
        <Login />
      )}
    </>
  );
}

export default Application;
