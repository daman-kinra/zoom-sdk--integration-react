import React, { useEffect, useContext } from "react";
import { ZoomMtg } from "@zoomus/websdk";

function Zoom(props) {
  const crypto = require("crypto"); // crypto comes with Node.js
  var apiKey = "Tp3phWY0QFiQdAW66pMGfg";
  var apiSecret = "vUvAeJiTw8UgyEGAXq30Gcd39JAKnmtw5MWz";
  var meetingNumber = props.meetingID;
  var leaveUrl = "https://localhost:3000";
  var userName = props.email;
  var userEmail = props.email;
  var passWord = props.password;
  var signature = "";
  function generateSignature(apiKey, apiSecret, meetingNumber, role) {
    return new Promise((res, rej) => {
      try {
        const timestamp = new Date().getTime() - 30000;
        console.log(timestamp);
        const msg = Buffer.from(
          apiKey + `${meetingNumber}` + `${timestamp}` + role
        ).toString("base64");
        const hash = crypto
          .createHmac("sha256", apiSecret.toString())
          .update(msg)
          .digest("base64");
        const signature = Buffer.from(
          `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
        ).toString("base64");

        res(signature);
      } catch (error) {
        console.log(error);
      }
    });
  }

  generateSignature(apiKey, apiSecret, meetingNumber, 1).then((res) => {
    signature = res;
  });

  const showZoomDiv = () => {
    const zoom = document.getElementById("zmmtg-root");
    zoom.style.display = "block";
  };
  const initializeMeeting = () => {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
  useEffect(() => {
    showZoomDiv();
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.0/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    initializeMeeting();
  }, []);
  return <></>;
}

export default Zoom;
