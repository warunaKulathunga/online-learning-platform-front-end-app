import React, { useState } from "react";
import AddProductModal from "./AddProductModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userName }) => {
  // const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user, "user nav");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // const handleOpenModal = () => {
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  return (
    <div className="w-full">
      <nav className="max-w-[1200px] mx-auto p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <p className="text-base font-semibold">Hi</p>
            <p className="text-base font-normal">
              {user.role} , {user.username}
            </p>
          </div>
          <div className="flex">
            <button
              onClick={handleLogout}
              className="text-xs sm:text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all  py-1 sm:py-2 px-2 sm:px-4  rounded-xl bg-violet-500 text-white font-semibold"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

{
  /* <div className="container flex flex-col items-center justify-between mx-auto space-y-4 sm:flex-row sm:space-y-0">
          <div className="flex flex-col items-center sm:flex-row">
            <h1 className="text-sm font-bold text-gray-600 sm:text-lg">Hi,</h1>
            <p className="ml-1 text-sm text-gray-600 sm:text-lg">{userName}</p>
          </div>
          <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
            onClick={handleOpenModal}
            className="text-xs sm:text-sm  py-1 sm:py-2 px-2 sm:px-4  font-semibold rounded-xl border-2 border-gray-300 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all"
          >
            Add New Product
          </button>
          <AddProductModal show={showModal} onClose={handleCloseModal} />
            <button
              onClick={handleLogout}
              className="text-xs sm:text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all  py-1 sm:py-2 px-2 sm:px-4  rounded-xl bg-violet-500 text-white font-semibold"
            >
              Log out
            </button>
          </div>
        </div> */
}
