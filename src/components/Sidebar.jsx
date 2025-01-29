import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  return (
    <div className=" mt-2">
      <ul
        className={` w-full ${theme == "dark" ? "text-white" : "text-black"} `}
      >
        <li
          className={` hover:rounded-r-2xl rounded-r-2xl p-3 ${
            theme == "dark" ? "bg-[#3a3939]" : "bg-[#f1f1f1]"
          }  `}
        >
          <Link to="/"> Home</Link>
        </li>

        <li
          className={` hover:rounded-r-2xl  p-3 ${
            theme == "dark" ? "hover:bg-[#3a3939]" : "hover:bg-[#f1f1f1]"
          }  cursor-pointer `}
        >
          <Link to="/notifications">Notifications</Link>
        </li>
        <li
          className={` hover:rounded-r-2xl  p-3 ${
            theme == "dark" ? "hover:bg-[#3a3939]" : "hover:bg-[#f1f1f1]"
          }  `}
        >
          Reminders
        </li>
        <li
          className={` hover:rounded-r-2xl  p-3 ${
            theme == "dark" ? "hover:bg-[#3a3939]" : "hover:bg-[#f1f1f1]"
          }  `}
        >
          About
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
