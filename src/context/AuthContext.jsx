import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:3000/signup", {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      const data = res.data;
      setUser(data);
      setUser({ email: "", password: "" });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email: user.email,
        password: user.password,
      });
      const data = await res.data;
      setIsLoggedIn(true);
      setUser(data);

      const loginStatus = localStorage.setItem("status", JSON.stringify(true));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getStatus = localStorage.getItem("status");
    console.log("status ", getStatus);
  }, [isLoggedIn]);
  const value = {
    user,
    setUser,
    handleSignup,
    handleLogin,
    isLoggedIn,
    setIsLoggedIn,
  };
  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
};
