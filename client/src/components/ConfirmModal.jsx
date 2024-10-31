import React from "react";

const ConfirmationModal = ({ isVisible, onConfirm, onCancel, message }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[] shadow-lg transform transition-all duration-300 ease-in-out">
        <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
          {message}
        </h3>
        <div className="flex justify-between mt-6">
          <button
            className="bg-red-500 text-white rounded-md px-6 py-2 hover:bg-red-600 transition duration-200 ease-in-out"
            onClick={onConfirm}
          >
            Oui
          </button>
          <button
            className="bg-gray-300 text-gray-700 rounded-md px-6 py-2 hover:bg-gray-400 transition duration-200 ease-in-out"
            onClick={onCancel}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
