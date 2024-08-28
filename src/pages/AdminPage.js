import React from "react";
import Navbar from "../components/Dashboard/Navbar";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/student");
  };
  return (
    <div className="w-full">
      <Navbar />
      <div className="max-w-[1200px] mx-auto mt-5">
        <div class="grid grid-cols-3 gap-4">
          <div
            className="flex items-center justify-center p-16 rounded-md shadow cursor-pointer bg-neutral-200"
            onClick={handleLogout}
          >
            <p className="text-xl font-bold"> Students</p>
          </div>
          <div className="flex items-center justify-center p-16 rounded-md shadow cursor-pointer bg-neutral-200">
            <p className="text-xl font-bold"> Course</p>
          </div>
          <div className="flex items-center justify-center p-16 rounded-md shadow cursor-pointer bg-neutral-200">
            <p className="text-xl font-bold">Enrollments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
