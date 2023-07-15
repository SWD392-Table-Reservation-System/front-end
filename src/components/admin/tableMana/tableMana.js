import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./tableMana.module.scss";
import { Button } from "primereact/button";
import Navbar from "../../common/navbar/navbar";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const TableMana = () => {
  const [tableData, setTableData] = useState([{ code: "Table 01", status: 0 }]);

  const getTables = () => {
    const bearerToken = localStorage.getItem("token");
    axios
      .get(`${apiUrl}/api/Tables`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          console.log(res.data.data);
          setTableData(res.data.data);
        } else {
          let err = new Error(res.data.errorMessage);
          console.log(err);
          throw err;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTables();
  }, []);

  const handleClick = (label) => {
    console.log(`Button ${label} was clicked.`);
    // You can perform additional actions based on the clicked button label
  };

  const table = [];

  for (let i = 0; i < tableData.length; i++) {
    const entry = tableData[i];
    const rows = Math.ceil(tableData.length / 6); // Calculate the number of rows dynamically
    const row = [];

    for (let j = 0; j < 6; j++) { // Limit the number of columns to 6
      const index = i * 6 + j;
      if (index < tableData.length) {
        const entry = tableData[index];
        const { code, status } = entry;
        row.push(
          <td key={index}>
            <Button
              label={code}
              onClick={() => handleClick(code)}
              style={{
                backgroundColor: [
                  status === 1 ? "#FFF500" : status === 2 ? "#48EF45" : "#CD672E",
                ],
                color: "black",
                paddingLeft: "50px",
                paddingRight: "50px",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            />
          </td>
        );
      } else {
        row.push(<td key={index}></td>); // Add an empty cell if there is no data for the current index
      }
    }

    table.push(<tr key={i}>{row}</tr>);
  }

  return (
    <div className={styles.TableMana}>
      <div className={styles.displayTables}>
        <h1>Table Management</h1>

        <span className={styles.annotate}>
          <div style={{ width: 17, height: 17, background: "#CD672E", borderRadius: 9999 }} />
          <label>Empty</label>
          <div style={{ width: 17, height: 17, background: "#48EF45", borderRadius: 9999 }} />
          <label>Booking</label>
          <div style={{ width: 17, height: 17, background: "#FFF500", borderRadius: 9999 }} />
          <label>Blocked</label>
        </span>

        <span className={styles.time}>
          <div className={styles.date}>
            <div className={styles.customContainer}>
              <div className={styles.customItem}>
                <span>DD</span>
              </div>
              <div className={styles.customItem}>
                <span>MM</span>
              </div>
              <div className={styles.customItem}>
                <span>YY</span>
              </div>
            </div>
          </div>

          <div>
            <div className={styles.customContainer}>
              <div className={styles.customItem}>
                <span>HH</span>
              </div>
              <div className={styles.customItem}>
                <span>MM</span>
              </div>
              <div className={styles.customItem}>
                <span>AM</span>
              </div>
            </div>
          </div>
        </span>

        <table>
          <tbody>{table}</tbody>
        </table>
      </div>
    </div>
  );
};

TableMana.propTypes = {};

TableMana.defaultProps = {};

export default TableMana;
