import React, { useContext } from "react";
import CreateNote from "./CreateNote";
import NotesCard from "./NotesCard";

const Notes = () => {
  return (
    <div className={` mt-3 flex justify-center items-start flex-col  `}>
      <div className="mt-5">
        <CreateNote />
      </div>
      <div className="mt-5 flex justify-start items-start">
        <NotesCard />
      </div>
    </div>
  );
};

export default Notes;
