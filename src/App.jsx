import "./App.css";
import Navbar from "./components/Navbar";
import CreateNote from "./components/CreateNote";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Notes from "./components/Notes";

function App() {
  return (
    <Router>
      <ThemeProvider>
        {/* <SidebarProvider> */}
        <Navbar />
        {/*  Navbar moved outside of <Routes> */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route path="/signup" Component={Signup} />
          <Route path="/signin" Component={Login} />
          <Route path="/notes" Component={Notes} />
        </Routes>
        {/* </SidebarProvider> */}
      </ThemeProvider>
    </Router>
  );
}

export default App;
