import React, { useContext, useState } from "react";
import { PlusIcon, FolderArrowDownIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import Loader from "../Loader/Loader";
import { AuthContext } from "../../contexts/AuthProvider";
import LoginModal from "./LoginModal";

const AddTask = () => {
  const { user, refetchTask } = useContext(AuthContext);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   imagebbHostKey
  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const handleAddTask = (data, event) => {
    if (user?.email) {
      setBtnLoading(true);
      const image = data.image[0];
      const formData = new FormData();
      formData.append("image", image);
      fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageData) => {
          if (imageData.success) {
            fetch("http://localhost:5000/tasks", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                taskText: data.task,
                taskImage: imageData.data.url,
                email: user.email,
                completed: false,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                event.target.reset();
                setBtnLoading(false);
                refetchTask?.refetch();
              })
              .catch((error) => console.error(error));
          }
        });
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="grid place-items-center px-6 pt-24">
      <form
        onSubmit={handleSubmit(handleAddTask)}
        className="flex flex-col gap-y-2 items-center form"
      >
        <div className="input-wrapper">
          <input
            type="text"
            {...register("task", { required: "Task is Required" })}
            id="task"
            className="form-input"
            placeholder="Enter Task"
            autoFocus
          />

          <label htmlFor="task" className="form-label">
            Enter Task
          </label>
        </div>
        {errors.task && (
          <span className="text-red-600 text-base">{errors.task.message}</span>
        )}
        <div className="my-4 customLabelWidth">
          <label
            htmlFor="upload"
            className="flex gap-x-1 justify-center items-center text-base cursor-pointer customLabel"
          >
            <FolderArrowDownIcon className="w-5 h-5"></FolderArrowDownIcon>
            <span>Upload Photo</span>
          </label>
          <input
            type="file"
            {...register("image", { required: "Task Image is Required" })}
            id="upload"
            className="hidden"
            placeholder="Upload Photo"
          />
          {errors.image && (
            <span className="text-red-600 text-base">
              {errors.image.message}
            </span>
          )}
        </div>

        <button type="submit" className="btn md:span-2">
          {btnLoading ? (
            <Loader></Loader>
          ) : (
            <PlusIcon className="w-7 h-7"></PlusIcon>
          )}
        </button>
      </form>
      {!user?.email && (
        <LoginModal isOpen={isOpen} setIsOpen={setIsOpen}></LoginModal>
      )}
    </div>
  );
};

export default AddTask;
