import React, { useContext, useEffect, useState } from "react";
import EditNote from "./EditNote";
import { ThemeContext } from "@/context/ThemeContext";
import axios from "axios";

const Notifications = () => {
  const [edit, setEdit] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const getSingleNote = async () => {
    try {
      const response = await fetch("http://localhost:3000/getSingleNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: "678bb7ccf39747c2b5593689" }),
      });
      const data = await response.json();
      console.log("Fetched note data:", data.selectedNotes);
      setEdit(data.selectedNotes);
      setModalOpen(true); // Open the modal after data is fetched
    } catch (error) {
      console.error("Error fetching note data:", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex justify-center flex-col items-center ">
      <p>Notifications</p>
      <button className="button" onClick={getSingleNote}>
        Edit Note
      </button>
      <EditNote
        setEdit={setEdit}
        edit={edit}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Notifications;
