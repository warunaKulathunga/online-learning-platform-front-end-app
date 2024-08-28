import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createCourse } from "../../../store/reducers/courseSlice";
import { toast } from "react-toastify";

const AddEnrollmentModal = ({ show, onClose }) => {
  const dispatch = useDispatch();

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
            dispatch(createCourse(values))
              .unwrap()
              .then(() => {
                toast.success("Course added successful!");
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
                <Field name="color" as="select">
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
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
                <Field name="color" as="select">
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
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
