import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/dist/client/router";
import FormWithLabel from "../component/FormWithLabel";
import InputWithError from "../component/InputWithError";
import styles from "../styles/Login.module.scss";
import { register } from "../lib/slices/auth";
import Head from "next/head";

const registerSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email("Provide correct e-mail").required("Required"),
  password: yup.string().required("Required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const registerPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formik = useFormik({
    validationSchema: registerSchema,
    initialValues,
    onSubmit: async (values) => {
      dispatch(register(values));
      router.push("/");
    },
  });
  return (
    <div>
      <Head>
        <title>Minify | Register</title>
      </Head>
      <div className={styles.wrapper}>
        <FormWithLabel
          onSubmit={formik.handleSubmit}
          topText="Sign Up"
          buttonText="Sign Up"
          redirectText="Log in"
          onRedirect="/login"
          redirectCtaText={"Already a user?"}
        >
          <InputWithError
            type="text"
            label="name"
            name="name"
            formik={formik}
          />
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
        </FormWithLabel>
      </div>
    </div>
  );
};

export default registerPage;
