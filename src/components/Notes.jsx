import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import axios from "axios";
import { useEffect, useState } from "react";

const Notes = ({ notes, edit, handleImage, image }) => {
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

  useEffect(() => {
    getnotesCard();
  }, [notes]);

  return (
    <div className="">
      <div className="font-medium text-xl">My Notes</div>
      <div className="mt-3 flex flex-row flex-wrap ">
        {notesCard.map((item, index) => (
          <div
            className="p-2 shadow-md h-auto flex flex-col rounded-md bg-[#f1f1f1] justify-between mr-5 w-[180px] mb-5"
            key={index}
          >
            <div className="w-full h-[100px] mb-2 bg-gray-200 rounded-md flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt="Note"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <p
                  className="text-gray-400 text-sm"
                  onClick={() =>
                    document.getElementById(`imageUpload-${index}`).click()
                  }
                >
                  Upload Image
                </p>
              )}
            </div>
            <div className="p-2">
              <p className="break-words text-[14px] capitalize">{item.title}</p>
              <p className="pt-1 pb-2 break-words text-[13px]">
                {item.description}
              </p>
            </div>
            <div className="flex flex-row justify-end items-end ">
              <p
                onClick={() => edit(index)}
                className="self-end text-green-500 cursor-pointer pr-2 font-[400]"
              >
                <MdEdit size={17} />
              </p>
              <p
                onClick={() => handleDeletenotesCard(item._id)}
                className="self-end text-red-500 cursor-pointer pr-2 font-[400]"
              >
                <MdDeleteOutline size={17} />
              </p>
              <p className="self-end cursor-pointer pr-2 font-[400]">
                <BiImageAdd
                  size={17}
                  onClick={() =>
                    document.getElementById(`imageUpload-${index}`).click()
                  }
                />
                <input
                  type="file"
                  id={`imageUpload-${index}`}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    const selectedFile = event.target.files[0];
                    if (!selectedFile) {
                      return; // Handle no file selected case (optional)
                    }
                    handleImageUpload(item._id, selectedFile);
                  }}
                />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
