/* eslint-disable react/prop-types */
import { ThemeContext } from "@/context/ThemeContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NoteDetails = () => {
  const [details, setDetails] = useState();
  const { noteId } = useParams();
  const { theme } = useContext(ThemeContext);

  const getSingleNotebyId = async () => {
    try {
      const res = await axios.post("http://localhost:3000/getSingleNote", {
        id: noteId,
      });
      const data = res.data;
      setDetails(data.selectedNotes);
      console.log("notes by id ", data);
    } catch (error) {
      throw new error();
    }
  };

  useEffect(() => {
    getSingleNotebyId();
  }, []);

  return (
    <div>
      <div>
        {details ? (
          <>
            <div
              className={` h-[350px] w-[900px] flex justify-center items-center m-7 rounded-xl `}
            >
              <img
                className="h-full w-full object-cover mt-5 rounded-xl"
                src={details.image}
                alt="note"
              />
            </div>

            <div
              className={` p-3  ${
                theme == "dark" ? "text-white" : "text-black"
              }`}
            >
              {details?.title}
            </div>
            <div
              className={` p-3  ${
                theme == "dark" ? "text-white" : "text-black"
              }`}
            >
              {details?.description}
            </div>
          </>
        ) : (
          <div>
            <p>Notes are empty or Not Available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetails;
