import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AuthenticationForm = ({ show, onClose }) => {
  if (!show) return null;
  const validationSchema = Yup.object({
    number: Yup.string().required("Model is required"),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-100">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg">
        <h2 className="mb-4 text-lg font-semibold text-center">
          Two-Factor Authentication
        </h2>
        <p className="mb-2 text-base text-center">
          Enter the 6 digit code of your authentication app
        </p>
        <Formik
          initialValues={""}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {}}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <Field
                  type="text"
                  name="model"
                  className="w-full p-2 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                  placeholder="Enter the 6 digit code"
                />
                <ErrorMessage
                  name="model"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-xs sm:text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all  py-1 sm:py-2 px-2 sm:px-4  rounded-xl bg-violet-500 text-white font-semibold w-1/2"
                >
                  Verify
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthenticationForm;
