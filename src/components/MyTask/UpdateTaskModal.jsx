import { React, Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useForm } from "react-hook-form";
import Loader from "../Loader/Loader";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateTaskModal = ({ closeModal, task, refetch }) => {
  const { user } = useContext(AuthContext);
  const [updateBtnLoading, setUpdateBtnLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateTask = (data) => {
    setUpdateBtnLoading(true);
    axios
      .patch(`https://notion-server-nine.vercel.app/tasks/${task?.id}`, {
        updateTaskText: data?.updateTask,
      })
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          setUpdateBtnLoading(false);
          toast.success("Updated successfully");
          refetch();
          closeModal();
        }
      })
      .catch((error) => {
        setUpdateBtnLoading(false);
        console.error(error);
      });
  };

  return (
    <Transition appear show={task ? true : false} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-25" />
        </Transition.Child>

        <div className="fixed left-0 right-0 top-44 overflow-y-auto fixModal">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl customBorder backdrop-blur-md p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="font-medium leading-6 text-center"
                >
                  {user?.displayName}
                </Dialog.Title>
                <form
                  onSubmit={handleSubmit(handleUpdateTask)}
                  className="mt-2"
                >
                  <textarea
                    {...register("updateTask", {
                      required: "Task Text is Required",
                    })}
                    rows="3"
                    defaultValue={task?.taskText}
                    className="w-full inputModal px-3 py-2"
                  ></textarea>
                  {errors.updateTask && (
                    <span className="text-red-600">
                      {errors.updateTask.message}
                    </span>
                  )}
                  <div className="mt-4 text-center">
                    <button type="submit" className="updateBtn">
                      {updateBtnLoading ? (
                        <Loader></Loader>
                      ) : (
                        <span>Update</span>
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateTaskModal;
