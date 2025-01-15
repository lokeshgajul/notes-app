/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NoteDetails = () => {
  const [details, setDetails] = useState();
  const { noteId } = useParams();

  const getSingleNotebyId = async (id) => {
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
            <div className="h-[350px] w-[900px] flex justify-center items-center m-7 rounded-xl">
              <img
                className="h-full w-full object-cover mt-5 rounded-xl"
                src={details.image}
                alt="note"
              />
            </div>

            <div className="p-3">{details?.title}</div>
            <div className="p-3">{details?.description}</div>
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
