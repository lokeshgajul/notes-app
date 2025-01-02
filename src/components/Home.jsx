import React from "react";
import { useNavigate } from "react-router-dom";
import homepage from "../assets/homepage.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#1f2123]">
      <div className="flex justify-center items-center pt-20 ">
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
            className="text-white text-lg bg-blue-500 p-2 mt-6 hover:bg-blue-600 rounded-md"
          >
            Sign Up Now
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center w-fit mx-52 mt-20 shadow-2xl ">
        <img src={homepage} alt="Home page" className="rounded-lg  w-fit" />
      </div>
    </div>
  );
};

export default Home;
