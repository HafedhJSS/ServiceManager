import React from "react";
import { DiTechcrunch } from "react-icons/di";
import { Link } from "react-router-dom";
import "./Home.scss";
const heroImg = process.env.PUBLIC_URL + "/inv-img.png";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between ">
        <div className="logo">
          <DiTechcrunch size={35} />{" "}
        </div>{" "}
        <ul className="home-links">
          <li>
            <button className="--btn --btn-primary">
              <Link to="/register"> Register </Link>{" "}
            </button>{" "}
          </li>{" "}
          <li>
            <button className="--btn --btn-primary">
              <Link to="/login"> Login </Link>{" "}
            </button>{" "}
          </li>{" "}
        </ul>{" "}
      </nav>{" "}
      {/* HERO SECTION */}{" "}
      <section className="container hero">
        <div className="hero-text">
          <h2> Tunisie Telecom Services Manager Solution </h2>{" "}
          <p>
            If you are looking for any IT services, Well you got us.{" "}
          </p>{" "}
        </div>{" "}
        <div className="hero-image">
          <img src={heroImg} alt="Inventory" />
        </div>{" "}
      </section>{" "}
    </div>
  );
};

export default Home;
