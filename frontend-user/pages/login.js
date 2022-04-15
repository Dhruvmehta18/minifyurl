import React from "react";
import Link from 'next/link';
import styles from "../styles/Login.module.scss"

const login = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <h1>Hello Again!</h1>
        <form className={styles.form}>
          <input type="email" placeholder="Email" required/>
          <input type="password" placeholder="Password" required/>
          <p className={styles.recover}>
            <a className={styles.link} href="#">Recover Password</a>
          </p>
        </form>
        <button type="submit" className={styles.button}>Sign in</button>
        <p className={styles.or}>----- or -----</p>
        <div className={styles.notMember}>
          Not a member? <Link className={styles.link} href="/register">Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default login;
