import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const StudentTable = ({ student, onEdit, onDelete }) => {
  return (
    <div>
      <div className="max-w-[1200px] container mx-auto overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {student.map((student) => (
              <tr key={student.id}>
                <td className="px-4 py-2 text-center border-b">
                  {student._id}
                </td>
                <td className="px-4 py-2 text-center border-b">
                  {student.name}
                </td>
                <td className="px-4 py-2 text-center border-b">
                  {student.email}
                </td>
                <td className="px-4 py-2 text-center border-b">
                  <button
                    onClick={() => onEdit(student)}
                    className="mx-2 text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(student._id)}
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

export default StudentTable;
