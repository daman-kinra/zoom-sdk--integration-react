import React, { useState, useEffect, useContext } from "react";
import app from "./firbase";
import Zoom from "./Zoom";
import { AuthContext } from "./UserContext";
function JoinMeeting() {
  const [meeting, setMeeting] = useState([]);
  const { user, showMeeting } = useContext(AuthContext);
  const ref = app.firestore().collection("Meetings");
  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setMeeting(items);
    });
  }, []);
  return (
    <div>
      {meeting.length !== 0 && showMeeting === true ? (
        <Zoom
          email={user.email}
          meetingID={meeting[0].MeetingID}
          password={meeting[0].password}
        />
      ) : (
        ""
      )}
      <div>
        <div>
          <h1 style={{ textAlign: "center" }}>
            Logout and Login again to join the meeting
          </h1>
          <button
            onClick={() => {
              app.auth().signOut();
              document.getElementById("zmmtg-root").style.display = "none";
            }}
            className="logout-btn myBtn"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinMeeting;
