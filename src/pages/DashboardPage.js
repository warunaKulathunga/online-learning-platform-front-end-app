import React, { useEffect, useState } from "react";
import Navbar from "../components/Dashboard/Navbar";
import ProductTable from "../components/Dashboard/ProductTable";
import EditProductPopup from "../components/Dashboard/EditProductPopup";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../store/reducers/courseSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.courses);

  const [editCourse, setEditCourse] = useState(null);

  const user = useSelector((state) => state.auth.user);

  const handleEdit = (course) => {
    setEditCourse(course);
  };

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  return (
    <div>
      <Navbar userName={user.email} />
      <div>
        <ProductTable course={courses} onEdit={handleEdit} />
        {editCourse && (
          <EditProductPopup
            course={editCourse}
            onClose={() => setEditCourse(null)}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
