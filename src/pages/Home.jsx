import React from "react";
import AddTask from "../components/AddTask/AddTask";

const Home = () => {
  return (
    <div className="px-6 py-4 lg:px-10 xl:px-0 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <AddTask></AddTask>
      </div>
    </div>
  );
};

export default Home;
