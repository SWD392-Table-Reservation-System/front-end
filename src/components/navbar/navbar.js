import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

import "primeicons/primeicons.css";

import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <div class="navbar">
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="logo" />

        <a href="/admin/table-mana" class={styles.active}>
          <i
            class="pi pi-table icon"
            style={{
              marginRight: "10px",
            }}
          ></i>
          Table
        </a>

        <a href="/admin/reservations">
          <i
            class="pi pi-list icon"
            style={{
              marginRight: "10px",
            }}
          ></i>
          Reservations
        </a>

        <a href="#">
          <i
            class="pi pi-users icon"
            style={{
              marginRight: "10px",
            }}
          ></i>
          Staff
        </a>

        <a href="#">
          <i
            class="pi pi-power-off icon"
            style={{
              marginRight: "10px",
            }}
          ></i>
          Logout
        </a>
      </div>
    </div>
  );
};

export default Navbar;
