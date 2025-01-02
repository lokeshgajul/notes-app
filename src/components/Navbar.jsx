import React, { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
// import { SidebarTrigger } from "./ui/sidebar";
import { CiDark } from "react-icons/ci";
import { ThemeContext } from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import Signup from "./Auth/Signup";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    // <div
    //   className={`  flex flex-row justify-between items-center p-2.5 pr-5 ${
    //     theme == "dark" ? "bg-[#000814]" : "bg-[#fafafa]"
    //   } `}
    // >
    //   {/* <div className={`${theme == "dark" ? "text-white" : "text-black"}`}>
    //     <SidebarTrigger />
    //   </div> */}
    //   <div
    //     className={` font-semibold tracking-wide p-3 italic ${
    //       theme == "dark" ? "text-white" : "text-black"
    //     } `}
    //   >
    //     MY NOTES
    //   </div>
    //   <div className="p-1 rounded-xl flex flex-row bg-[#fef6f8] items-center">
    //     <div className="flex items-center px-2">
    //       <CiSearch size={16} color="grey" />
    //     </div>
    //     <input
    //       type="search"
    //       placeholder="Search"
    //       className="bg-[#fef6f8] rounded-2xl pl-2 flex-grow outline-none"
    //     />
    //   </div>
    //   <div
    //     className={`cursor-pointer  ${
    //       theme == "dark" ? "text-white" : "text-black"
    //     }`}
    //     onClick={toggleTheme}
    //   >
    //     <CiDark size={20} width={2} />
    //   </div>
    // </div>
    <>
      <div className="p-5 flex flex-row justify-between px-32 bg-[#1f2123]">
        <div className="text-white text-2xl  font-normal italic tracking-wider">
          Simple Note
        </div>
        <div>
          <ul className="flex flex-row space-x-5 text-white">
            <li className="cursor-pointer hover:text-gray-600 text-lg">
              Blogs{" "}
            </li>
            <li className="cursor-pointer hover:text-gray-600 text-lg">
              <Link to="/signin"> Log in</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-600 text-lg">
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
