/* eslint-disable react/prop-types */
import React from "react";

const NoteDetails = ({
  singleNote,
  title,
  setTitle,
  handleKeyDown,
  taskInputRef,
  handleInput,
  desc,
  setDesc,
}) => {
  return (
    <div>
      {singleNote ? (
        <div className="p-5">
          <p className="capitalize text-lg font-decorative font-semibold mb-4">
            {singleNote && singleNote.selectedNotes.title}
          </p>
          <div className="h-[50vh] w-full rounded-lg">
            <img
              className="h-full w-full object-cover rounded-lg"
              src={singleNote?.selectedNotes.image}
              alt="Image Not Available..."
            />
          </div>

          <div className="pt-4">
            {singleNote && singleNote.selectedNotes.description}
          </div>
        </div>
      ) : (
        <div className="p-10 text-gray-400 flex flex-col ">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
            className="focus:outline-none font-bold text-black  placeholder-gray-600 capitalize"
            onKeyDown={handleKeyDown}
          />
          <textarea
            name="note"
            id="note"
            placeholder="Take a note"
            className="focus:outline-none mt-8 placeholder-gray-500 w-full p-2 text-gray-800 rounded resize-none "
            ref={taskInputRef}
            onInput={handleInput} // Adjust height on input
            style={{ overflow: "hidden" }} // Prevent scrollbars
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default NoteDetails;
