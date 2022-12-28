import React from "react";
import AddTask from "../components/AddTask/AddTask";
import MyTask from "../components/MyTask/MyTask";

const Home = () => {
  return (
    <div className="px-6 py-4 lg:px-10 xl:px-0">
      <div className="max-w-screen-lg mx-auto">
        <AddTask></AddTask>
        <MyTask></MyTask>
      </div>
    </div>
  );
};

export default Home;
