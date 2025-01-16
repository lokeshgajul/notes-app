import React, { useState } from "react";
import signup from "../../assets/singup.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [user, SetUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:3000/signup", {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      const data = res.data;
      SetUser(data);
      navigate("/signin");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="bg-indigo-200 h-screen p-8">
      <section className="flex flow-row justify-end items-center">
        <p className="text-sm text-zinc-600 mr-2">Already have an account</p>
        <button className="text-[13px]  px-4 py-1.5 border-[1px] hover:bg-indigo-5l00 hover:text-white border-black rounded-3xl">
          Sign In
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
            <div className="flex flex-col  leading-9">
              <label
                htmlFor="name"
                className="font-medium tracking-wide text-[15px]"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={user.name}
                onChange={(e) =>
                  SetUser((prevUser) => ({ ...prevUser, name: e.target.value }))
                }
                className="border border-gray-500 hover:border-indigo-600 hover:border-1 bg-indigo-200 rounded-md px-3  focus:outline-none"
              />
            </div>
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
                  SetUser((prevUser) => ({
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
                  SetUser((prevUser) => ({
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
                onClick={() => handleSignup()}
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

export default Signup;
