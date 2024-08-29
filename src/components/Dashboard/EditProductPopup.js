import React from "react";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createEnrollment } from "../../store/reducers/enrollmentSlice";

const EditProductPopup = ({ course, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg">
        <h2 className="mb-4 text-lg font-semibold">
          Are you sure you want to enroll this subject ?
        </h2>
        <Formik
          initialValues={{
            studentId: user.id,
            courseId: course._id,
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(createEnrollment(values))
              .unwrap()
              .then(() => {
                toast.success("Enrollment added successful!");
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
                  Confirm
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProductPopup;
