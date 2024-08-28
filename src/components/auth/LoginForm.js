import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { fetchCurrentUser, loginUser } from "../../store/reducers/authSlice";
import { toast } from "react-toastify";
import APPString from "./../../APPString";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(APPString.validation.email.invalid)
      .required(APPString.validation.email.required),
    password: Yup.string()
      .min(6, APPString.validation.password.minLength)
      .required(APPString.validation.password.required),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(loginUser(values))
          .unwrap()
          .then(() => {
            dispatch(fetchCurrentUser())
              .unwrap()
              .then((user) => {
                toast.success("User login successful!");
                if (user.role === "admin") {
                  navigate("/admin");
                } else {
                  navigate("/dashboard");
                }
              })
              .catch((error) => {
                toast.error(error.message);
              });
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
        <Form className="px-10 py-20 bg-white border-2 rounded-3xl border-gray-50">
          <h1 className="text-3xl font-semibold">{APPString.login.title}</h1>
          <p className="mt-3 text-lg font-medium text-gray-500">
            {APPString.login.subTitle}
          </p>
          <div className="mt-5">
            <div>
              <label className="text-sm font-medium">
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
                className="text-sm text-red-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium">
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
                className="text-sm text-red-500"
              />
            </div>
            <div className="flex flex-col mt-8 gap-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-violet-500 text-white text-base font-bold"
              >
                {APPString.button.signIn}
              </button>
            </div>
            <div className="flex items-center justify-center mt-8">
              <p className="text-base font-medium">
                {APPString.login.footerTitle}
              </p>
              <button
                onClick={() => {
                  navigate("/register");
                }}
                className="ml-2 text-base font-medium text-violet-500"
              >
                {APPString.button.signUp}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
