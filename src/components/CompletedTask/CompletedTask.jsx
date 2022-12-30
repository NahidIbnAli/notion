import React, { useContext } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../contexts/AuthProvider";

const CompletedTask = () => {
  const { setRefetchCompletedTask, user } = useContext(AuthContext);
  const {
    data: completedTasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["completedTasks", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/completedtasks?completed=true&email=${user?.email}`
      );
      const data = await res.json();
      setRefetchCompletedTask({ refetch });
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="grid place-items-center px-6 py-16">
      <div className="max-w-screen-md w-full mx-auto">
        {completedTasks.length > 0 && (
          <h2 className="text-4xl font-bold text-center">Completed Task</h2>
        )}
        <ul className="grid gap-7 pt-14">
          {completedTasks.map((task) => (
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
                <button className="updateBtn">Not Completed</button>
                <button
                  // onClick={() => handleDeleteTask(task?._id)}
                  className="deleteBtn"
                >
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

export default CompletedTask;
