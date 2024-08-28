import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userName }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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
