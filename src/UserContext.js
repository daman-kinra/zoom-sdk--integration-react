import React, { useEffect, useState, createContext } from "react";
import app from "./firbase";

export const AuthContext = createContext();

export const UserContext = (props) => {
  const [user, setUser] = useState(null);
  const [showMeeting, setShowMeeting] = useState(false);
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, showMeeting, setShowMeeting }}>
      {props.children}
    </AuthContext.Provider>
  );
};
