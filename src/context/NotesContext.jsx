import axios from "axios";
import { createContext, useState } from "react";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notesCard, setNotesCard] = useState([]);

  const getnotesCard = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getNotes");
      if (response) {
        const notesCard = await response.data;
        console.log("notesCard", notesCard);
        setNotesCard(notesCard);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletenotesCard = async (id) => {
    try {
      const response = await axios.post("http://localhost:3000/deleteNote", {
        id: id,
      });
      if (response) {
        const data = await response.data;
        console.log("id", id);

        console.log("data", data);
        getnotesCard();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleImageUpload = async (id, file) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3000/uploadImage", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error uploading image: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("updated note", data.note);
      getnotesCard();
    } catch (error) {
      console.error("error ", error);
    }
  };

  const value = {
    notesCard,
    getnotesCard,
    handleDeletenotesCard,
    handleImageUpload,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
