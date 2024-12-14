import React from "react";

function ReadDps({ fileUrl }) {
  const handleRead = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank"); // Open PDF in a new tab
    } else {
      alert("No file available to read.");
    }
  };

  return (
    <button
      onClick={handleRead}
      className="text-blue-500 hover:text-blue-700 text-sm mx-2">
      Read PDF
    </button>
  );
}

export default ReadDps;
