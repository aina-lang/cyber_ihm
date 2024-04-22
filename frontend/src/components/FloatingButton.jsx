import React from "react";

const FloatingButton = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold h-[60px] w-[60px] rounded-full shadow-lg"
      onClick={onClick}
    >
      Button
    </button>
  );
};

export default FloatingButton;
