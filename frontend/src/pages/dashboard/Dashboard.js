import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { selectName, SET_LOGIN } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import axios from "axios";
const heroImg = process.env.PUBLIC_URL + "/inv-img.png";
const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [stats, setstats] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:5000/requests");
      if (response) {
        setstats([...response.data.requests]);
      }
    })();
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <section className="container hero">
        <div className="hero-text">
          <h2 style={{ color: "black", marginTop: "10" }}>
             Service Management Statistics
          </h2>
          <br></br>
          <br></br>
          <br></br>
          <p style={{ color: "black" }}>
            Inventory system to control and manage proucts in the warehouse in
            real timeand integrated to make it easier to develop your business.
          </p>
          <div className="hero-buttons">
            <button
              style={{ color: "black" }}
              className="--btn --btn-secondary"
            >
              <Link to="/dashboard">Free Trial 1 Month</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText
              num={stats.filter((el) => el.type === "VM").length}
              text="VM"
            />
            <NumberText
              num={stats.filter((el) => el.type === "AccessPoint").length}
              text="AccessPoint"
            />
            <NumberText
              num={stats.filter((el) => el.type === "VPN").length}
              text="VPN"
            />
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Inventory" />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

const NumberText = ({ num, text }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <h3 className="--color-black">{num}</h3>
      <p className="--color-black">{text}</p>
    </div>
  );
};
