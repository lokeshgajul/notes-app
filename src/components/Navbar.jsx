import React, { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { ThemeContext } from "@/context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      className={`  flex flex-row justify-between items-center p-1 pr-5 shadow-md ${
        theme == "dark" && "bg-[#2c2c2c]"
      } `}
    >
      <div
        className={` font-semibold tracking-wide p-3 italic ${
          theme == "dark" ? "text-white" : "text-black"
        } `}
      >
        MY NOTES
      </div>

      <div
        className={`cursor-pointer  ${
          theme == "dark" ? "text-white" : "text-black"
        }`}
        onClick={toggleTheme}
      >
        <CiDark size={20} width={2} />
      </div>
    </div>
  );
};

export default Navbar;
