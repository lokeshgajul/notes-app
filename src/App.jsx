import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import CreateNote from "./components/CreateNote";
import NoteDetails from "./components/NoteDetails";
import { ThemeProvider } from "./context/ThemeContext";
import Notifications from "./components/Notifications";

function App() {
  const isloggedIn = false;
  return (
    <Router>
      <ThemeProvider>
        {isloggedIn ? (
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
      </ThemeProvider>
    </Router>
  );
}

export default App;
