import React from "react";
import { Link } from "react-router-dom";

const FirstNav = () => {
  return (
    <nav className="bg-[#EC2029] border-b border-gray-300 sticky top-0 z-30">
      <div className="container mx-auto flex justify-between items-center p-2">
        <div className="flex space-x-6 ml-auto">
          <Link
            to="#"
            className="text-white font-semibold hover:text-blue-800 transition duration-200">
            Home
          </Link>
          <Link
            to="#"
            className="text-white font-semibold hover:text-blue-800 transition duration-200">
            Profile
          </Link>
          <Link
            to="#"
            className="text-white font-semibold hover:text-blue-800 transition duration-200">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default FirstNav;
