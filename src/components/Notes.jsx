import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";

const Notes = ({ notes, handleDeleteNotes, edit, handleImage, image }) => {
  return (
    <div className="">
      <div className="font-medium text-xl">My Notes</div>
      <div className="mt-3 flex flex-row flex-wrap ">
        {notes.map((item, index) => (
          <div
            className="p-2 shadow-md h-auto flex flex-col rounded-md bg-[#f1f1f1] justify-between mr-5 w-[180px]"
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
              <p className="break-words">{item.title}</p>
              <p className="pt-1 pb-2 break-words">{item.desc}</p>
            </div>
            <div className="flex flex-row justify-end items-end">
              <p
                onClick={() => edit(index)}
                className="self-end text-green-500 cursor-pointer pr-2 font-[400]"
              >
                <MdEdit size={17} />
              </p>
              <p
                onClick={() => handleDeleteNotes(index)}
                className="self-end text-red-500 cursor-pointer pr-2 font-[400]"
              >
                <MdDeleteOutline size={17} />
              </p>
              <p
                onClick={() =>
                  document.getElementById(`imageUpload-${index}`).click()
                }
                className="self-end cursor-pointer pr-2 font-[400]"
              >
                <BiImageAdd size={17} />
              </p>
              <input
                type="file"
                id={`imageUpload-${index}`}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImage(e, index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
