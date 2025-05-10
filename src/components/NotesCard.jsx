import { useContext, useEffect, useRef, useState } from "react";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "@/context/ThemeContext";
import EditNote from "./EditNote";
import { NotesContext } from "@/context/NotesContext";

const NotesCard = () => {
  const [edit, setEdit] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const { notesCard, getnotesCard, handleDeletenotesCard, handleImageUpload } =
    useContext(NotesContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const getSingleNote = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/getSingleNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      console.log("Fetched note data:", data.selectedNotes);
      setEdit(data.selectedNotes);
      setSelectedId(data.selectedNotes._id);
      setModalOpen(true); // Open the modal after data is fetched
    } catch (error) {
      console.error("Error fetching note data:", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getnotesCard();
  }, []);

  return (
    <div className="">
      <div className="mt-3 flex flex-row flex-wrap">
        {notesCard.map((item, index) => (
          <div
            className={` p-2 shadow-md h-auto flex flex-col rounded  justify-between mr-5 w-[180px] mb-5 ${
              theme == "dark"
                ? "bg-[#3a3939] text-white"
                : "bg-[#f1f1f1] text-black"
            } `}
            key={index}
          >
            <div className="w-full h-[100px] mb-2 bg-gray-200 rounded-md flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt="Note"
                  className="w-full h-full object-cover rounded cursor-pointer"
                  onClick={() => navigate(`/noteDetails/${item._id}`)}
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
            <div
              className="p-2 cursor-pointer"
              onClick={() => navigate(`/noteDetails/${item._id}`)}
            >
              <p className="break-words text-[14px] font-medium tracking-wide capitalize">
                {item.title.slice(0, 30)}...
              </p>
              <p className="pt-1 pb-2 break-words text-[13px]">
                {item.description.slice(0, 40)}...
              </p>
            </div>
            <div className="flex flex-row justify-end items-end ">
              <p
                onClick={() => getSingleNote(item._id)}
                className="self-end text-green-500 cursor-pointer pr-2 font-[400]"
              >
                <MdEdit size={17} />
              </p>

              <EditNote
                setEdit={setEdit}
                edit={edit}
                id={selectedId}
                isOpen={isModalOpen}
                closeModal={closeModal}
              />
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

export default NotesCard;
