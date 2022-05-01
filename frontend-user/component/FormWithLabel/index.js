import React from "react";
import Link from "next/link";
import styles from "../../styles/component/FormWithLabel.module.scss";

const FormWithLabel = ({
  children,
  onSubmit,
  topText,
  buttonText,
  onRedirect,
  redirectText,
  redirectCtaText,
}) => {
  return (
    <>
      <h1>{topText}</h1>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {children}
        <button type="submit" className={styles.button}>
          {buttonText}
        </button>
      </form>
      <p className={[styles.or, styles.para].join(" ")}>----- or -----</p>
      <div className={styles.notMember}>
        {redirectCtaText}{" "}
        <Link className={styles.link} href={onRedirect}>
          {redirectText}
        </Link>
      </div>
    </>
  );
};

export default FormWithLabel;
