import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Loading from "../Loading/Loading";
import {
  TrashIcon,
  ClipboardDocumentCheckIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../contexts/AuthProvider";

const MyTask = () => {
  const { setRefetchTask } = useContext(AuthContext);
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();
      setRefetchTask({ refetch });
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="grid place-items-center py-16">
      <div className="max-w-screen-md w-full mx-auto">
        <h2 className="text-4xl font-bold text-center">My Task List</h2>
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
                <button className="completeBtn">
                  <ClipboardDocumentCheckIcon className="w-7 h-7"></ClipboardDocumentCheckIcon>
                </button>
                <button className="updateBtn">
                  <PencilSquareIcon className="w-7 h-7"></PencilSquareIcon>
                </button>
                <button className="deleteBtn">
                  <TrashIcon className="w-7 h-7"></TrashIcon>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyTask;
