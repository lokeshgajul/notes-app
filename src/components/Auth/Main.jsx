import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ThemeProvider } from "../../context/ThemeContext";
import Notifications from "../Notifications";
import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../context/AuthContext";
import CreateNote from "../CreateNote";
import NoteDetails from "../NoteDetails";
import Home from "../Home";
import Signup from "./Signup";
import Login from "./Login";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function Main() {
  const [loginStatus, setLoginStatus] = useState(false);
  const { isLoggedIn } = useContext(Authcontext);

  useEffect(() => {
    const getStatus = localStorage.getItem("status");
    setLoginStatus(JSON.parse(getStatus));
  }, [isLoggedIn]);
  console.log("Main", loginStatus);

  return (
    <Router>
      {loginStatus ? (
        <>
          <Navbar />
          <div className="flex flex-row">
            <Sidebar />
            <Routes>
              <Route path="/" Component={CreateNote} />
              <Route path="/notifications" Component={Notifications} />
              <Route path="/noteDetails/:noteId" Component={NoteDetails} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/signup" Component={Signup} />
          <Route path="/signin" Component={Login} />
        </Routes>
      )}
    </Router>
  );
}

export default Main;
