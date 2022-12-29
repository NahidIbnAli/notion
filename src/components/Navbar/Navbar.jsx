import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import { FiLogOut } from "react-icons/fi";
import "./Navbar.css";
import { AuthContext } from "../../contexts/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleSignOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

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
      <NavLink to="/completedtask" className="py-3 lg:py-0 lg:pr-9">
        Completed Task
      </NavLink>
      {user?.uid ? (
        <button
          className="signOutBtn flex gap-x-1 items-center"
          onClick={handleSignOut}
        >
          <span>Sign Out</span> <FiLogOut></FiLogOut>
        </button>
      ) : (
        <Link to="/login" className="signOutBtn">
          <button>Login</button>
        </Link>
      )}
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
        <div className="hidden lg:flex items-center">{navItems}</div>
        <div
          className={`fixed top-16 z-10 lg:static duration-500 ease-in-out w-custom lg:hidden ${
            toggleMenu ? "translate-none" : "translate-x-[998px]"
          }`}
        >
          <div
            onClick={() => setToggleMenu(!toggleMenu)}
            className={`flex flex-col backdrop-blur-md px-6 pt-3 pb-7 rounded-lg shadow-xl`}
          >
            {navItems}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
