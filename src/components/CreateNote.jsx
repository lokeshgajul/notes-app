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
import { useEffect, useRef, useState } from "react";
import Notes from "./Notes";
import axios from "axios";
import { MdOutlineDone } from "react-icons/md";

const CreateNote = () => {
  const [open, setOpen] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const containRef = useRef(null);
  const isFormValid = () => title.trim() && desc.trim();

  useEffect(() => {
    const handleClickoutside = (event) => {
      if (containRef.current && !containRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickoutside);

    return () => {
      document.removeEventListener("mousedown", handleClickoutside);
    };
  }, []);

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
      alert("title and desc are required ");
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
    <div>
      <div className="flex justify-center items-start ">
        <div className=" rounded-xl p-1 mt-5 shadow-slate-400 shadow-md border-t-2 relative w-2/3">
          <div className="w-full ">
            <button
              className="absolute top-2 right-2 p-2"
              onClick={() => setOpen(!open)}
            >
              <MdOutlineDone
                onClick={() => {
                  if (isFormValid()) handleCreateNote();
                }}
                size={20}
                color={isFormValid() ? "black" : "grey"}
              />
            </button>

            <div
              className="flex justify-start items-start"
              onClick={() => setOpen(!open)}
            >
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                id="note"
                placeholder="Title"
                className="p-2.5 focus:outline-none rounded-lg capitalize text-[14px] font-semibold tracking-wide   w-full placeholder-gray-500 text-gray-800"
              />
            </div>

            {open && (
              <>
                <div className="flex justify-start items-start">
                  {/* <input
                type="text"
                name="desc"
                id="note"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Take a note"
              /> */}
                  <textarea
                    className="p-2.5 focus:outline-none rounded-lg capitalize text-[13px] font-medium tracking-wider w-full placeholder-gray-500 text-black"
                    name="desc"
                    placeholder="Take a note"
                    id="note"
                    rows="1"
                    value={desc}
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                  ></textarea>
                </div>
                <div className="flex justify-center items-center">
                  <p
                    className="w-full text-end pr-6 pb-2 cursor-pointer"
                    onClick={() => setOpen(false)}
                  >
                    close
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="pl-20 mt-10">
        <Notes
          notes={notes}
          // handleDeleteNotes={handleDeleteNotes}
          // edit={hanleEditNote}
          handleImage={handleImageUpload}
          image={image}
        />
      </div>
    </div>
  );
};

export default CreateNote;
