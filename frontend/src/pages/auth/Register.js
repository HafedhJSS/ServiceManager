import React, { useState } from "react";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const Register = () => {
  return (
    <div className={`container ${styles.auth}`}>
      {/*isLoading && <Loader />*/}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={135} color="#999" />
          </div>
          <h2>Register</h2>

          <form onSubmit={""}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={null}
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={null}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={null}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="password2"
              value={null}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>

          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> &nbsp; Already have an account? &nbsp;</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
