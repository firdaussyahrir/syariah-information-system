import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-[#3B82F6] border-b border-gray-300 sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center p-2">
        <div className="flex space-x-6 ml-auto">
          <Link
            to="/"
            className="text-white font-semibold hover:text-blue-800 transition duration-200">
            Home
          </Link>
          <Link
            to="/about"
            className="text-white font-semibold hover:text-blue-800 transition duration-200">
            About
          </Link>
          <Link
            to="/contact"
            className="text-white font-semibold hover:text-blue-800 transition duration-200">
            Contact
          </Link>
          <Link
            to="/profile"
            className="text-white font-semibold hover:text-blue-800 transition duration-200">
            Profile
          </Link>
          <Link
            to="/login"
            className="text-white font-semibold hover:text-blue-800 transition duration-200">
            Login
          </Link>
          <button className="text-white font-semibold hover:text-blue-800 transition duration-200">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
