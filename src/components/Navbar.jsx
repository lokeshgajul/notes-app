import React, { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import { SidebarTrigger } from "./ui/sidebar";
import { CiDark } from "react-icons/ci";
import { ThemeContext } from "@/context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      className={`  flex flex-row justify-between items-center p-1 pr-5 ${
        theme == "dark" ? "bg-[#09090b]" : "bg-white"
      } `}
    >
      <div className={`${theme == "dark" ? "text-white" : "text-black"}`}>
        <SidebarTrigger />
      </div>
      <div
        className={` font-semibold tracking-wide p-3 italic ${
          theme == "dark" ? "text-white" : "text-black"
        } `}
      >
        MY NOTES
      </div>
      <div className="p-1 rounded-xl flex flex-row bg-[#fef6f8] items-center">
        <div className="flex items-center px-2">
          <CiSearch size={16} color="grey" />
        </div>
        <input
          type="search"
          placeholder="Search"
          className="bg-[#fef6f8] rounded-2xl pl-2 flex-grow outline-none"
        />
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
