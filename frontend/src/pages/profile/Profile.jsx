import React from "react";

function Profile() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <div className="mb-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-gray-200"
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
        <p className="text-gray-600 text-sm">Software Engineer</p>
        <p className="mt-2 text-gray-500 text-sm">
          Email:{" "}
          <a href="mailto:johndoe@example.com" className="text-blue-500">
            johndoe@example.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default Profile;
