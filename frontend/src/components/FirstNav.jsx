import React from "react";
import { Link } from "react-router-dom";

const FirstNav = () => {
  return (
    <nav className="bg-[#EC2029] border-b border-gray-300 sticky top-0 z-30 w-full">
      <div className="flex justify-end items-center px-4 py-2">
        <Link
          to="/"
          className="text-white font-semibold hover:text-blue-800 transition duration-200 px-3">
          Home
        </Link>
        <Link
          to="#"
          className="text-white font-semibold hover:text-blue-800 transition duration-200 px-3">
          Profile
        </Link>
        <Link
          to="#"
          className="text-white font-semibold hover:text-blue-800 transition duration-200 px-3">
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default FirstNav;
