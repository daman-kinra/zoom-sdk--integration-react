import React, { useContext, useLayoutEffect } from "react";
import app from "./firbase";
import { AuthContext } from "./UserContext";

function JoinMeeting(props) {
  const { showMeeting } = useContext(AuthContext);
  useLayoutEffect(() => {
    // document.getElementById("iframe").style.display = "none";
  });
  return (
    <div className="zoom-div">
      {showMeeting ? (
        <iframe
          src={`/CDN/meeting.html?name=${props.user}&mn=${props.meetingNumber}&email=${props.user}&pwd=${props.password}&role=0&lang=en-US&signature=${props.signature}&china=0&apiKey=${props.apiKey}`}
          className="iframe"
          id="iframe"
        ></iframe>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>
            Logout and Login agin to Join Meeting
          </h1>
          <button
            onClick={() => {
              const iframe = document.getElementById("iframe");
              {
                if (iframe) {
                  iframe.style.display = "none";
                }
              }
              app.auth().signOut();
            }}
            className="logout-btn myBtn"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default JoinMeeting;
