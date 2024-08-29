import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import APPString from "./../../../APPString";
import { registerUser } from "../../../store/reducers/authSlice";

const CreateUserModal = ({ show, onClose }) => {
  const dispatch = useDispatch();

  if (!show) return null;

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(APPString.validation.name.required)
      .min(2, APPString.validation.name.minLength)
      .max(50, APPString.validation.name.maxLength),
    email: Yup.string()
      .email(APPString.validation.email.invalid)
      .required(APPString.validation.email.required),
    password: Yup.string()
      .min(6, APPString.validation.password.minLength)
      .required(APPString.validation.password.required),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-lg sm:mx-6">
        <h2 className="mb-4 text-lg font-semibold">Add New Student</h2>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(registerUser(values))
              .unwrap()
              .then(() => {
                toast.success("Registration successful!");
              })
              .catch((error) => {
                toast.error(error.message);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  {APPString.inputLabel.name}
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full p-2 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  {APPString.inputLabel.email}
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  {APPString.inputLabel.password}
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-600"
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

export default CreateUserModal;
