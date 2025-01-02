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
import { useState } from "react";
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
      <div className="flex flex-col justify-center items-center ">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            asChild
            className="flex justify-center items-center bg-[#f1f1f1] hover:bg-white mt-6"
          >
            <Button variant="outline">
              {" "}
              <p className=" p-2 ">Create Note</p>{" "}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] ">
            <DialogHeader>
              <DialogTitle>New Task</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Title
                </Label>
                <Input
                  id="name"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Description
                </Label>
                <Input
                  id="username"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleCreateNote}>
                {isEditing ? "update note" : "save note"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className=" mt-4 ">
        <Notes
          notes={notes}
          // handleDeleteNotes={handleDeleteNotes}
          // edit={hanleEditNote}
          handleImage={handleImageUpload}
          image={image}
        />
      </div>
    </>
  );
};

export default CreateNote;
