import React from "react";

const DeleteEnrollmentModal = ({ onClose, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-lg sm:mx-6">
        <h2 className="mb-4 text-lg font-semibold">Delete Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Are you sure you want to delete this enrollment?
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-xs sm:text-sm  py-1 sm:py-2 px-2 sm:px-4  font-semibold rounded-xl border-2 border-gray-300 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-xs sm:text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all  py-1 sm:py-2 px-2 sm:px-4  rounded-xl bg-violet-500 text-white font-semibold"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteEnrollmentModal;
