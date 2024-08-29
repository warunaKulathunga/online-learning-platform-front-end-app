import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const EnrollmentTable = ({ enrollment, onEdit, onDelete }) => {
  return (
    <div>
      <div className="max-w-[1200px] container mx-auto overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Student</th>
              <th className="px-4 py-2 border-b">Course</th>
            </tr>
          </thead>
          <tbody>
            {enrollment.map((enrollment) => (
              <tr key={enrollment._id}>
                <td className="px-4 py-2 text-center border-b">
                  {enrollment._id}
                </td>
                <td className="px-4 py-2 text-center border-b">
                  {enrollment.student_id.name}
                </td>
                <td className="px-4 py-2 text-center border-b">
                  {enrollment.course_id.title}
                </td>
                <td className="px-4 py-2 text-center border-b">
                  <button
                    onClick={() => onEdit(enrollment)}
                    className="mx-2 text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(enrollment._id)}
                    className="mx-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollmentTable;
