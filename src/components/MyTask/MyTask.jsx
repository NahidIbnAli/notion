import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import Loading from "../Loading/Loading";
import {
  TrashIcon,
  ClipboardDocumentCheckIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import UpdateTaskModal from "./UpdateTaskModal";

const MyTask = () => {
  const { user, setRefetchTask, refetchCompletedTask } =
    useContext(AuthContext);

  const [task, setTask] = useState(null);

  const closeModal = () => setTask(null);

  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/tasks?completed=false&email=${user?.email}`
      );
      const data = await res.json();
      setRefetchTask({ refetch });
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  // delete task handler
  const handleDeleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then((response) => {
        refetch();
      })
      .catch((error) => console.error(error));
  };

  // complete task handler
  const handleCompleteTask = (id) => {
    axios
      .put(`http://localhost:5000/tasks?id=${id}`)
      .then((response) => {
        refetch();
        refetchCompletedTask.refetch();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="grid place-items-center px-6 pt-16 pb-5">
      <div className="max-w-screen-md w-full mx-auto">
        {tasks.length > 0 && (
          <h2 className="text-4xl font-bold text-center">My Task List</h2>
        )}
        <ul className="grid gap-7 pt-14">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex flex-col md:flex-row md:justify-between md:items-center p-5 rounded-lg customBorderTwo"
            >
              <div className="flex flex-col md:flex-row md:justify-between items-center gap-3">
                <img
                  src={task?.taskImage}
                  alt=""
                  className="w-16 h-16 object-cover rounded-md"
                />
                <p className="text-lg font-medium">{task?.taskText}</p>
              </div>
              <div className="flex justify-center items-center gap-4 threeBtn pt-6 md:pt-0">
                <button
                  onClick={() => handleCompleteTask(task?._id)}
                  className="completeBtn"
                >
                  <ClipboardDocumentCheckIcon className="w-7 h-7"></ClipboardDocumentCheckIcon>
                </button>
                <button
                  onClick={() =>
                    setTask({ id: task?._id, taskText: task?.taskText })
                  }
                  className="updateBtn"
                >
                  <PencilSquareIcon className="w-7 h-7"></PencilSquareIcon>
                </button>
                <button
                  onClick={() => handleDeleteTask(task?._id)}
                  className="deleteBtn"
                >
                  <TrashIcon className="w-7 h-7"></TrashIcon>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {task && (
        <UpdateTaskModal
          closeModal={closeModal}
          task={task}
          refetch={refetch}
        ></UpdateTaskModal>
      )}
    </div>
  );
};

export default MyTask;
