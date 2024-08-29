import React from "react";

const ProductTable = ({ course, onEdit }) => {
  return (
    <div>
      <div className="max-w-[1200px] container mx-auto overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Duration</th>
              <th className="px-4 py-2 border-b">Instructor</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {course.map((course) => (
              <tr key={course.id}>
                <td className="px-4 py-2 text-center border-b">{course._id}</td>
                <td className="px-4 py-2 text-center border-b">
                  {course.title}
                </td>
                <td className="px-4 py-2 text-center border-b">
                  {course.description}
                </td>
                <td className="px-4 py-2 text-center border-b">
                  {course.duration}
                </td>
                <td className="px-4 py-2 text-center border-b">
                  {course.instructor}
                </td>
                <td className="px-4 py-2 text-center border-b">
                  <button
                    onClick={() => onEdit(course)}
                    className="mx-2 text-blue-500 hover:text-blue-700"
                  >
                    Enroll
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

export default ProductTable;
