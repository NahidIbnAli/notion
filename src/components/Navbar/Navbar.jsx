import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import "./Navbar.css";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navItems = (
    <>
      <NavLink to="/" className="py-3 lg:py-0 lg:pr-9">
        Add Task
      </NavLink>
      <hr />
      <NavLink to="/mytask" className="py-3 lg:py-0 lg:pr-9">
        My Task
      </NavLink>
      <hr />
      <NavLink to="/completedtask" className="py-3 lg:py-0">
        Completed Task
      </NavLink>
    </>
  );
  return (
    <nav>
      <div className="container max-w-screen-lg mx-auto flex justify-between items-center px-6 py-4 lg:px-10 xl:px-0">
        <Link to="/" className="text-xl font-bold">
          Notion
        </Link>
        <button
          onClick={() => setToggleMenu(!toggleMenu)}
          className="lg:hidden"
        >
          <Bars3CenterLeftIcon className="w-8 h-8"></Bars3CenterLeftIcon>
        </button>
        <div className="hidden lg:flex">{navItems}</div>
        <div
          className={`fixed top-16 z-10 lg:static duration-500 ease-in-out w-custom lg:hidden ${
            toggleMenu ? "translate-none" : "translate-x-[998px]"
          }`}
        >
          <div
            onClick={() => setToggleMenu(!toggleMenu)}
            className={`flex flex-col backdrop-blur-md px-6 py-3 rounded-lg shadow-xl`}
          >
            {navItems}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
