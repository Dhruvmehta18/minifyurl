import React from "react";
import Link from 'next/link';
import styles from "../styles/Login.module.scss"

const register = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <h1>Register now!</h1>
        <form className={styles.form}>
          <input type="text" placeholder="Name" required/>
          <input type="email" placeholder="Email" required/>
          <input type="password" placeholder="Password" required/>
        </form>
        <button type="submit" className={styles.button}>Sign Up</button>
        <p className={styles.or}>----- or -----</p>
        <div className={styles.notMember}>
          Already a user? <Link href="/login"><a className={styles.link}>Login Now</a></Link>
        </div>
      </div>
    </div>
  );
};

export default register;
