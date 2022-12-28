import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

const AddTask = () => {
  const handleAddTask = (event) => {
    event.preventDefault();
    const form = event.target;
    const task = form.task.value;
  };
  return (
    <div className="grid place-items-center pt-28">
      <form onSubmit={handleAddTask} className="flex gap-x-4 items-center">
        <div className="input-wrapper">
          <input
            type="text"
            name="task"
            id="task"
            className="form-input"
            placeholder="Enter Task"
            autoFocus
          />
          <label htmlFor="task" className="form-label">
            Enter Task
          </label>
        </div>
        <button type="submit" className="btn md:span-2 mt-4">
          <PlusIcon className="w-7 h-7"></PlusIcon>
        </button>
      </form>
    </div>
  );
};

export default AddTask;
