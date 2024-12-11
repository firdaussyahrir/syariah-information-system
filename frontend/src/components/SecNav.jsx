import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets";

const SecNav = () => {
  return (
    <div className="bg-white text-[#355070] border-b border-gray-200 sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center px-8 py-2">
        <Link to="/">
          <img
            src={Logo}
            alt="Syariah Information System Logo"
            className="w-10 h-auto"
          />
        </Link>
        <nav className="ml-12 flex space-x-8">
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/dps"
                className="hover:text-[#467599] transition duration-300">
                DPS
              </Link>
            </li>
            <li>
              <Link
                to="/lrsa"
                className="hover:text-[#467599] transition duration-300">
                LRSA
              </Link>
            </li>
            <li>
              <Link
                to="/regulasi"
                className="hover:text-[#467599] transition duration-300">
                REGULASI
              </Link>
            </li>
            <li>
              <Link
                to="/riset"
                className="hover:text-[#467599] transition duration-300">
                RISET
              </Link>
            </li>
            <li>
              <Link
                to="/buletin"
                className="hover:text-[#467599] transition duration-300">
                BULETIN
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SecNav;
