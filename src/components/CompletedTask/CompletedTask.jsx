import React from "react";
import UpdateTaskModal from "../MyTask/UpdateTaskModal";

const CompletedTask = () => {
  return (
    <div className="grid place-items-center py-16">
      <div className="max-w-screen-md mx-auto">
        {/* <h1>This is completed task section</h1> */}
        <UpdateTaskModal></UpdateTaskModal>
      </div>
    </div>
  );
};

export default CompletedTask;
