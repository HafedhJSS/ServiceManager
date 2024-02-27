import React, { useState } from "react";
import styles from "./auth.module.scss";
import { BiLogIn } from "react-icons/bi";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const Login = () => {
  return (
    <div className={`container ${styles.auth}`}>
      {" "}
      {/*isLoading && <Loader />*/}{" "}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>{" "}
          <h2> Login </h2>
          <form onSubmit={""}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={null}
            />{" "}
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={null}
            />{" "}
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login{" "}
            </button>{" "}
          </form>{" "}
          <Link to=""> Forgot Password </Link>
          <span className={styles.register}>
            <Link to="/"> Home </Link>{" "}
            <p> &nbsp; Don 't have an account? &nbsp;</p>{" "}
            <Link to="/register"> Register </Link>{" "}
          </span>{" "}
        </div>{" "}
      </Card>{" "}
    </div>
  );
};

export default Login;
