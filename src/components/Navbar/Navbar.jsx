import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import "./Navbar.css";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navItems = (
    <>
      <NavLink to="/addtask" className="py-3 lg:py-0 lg:pr-9">
        Add Task
      </NavLink>
      <hr className="border-none h-px bg-indigo-300" />
      <NavLink to="/mytask" className="py-3 lg:py-0 lg:pr-9">
        My Task
      </NavLink>
      <hr className="border-none h-px bg-indigo-300" />
      <NavLink to="/completedtask" className="py-3 lg:py-0">
        Completed Task
      </NavLink>
    </>
  );
  return (
    <nav>
      <div className="container max-w-screen-lg mx-auto flex justify-between items-center px-6 lg:px-10 xl:px-0 py-4">
        <Link to="/" className="text-xl font-bold">
          Notion
        </Link>
        <button
          onClick={() => setToggleMenu(!toggleMenu)}
          className="lg:hidden"
        >
          <Bars3CenterLeftIcon className="w-7 h-7"></Bars3CenterLeftIcon>
        </button>
        <div className="hidden lg:flex">{navItems}</div>
        <div
          className={`fixed top-16 z-10 lg:static duration-500 ease-in-out w-custom lg:hidden ${
            toggleMenu ? "translate-none" : "translate-x-[998px]"
          }`}
        >
          <div
            className={`flex flex-col bg-indigo-400 text-indigo-50 backdrop-blur-md px-6 py-3 rounded-lg`}
          >
            {navItems}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
