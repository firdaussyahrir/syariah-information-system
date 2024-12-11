// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets";

function Footer() {
  return (
    <footer className="bg-[#E7F0F9] text-gray-700 py-6">
      <div className="container mx-auto px-4 text-center">
        {/* Logo Section */}
        <div className="mb-4">
          <img
            src={Logo}
            alt="CIMB Niaga Syariah Logo"
            className="h-10 mx-auto"
          />
        </div>

        {/* Watermark Section */}
        <div className="text-sm">
          <p>© {new Date().getFullYear()} MSIB Batch 7 @ CIMB Niaga</p>
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
