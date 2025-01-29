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
import { useContext, useEffect, useRef, useState } from "react";
import NotesCard from "./NotesCard";
import axios from "axios";
import { MdOutlineDone } from "react-icons/md";
import { ThemeContext } from "@/context/ThemeContext";

const CreateNote = () => {
  const [open, setOpen] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [NotesCardCard, setNotesCardCard] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const containRef = useRef(null);
  const isFormValid = () => title.trim() && desc.trim();
  const { theme } = useContext(ThemeContext);

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
      setImage(newImage);
    }
    console.log("file", image);
  };

  const handleCreateNote = async () => {
    if (!title || !desc) {
      alert("title and desc are required ");
    }

    if (isEditing) {
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
        setNotesCardCard([
          ...NotesCard,
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
    <div className="">
      <section className="ml-14 w-[600px]">
        <div
          className={`flex flex-col rounded-xl p-1 shadow-md w-full ${
            theme == "dark" ? "bg-[#3a3939] " : "bg-white shadow-slate-400 "
          }`}
          style={{ width: "100%" }} // Ensure it respects the section width
        >
          <div className="w-full relative">
            <button
              className={`absolute top-2 right-2 p-2`}
              onClick={() => setOpen(!open)}
            >
              <MdOutlineDone
                onClick={() => {
                  if (isFormValid()) handleCreateNote();
                }}
                size={20}
                color={
                  theme == "dark"
                    ? isFormValid()
                      ? "white"
                      : "grey"
                    : isFormValid()
                    ? "black"
                    : "grey"
                }
              />
            </button>

            <div
              className={`flex justify-start items-start ${
                theme == "dark" ? "bg-[#3a3939]" : "bg-white"
              }`}
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
                className={`p-2.5 focus:outline-none rounded-lg capitalize text-[14px] font-semibold tracking-wide w-full ${
                  theme == "dark"
                    ? "bg-[#3a3939] text-white placeholder-gray-400"
                    : "bg-white text-black placeholder-gray-500"
                }`}
              />
            </div>

            {open && (
              <>
                <div className="flex justify-start items-start">
                  <textarea
                    className={`p-2.5 focus:outline-none rounded-lg capitalize text-[13px] font-medium tracking-wider w-full text-black ${
                      theme == "dark"
                        ? "bg-[#3a3939] text-white placeholder-gray-400"
                        : "bg-white text-black placeholder-gray-500"
                    }`}
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
                    className={`w-full text-end pr-6 pb-2 cursor-pointer ${
                      theme == "dark" ? "text-white" : "text-black"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    close
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateNote;
