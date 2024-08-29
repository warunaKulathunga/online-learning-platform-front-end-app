import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  updateCourse,
} from "../../../store/reducers/courseSlice";
import { fetchStudents } from "../../../store/reducers/studentSlice";
import {
  fetchEnrollment,
  updateEnrollment,
} from "../../../store/reducers/enrollmentSlice";

const EditEnrollmentPopup = ({ enrollment, onClose }) => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchStudents());
  }, []);

  console.log(enrollment, "edit enrollments");

  const validationSchema = Yup.object({
    studentId: Yup.string().required("Title is required"),
    courseId: Yup.string().required("Description is required"),
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg">
        <h2 className="mb-4 text-lg font-semibold">Edit Enrollment</h2>
        <Formik
          initialValues={{
            ...enrollment,
            studentId: enrollment.student_id._id,
            courseId: enrollment.course_id._id,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(updateEnrollment(values))
              .unwrap()
              .then(() => {
                toast.success("Enrollment updated successfully!");
                setSubmitting(false);
                dispatch(fetchEnrollment());
                onClose();
              })
              .catch((error) => {
                toast.error(error.message);
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Student
                </label>
                <Field
                  name="studentId"
                  as="select"
                  className="w-full p-2 mt-2 border rounded"
                >
                  {students.map((student) => {
                    return <option value={student._id}>{student.name}</option>;
                  })}
                </Field>
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Course
                </label>
                <Field
                  name="courseId"
                  as="select"
                  className="w-full p-2 mt-2 border rounded"
                >
                  {courses.map((course) => {
                    return <option value={course._id}>{course.title}</option>;
                  })}
                </Field>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs sm:text-sm  py-1 sm:py-2 px-2 sm:px-4  font-semibold rounded-xl border-2 border-gray-300 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-xs sm:text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all  py-1 sm:py-2 px-2 sm:px-4  rounded-xl bg-violet-500 text-white font-semibold"
                >
                  Update
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditEnrollmentPopup;
