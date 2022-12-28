import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="grid place-items-center pt-28">
      <div className="max-w-screen-md mx-auto text-center">
        <h1 className="text-3xl">
          <span className="text-red-500">404</span> | This route not found
        </h1>
        <Link to="/">
          <button className="mt-7 bg-indigo-500 px-4 py-2 rounded-md">
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
