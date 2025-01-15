import React from "react";
import { Link, useNavigate } from "react-router-dom";
import homepage from "../assets/homepage.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#1f2123]">
      <ul className="flex flex-row justify-end items-end space-x-6 text-white p-6">
        <li className="cursor-pointer">
          <Link to="/signup">Sign Up</Link>
        </li>
        <li className="cursor-pointer">
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
      <div className="flex justify-center items-center ">
        <div className=" text-center">
          <p className="text-white text-5xl leading-tight font-semibold tracking-wide font-montserrat italic">
            The Simplest Way to
          </p>
          <p className="text-white text-5xl leading-tight font-semibold tracking-wide font-montserrat italic">
            Keep Notes
          </p>
          <div className="text-white text-xl mt-6 font-medium font-playfair italic tracking-wide">
            Stay focused and productive with a clean and clutter-free note
            space.
          </div>
          <button
            onClick={() => navigate("/signup")}
            className="text-white text-md bg-blue-500 p-1.5 mt-6 hover:bg-blue-600 rounded-[5px] tracking-tighter"
          >
            Sign Up Now
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center w-fit mx-40 mt-20 shadow-2xl ">
        <img src={homepage} alt="Home page" className="rounded-xl  w-fit" />
      </div>
    </div>
  );
};

export default Home;
