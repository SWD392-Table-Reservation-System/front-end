import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useLocation } from "react-router-dom";
import "primeicons/primeicons.css";
import styles from "./navbar.module.scss";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="logo" />

        <Link
          to="/admin/table-mana"
          className={`${styles.link} ${
            location.pathname === "/admin/table-mana" ? styles.activeLink : ""
          }`}
        >
          <i
            className="pi pi-table icon"
            style={{
              marginRight: "10px",
            }}
          ></i>
          Table
        </Link>

        <Link
          to="/admin/reservations"
          className={`${styles.link} ${
            location.pathname === "/admin/reservations" ? styles.activeLink : ""
          }`}
        >
          <i
            className="pi pi-list icon"
            style={{
              marginRight: "10px",
            }}
          ></i>
          Reservations
        </Link>

        <Link
          to="#"
          className={`${styles.link} ${
            location.pathname === "/admin/staff" ? styles.activeLink : ""
          }`}
        >
          <i
            className="pi pi-users icon"
            style={{
              marginRight: "10px",
            }}
          ></i>
          Staff
        </Link>

        <Link to="#" className={styles.link}>
          <i
            className="pi pi-power-off icon"
            style={{
              marginRight: "10px",
            }}
          ></i>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
