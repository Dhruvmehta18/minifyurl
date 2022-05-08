import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/dist/client/router";
import FormWithLabel from "../component/FormWithLabel";
import InputWithError from "../component/InputWithError";
import styles from "../styles/Login.module.scss";
import {login} from '../lib/slices/auth'

const loginSchema = yup.object({
  email: yup.string().email("Provide correct e-mail").required("Required"),
  password: yup.string().required("Required"),
});

const initialValues = {
  email: "",
  password: "",
};

const loginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formik = useFormik({
    validationSchema: loginSchema,
    initialValues,
    onSubmit: async (values) => {
      await dispatch(login(values));
      router.push("/");
    },
  });
  return (
    <div>
      <div className={styles.wrapper}>
        <FormWithLabel
          onSubmit={formik.handleSubmit}
          topText="Sign In"
          buttonText="Sign In"
          redirectText="Register Now"
          onRedirect="/register"
          redirectCtaText={"Not a user?"}
        >
          <InputWithError
            type="email"
            label="email"
            name="email"
            formik={formik}
          />
          <InputWithError
            type="password"
            label="password"
            name="password"
            formik={formik}
          />
          <p className={styles.recover}>
            <a className={styles.link} href="#">
              Forgot Password?
            </a>
          </p>
        </FormWithLabel>
      </div>
    </div>
  );
};

export default loginPage;
