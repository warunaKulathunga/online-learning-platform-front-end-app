import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../store/reducers/courseSlice";
import { toast } from "react-toastify";
import { fetchStudents } from "../../../store/reducers/studentSlice";
import {
  createEnrollment,
  fetchEnrollment,
} from "../../../store/reducers/enrollmentSlice";

const AddEnrollmentModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchStudents());
  }, []);

  if (!show) return null;

  const validationSchema = Yup.object({
    studentId: Yup.string().required("Title is required"),
    courseId: Yup.string().required("Description is required"),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-lg sm:mx-6">
        <h2 className="mb-4 text-lg font-semibold">Add New Enrollment</h2>
        <Formik
          initialValues={{
            studentId: "",
            courseId: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(createEnrollment(values))
              .unwrap()
              .then(() => {
                toast.success("Enrollment added successful!");
                dispatch(fetchEnrollment());
                setSubmitting(false);
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
              <div className="flex justify-end gap-2 mt-7">
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
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddEnrollmentModal;
