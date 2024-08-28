import React, { useEffect, useState } from "react";
import Navbar from "../components/Dashboard/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, fetchCourses } from "../store/reducers/courseSlice";
import CourseTable from "../components/admin/course/CourseTable";
import AddCourseModal from "../components/admin/course/AddCourseModal";
import EditCoursePopup from "../components/admin/course/EditCoursePopup";
import DeleteCourseModal from "../components/admin/course/DeleteCourseModal";
import { toast } from "react-toastify";
import APPString from "../APPString";

const CoursePage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { courses } = useSelector((state) => state.courses);
  const [editCourse, setEditCourse] = useState(null);

  const [deleteCourseId, setDeleteCourse] = useState(null);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = (course) => {
    setEditCourse(course);
  };

  const handleDelete = (courseId) => {
    setDeleteCourse(courseId);
  };

  const handleDeleteCourse = async () => {
    try {
      await dispatch(deleteCourse(deleteCourseId)).unwrap();
      dispatch(fetchCourses());
      toast.success(APPString.tostMessage.success.courseDeleteSuccess);
    } catch (err) {
      toast.error(`Failed to delete course: ${err.message}`);
    }
    setDeleteCourse(null);
  };

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto">
      <Navbar />
      <div className="mt-5 mb-5">
        <button
          type="submit"
          onClick={handleOpenModal}
          className="text-xs sm:text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all  py-1 sm:py-2 px-2 sm:px-4  rounded-xl bg-violet-500 text-white font-semibold"
        >
          Create Course
        </button>
      </div>
      <AddCourseModal show={showModal} onClose={handleCloseModal} />
      <CourseTable
        courses={courses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {editCourse && (
        <EditCoursePopup
          course={editCourse}
          onClose={() => {
            setEditCourse(null);
          }}
        />
      )}
      {deleteCourseId && (
        <DeleteCourseModal
          onClose={() => {
            setDeleteCourse(null);
          }}
          onSubmit={handleDeleteCourse}
        />
      )}
    </div>
  );
};

export default CoursePage;
