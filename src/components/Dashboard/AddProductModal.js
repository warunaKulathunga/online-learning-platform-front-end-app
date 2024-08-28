import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createProduct } from "../../store/reducers/productSlice";
import { toast } from "react-toastify";

const AddProductModal = ({ show, onClose }) => {
  const dispatch = useDispatch();

  if (!show) return null;

  const validationSchema = Yup.object({
    model: Yup.string().required("Model is required"),
    brand: Yup.string().required("Brand is required"),
    price: Yup.string().required("Price is required"),
    storage: Yup.string().required("Storage is required"),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-lg sm:mx-6">
        <h2 className="mb-4 text-lg font-semibold">Add New Product</h2>
        <Formik
          initialValues={{ model: "", brand: "", price: "", storage: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(createProduct(values))
              .unwrap()
              .then(() => {
                toast.success("Product added successful!");
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
                  Model
                </label>
                <Field
                  type="text"
                  name="model"
                  className="w-full p-2 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                  placeholder="Enter product model"
                />
                <ErrorMessage
                  name="model"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <Field
                  type="text"
                  name="brand"
                  className="w-full p-2 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                  placeholder="Enter brand"
                />
                <ErrorMessage
                  name="brand"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <Field
                  type="text"
                  name="price"
                  className="w-full p-2 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                  placeholder="Enter price"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Storage
                </label>
                <Field
                  type="text"
                  name="storage"
                  className="w-full p-2 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                  placeholder="Enter Storage"
                />
                <ErrorMessage
                  name="storage"
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

export default AddProductModal;
