import React, { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./note.css";
import { ThemeContext } from "@/context/ThemeContext";
import axios from "axios";

const EditNote = ({ setEdit, edit, isOpen, closeModal, id }) => {
  const { theme } = useContext(ThemeContext);

  const [editNote, setEditNote] = useState();

  const editNoteByID = async () => {
    try {
      console.log("before ID:", id);
      console.log("Payload -> Title:", edit.title);
      console.log("Payload -> Description:", edit.description);

      const payload = { id, title: edit.title, description: edit.description };

      const response = await axios.post(
        "http://localhost:3000/editNote",
        payload
      );

      if (response) {
        const updatedNote = response.data.note; // Ensure you're accessing the correct property
        console.log("Updated Note from API:", updatedNote);
        setEdit(updatedNote);
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("name", name, "value", value);
  };

  useEffect(() => {}, [editNote]);
  return (
    <Popup
      open={isOpen}
      onClose={closeModal}
      className={` ${theme == "dark" ? "bg-[#3a3939]" : "bg-[#eceaea]"}`}
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button
            className={` close ${
              theme == "dark" ? "text-white" : "text-black"
            }  `}
            onClick={closeModal}
          >
            &times;
          </button>
          <div className="header"> Edit Note </div>
          <div className="content">
            <input
              type="text"
              name="title"
              id="note"
              placeholder="Title"
              value={edit?.title || ""}
              onChange={handleInputChange}
              className={` p-2.5 focus:outline-none rounded-lg capitalize text-[14px] font-semibold tracking-wide   w-full  ${
                theme == "dark"
                  ? "bg-[#3a3939] text-white placeholder-gray-400"
                  : "bg-white text-black placeholder-gray-500"
              }`}
            />
          </div>
          <div className="content">
            <textarea
              className={` p-2.5 focus:outline-none rounded-lg capitalize text-[13px] font-medium tracking-wider w-full text-black  ${
                theme == "dark"
                  ? "bg-[#3a3939] text-white  placeholder-gray-400"
                  : "bg-white text-black  placeholder-gray-500"
              } `}
              name="description"
              placeholder="Take a note"
              id="note"
              value={edit?.description || ""}
              rows="4"
              onChange={handleInputChange}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            ></textarea>
            <br />
          </div>
          <button
            className="absolute right-8"
            onClick={async () => {
              await editNoteByID(); // Wait for the API call to complete
              console.log("Modal closed");
              closeModal();
            }}
          >
            Done
          </button>
        </div>
      )}
    </Popup>
  );
};

export default EditNote;
