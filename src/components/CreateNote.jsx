import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import Notes from "./Notes";
import axios from "axios";

const CreateNote = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);

  const taskInputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      taskInputRef.current.focus();
    }
  };

  const handleInput = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto"; // Reset height to auto to shrink if necessary
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = URL.createObjectURL(file);
      setImage(newImage); // optional
      // setNotes((prevNotes) =>
      //   prevNotes.map((note, i) =>
      //     i === index ? { ...note, image: newImage } : note
      //   )
      // );
    }
    console.log("file", image);
  };

  // Edit Note
  // const hanleEditNote = (index) => {
  //   const note = notes[index];
  //   setTitle(note.title);
  //   setDesc(note.desc);
  //   setIsEditing(true);
  //   setEditIndex(index);
  //   setOpen(true);
  // };

  // ADD or UPDATE notes state
  // const handleSaveNote = () => {
  //   if (isEditing) {
  //     const updateNotes = [...notes];
  //     updateNotes[editIndex] = { title, desc };
  //     setNotes(updateNotes);
  //     setEditIndex(null);
  //     setIsEditing(false);
  //   } else {
  //     setNotes([...notes, { title, desc }]);
  //   }

  //   setOpen(false);
  //   setTitle("");
  //   setDesc("");
  // };

  const handleCreateNote = async () => {
    if (!title || !desc) {
      console.log("title and desc are required ");
    }

    if (isEditing) {
      // const updateNotes = [...notes];
      // updateNotes[editIndex] = { title, desc };
      // setNotes(updateNotes);

      setEditIndex(null);
      setIsEditing(false);
    } else {
      try {
        const response = await axios.post("http://localhost:3000/createNote", {
          title,
          description: desc,
        });

        const savedNote = await response.data;
        console.log("data", savedNote);
        setNotes([
          ...notes,
          { title: savedNote.title, desc: savedNote.description },
        ]);
      } catch (error) {
        console.log("error", error);
      }
    }
    setOpen(false);
    setTitle("");
    setDesc("");
  };

  return (
    <>
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
      <div className=" mt-4 ">
        <Notes notes={notes} />
      </div>
    </>
  );
};

export default CreateNote;
