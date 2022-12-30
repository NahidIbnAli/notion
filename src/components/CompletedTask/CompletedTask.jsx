import React, { useContext } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompletedTask = () => {
  const { setRefetchCompletedTask, user, refetchTask } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const {
    data: completedTasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["completedTasks", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://notion-server-nine.vercel.app/completedtasks?completed=true&email=${user?.email}`
      );
      const data = await res.json();
      setRefetchCompletedTask({ refetch });
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  // delete task handler
  const handleDeleteTask = (id) => {
    axios
      .delete(`https://notion-server-nine.vercel.app/tasks/${id}`)
      .then((response) => {
        refetch();
      })
      .catch((error) => console.error(error));
  };

  // Not complete task handler
  const handleNotCompleteTask = (id) => {
    axios
      .put(`https://notion-server-nine.vercel.app/completedtasks?id=${id}`)
      .then((response) => {
        refetch();
        refetchTask.refetch();
        navigate("/mytask");
      })
      .catch((error) => console.error(error));
  };

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
                <button
                  onClick={() => handleNotCompleteTask(task?._id)}
                  className="updateBtn"
                >
                  Not Completed
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
    </div>
  );
};

export default CompletedTask;
