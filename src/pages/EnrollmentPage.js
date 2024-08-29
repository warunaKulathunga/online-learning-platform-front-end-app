import React, { useEffect, useState } from "react";
import Navbar from "../components/Dashboard/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import APPString from "../APPString";
import AddEnrollmentModal from "../components/admin/enrollment/AddEnrollmentModal";
import EnrollmentTable from "../components/admin/enrollment/EnrollmentTable";
import EditEnrollmentPopup from "../components/admin/enrollment/EditEnrollmentPopup";
import DeleteEnrollmentModal from "../components/admin/enrollment/DeleteEnrollmentModal";
import {
  deleteEnrollment,
  fetchEnrollment,
} from "../store/reducers/enrollmentSlice";

const EnrollmentPage = () => {
  const dispatch = useDispatch();
  const { enrollments } = useSelector((state) => state.enrollment);
  const [showModal, setShowModal] = useState(false);
  const [editEnrollment, setEditEnrollment] = useState(null);
  const [deleteEnrollmentId, setDeleteEnrollment] = useState(null);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = (enrollment) => {
    setEditEnrollment(enrollment);
  };

  const handleDelete = (enrollmentId) => {
    setDeleteEnrollment(enrollmentId);
  };

  const handleDeleteEnrollment = async () => {
    try {
      await dispatch(deleteEnrollment(deleteEnrollmentId)).unwrap();
      dispatch(fetchEnrollment());
      toast.success(APPString.tostMessage.success.deleteEnrollment);
    } catch (err) {
      toast.error(`Failed to delete enrollment: ${err.message}`);
    }
    setDeleteEnrollment(null);
  };

  useEffect(() => {
    dispatch(fetchEnrollment());
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
          Create Enrollment
        </button>
      </div>

      <AddEnrollmentModal show={showModal} onClose={handleCloseModal} />
      <EnrollmentTable
        enrollment={enrollments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {editEnrollment && (
        <EditEnrollmentPopup
          enrollment={editEnrollment}
          onClose={() => setEditEnrollment(null)}
        />
      )}
      {deleteEnrollmentId && (
        <DeleteEnrollmentModal
          onClose={() => setDeleteEnrollment(null)}
          onSubmit={handleDeleteEnrollment}
        />
      )}
    </div>
  );
};

export default EnrollmentPage;
