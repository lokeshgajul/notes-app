import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-1/5 mt-2">
      <ul className="w-full">
        <li className="hover:rounded-r-2xl rounded-r-2xl p-3 bg-[#bbb9b9] ">
          Home
        </li>

        <li
          className="hover:rounded-r-2xl  p-3 hover:bg-[#f1f1f1] cursor-pointer"
          onClick={() => navigate("/notifications")}
        >
          Notifications
        </li>
        <li className="hover:rounded-r-2xl  p-3 hover:bg-[#f1f1f1]">
          Reminders
        </li>
        <li className="hover:rounded-r-2xl  p-3 hover:bg-[#f1f1f1]">About</li>
      </ul>
    </div>
  );
};

export default Sidebar;
