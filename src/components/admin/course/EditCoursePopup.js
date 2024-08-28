import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  fetchCourses,
  updateCourse,
} from "../../../store/reducers/courseSlice";

const EditCoursePopup = ({ course, onClose }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    duration: Yup.string().required("Duration is required"),
    instructor: Yup.string().required("Instructor is required"),
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg">
        <h2 className="mb-4 text-lg font-semibold">Edit Course</h2>
        <Formik
          initialValues={course}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(updateCourse(values))
              .unwrap()
              .then(() => {
                toast.success("Course updated successfully!");
                setSubmitting(false);
                dispatch(fetchCourses());
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
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  className="w-full p-2 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                  placeholder="Enter course title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Field
                  type="text"
                  name="description"
                  className="w-full p-2 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                  placeholder="Enter description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <Field
                  type="text"
                  name="duration"
                  className="w-full p-2 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                  placeholder="Enter duration"
                />
                <ErrorMessage
                  name="duration"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Instructor
                </label>
                <Field
                  type="text"
                  name="instructor"
                  className="w-full p-2 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                  placeholder="Enter instructor"
                />
                <ErrorMessage
                  name="instructor"
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

export default EditCoursePopup;
