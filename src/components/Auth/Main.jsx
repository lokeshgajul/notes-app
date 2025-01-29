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
import Notes from "../Notes";
import { ThemeContext } from "@/context/ThemeContext";

function Main() {
  const [loginStatus, setLoginStatus] = useState(false);
  const { isLoggedIn } = useContext(Authcontext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const getStatus = localStorage.getItem("status");
    setLoginStatus(JSON.parse(getStatus));
  }, [isLoggedIn]);
  console.log("Main", loginStatus);

  return (
    <Router>
      {loginStatus ? (
        <div
          className={`h-screen ${
            theme == "dark" ? "bg-[#1f2123]" : "bg-white"
          } `}
        >
          <Navbar />
          <div className="flex flow-row ">
            <div className="w-[220px]">
              <Sidebar />
            </div>
            <div className="flex flex-grow justify-start ml-20">
              <Routes>
                <Route path="/" Component={Notes} />
                <Route path="/notifications" Component={Notifications} />
                <Route path="/noteDetails/:noteId" Component={NoteDetails} />
              </Routes>
            </div>
          </div>
        </div>
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
