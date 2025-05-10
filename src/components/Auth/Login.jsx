import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import signup from "../../assets/singup.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "@/context/AuthContext";

const Login = () => {
  const { user, handleLogin, setUser, isLoggedIn, setIsLoggedIn } =
    useContext(Authcontext);
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    await handleLogin();
    // await setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <main className="bg-indigo-200 h-screen p-8">
      <section className="flex flow-row justify-end items-center">
        <p className="text-sm text-zinc-600 mr-2">Create account</p>
        <button className="text-[13px]  px-4 py-1.5 border-[1px] hover:bg-indigo-5l00 hover:text-white border-black rounded-3xl">
          <Link to="/signup">Sign Up</Link>
        </button>
      </section>
      <div className="grid grid-cols-2 gap-4 p-3 ">
        <div className="w-[85%] col-span-1">
          <img
            className="w-full rounded-xl shadow-xl shadow-indigo-200"
            src={signup}
            alt="notes image"
          />
        </div>
        <div>
          <section className="col-span-1">
            <h1 className="text-2xl font-medium">Welcome to Notes App</h1>
            <p className="text-sm mt-2 text-zinc-600">Register your account</p>
          </section>
          <section className="w-2/3">
            <div className="flex flex-col mt-2 leading-9">
              <label
                htmlFor="email"
                className="font-medium tracking-wide text-[15px]"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={user.email}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    email: e.target.value,
                  }))
                }
                className="border border-gray-500 hover:border-indigo-600 hover:border-1 bg-indigo-200 rounded-md px-3  focus:outline-none"
              />
            </div>
            <div className="flex flex-col mt-2 leading-9">
              <label
                htmlFor="password"
                className="font-medium tracking-wide text-[15px]"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    password: e.target.value,
                  }))
                }
                className="border border-gray-500 hover:border-indigo-600 hover:border-1 bg-indigo-200 rounded-md px-3  focus:outline-none"
              />
            </div>
            <div>
              <p className="cursor-pointer my-2 text-sm">Forgot Password</p>
            </div>
            <div>
              <button
                onClick={() => handleLoginClick()}
                className="p-2 bg-indigo-700 text-white rounded-full px-11 hover:bg-indigo-600 hover:font-semibold"
              >
                Login
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Login;
