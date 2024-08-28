import React, { useEffect, useState } from "react";
import StudentTable from "../components/admin/student/StudentTable";
import Navbar from "../components/Dashboard/Navbar";
import { deleteStudent, fetchStudents } from "../store/reducers/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateUserModal from "../components/admin/student/CreateUserModel";
import EditStudentPopup from "../components/admin/student/EditStudentPopup";
import DeleteStudentModal from "../components/admin/student/DeleteStudentModal";
import { toast } from "react-toastify";
import APPString from "../APPString";

const StudentPage = () => {
  const dispatch = useDispatch();
  const { students, status, error } = useSelector((state) => state.students);
  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudentId, setDeleteStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = (student) => {
    setEditStudent(student);
  };

  const handleDelete = (studentId) => {
    setIsModalVisible(true);
    setDeleteStudent(studentId);
  };

  const handleDeleteStudent = async () => {
    try {
      await dispatch(deleteStudent(deleteStudentId)).unwrap();
      dispatch(fetchStudents());
      toast.success(APPString.tostMessage.success.studentDeleteSuccess);
    } catch (err) {
      toast.error(`Failed to delete student: ${err.message}`);
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(fetchStudents());
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
          Register Student
        </button>
      </div>
      <CreateUserModal show={showModal} onClose={handleCloseModal} />
      <StudentTable
        student={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {editStudent && (
        <EditStudentPopup
          student={editStudent}
          onClose={() => setEditStudent(null)}
        />
      )}
      {deleteStudentId && (
        <DeleteStudentModal
          show={isModalVisible}
          onClose={() => setDeleteStudent(null)}
          onSubmit={handleDeleteStudent}
        />
      )}
    </div>
  );
};

export default StudentPage;
