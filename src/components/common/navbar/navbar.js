import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useLocation } from "react-router-dom";
import "primeicons/primeicons.css";
import styles from "./navbar.module.scss";

const apiUrl = process.env.REACT_APP_API_URL;

const Navbar = () => {
  const location = useLocation();
  const [isManager, setIsManager] = useState(false);

  const logOut = () => {
    localStorage.removeItem('token');
  }

  const fetchStaffsList = () => {
    const bearerToken = localStorage.getItem('token');
    fetch(`${apiUrl}/api/Accounts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch staffs list.');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setIsManager(true);
        } else {
          throw new Error(data.errorMessage);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchStaffsList();
  }, []);

  return (
    <div className="navbar">
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="logo" />

        <Link
          to="/admin/table-mana"
          className={`${styles.link} ${location.pathname === "/admin/table-mana" ? styles.activeLink : ""}`}>
          <i className="pi pi-table icon" style={{ marginRight: "10px" }}></i>
          Table
        </Link>

        <Link
          to="/admin/reservations"
          className={`${styles.link} ${location.pathname === "/admin/reservations" ? styles.activeLink : ""}`}>
          <i className="pi pi-list icon" style={{ marginRight: "10px" }}></i>
          Reservations
        </Link>
        {isManager ? (<Link
          to="/admin/staff-list"
          className={`${styles.link} ${location.pathname === "/admin/staff" ? styles.activeLink : ""}`}>
          <i className="pi pi-users icon" style={{ marginRight: "10px" }}></i>
          Staff
        </Link>) : (<span></span>)}

        <Link to="#" className={styles.link} onClick={logOut}>
          <i className="pi pi-power-off icon" style={{ marginRight: "10px" }}></i>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
