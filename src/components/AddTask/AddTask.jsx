import React, { useState } from "react";
import { PlusIcon, FolderArrowDownIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import Loader from "../Loader/Loader";

const AddTask = () => {
  const [btnLoading, setBtnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   imagebbHostKey
  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const handleAddTask = (data) => {
    setBtnLoading(true);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    console.log(image);
    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const task = {
            taskText: data.task,
            taskImage: imageData.data.url,
          };
          // fetch('')
        }
      });
    console.log(image);
  };
  return (
    <div className="grid place-items-center pt-24">
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
        <div className="my-4">
          <label
            htmlFor="upload"
            className="flex gap-x-1 items-center text-base px-4 py-2 cursor-pointer customLabel"
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
        </div>

        <button type="submit" className="btn md:span-2">
          {btnLoading ? (
            <Loader></Loader>
          ) : (
            <PlusIcon className="w-7 h-7"></PlusIcon>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
