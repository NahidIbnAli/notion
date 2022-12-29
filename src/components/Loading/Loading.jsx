import React from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center py-20">
      <HashLoader color="#4A40BF" size={115} />
    </div>
  );
};

export default Loading;
