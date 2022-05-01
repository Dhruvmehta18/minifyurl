import React from "react";
import styles from "../../styles/component/InputWithError.module.scss";

const InputWithError = ({
  type,
  label,
  formik: { values, errors, touched, handleChange },
  name,
  onChange = handleChange,
  ...rest
}) => (
  <div className={styles.inputWrapper}>
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        value={values[name]}
        onChange={onChange}
        name={name}
        className={styles.input}
        {...rest}
      />
      <p className={styles.inputError}>{touched[name] && errors[name]}</p>
    </div>
  </div>
);

export default InputWithError;
