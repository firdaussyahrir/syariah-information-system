import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4">
      <div className="container mx-auto px-4 text-center">
        {/* Logo Section */}
        <div className="mb-2">
          <img src={Logo} alt="Logo" className="h-8 mx-auto" />
        </div>

        {/* Info Section */}
        <div className="text-sm">
          <p>© {new Date().getFullYear()} Your Company</p>
          <p>
            <Link
              to="/privacy"
              className="hover:text-blue-600 transition duration-200">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link
              to="/contact"
              className="hover:text-blue-600 transition duration-200">
              Contact Us
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
