import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./tableMana.module.scss";
import { Button } from "primereact/button";
import Navbar from "../../common/navbar/navbar";
import { Toast } from 'primereact/toast';
import axiosCustom from '../../../utils/axiosConfig'


const apiUrl = process.env.REACT_APP_API_URL;

const TableMana = () => {
  const toast = useRef(null);
  const [tableData, setTableData] = useState([{ code: "Table 01", status: 0 }]);
  const [tableDetail, setTableDetail] = useState({ code: "", status: "", seatQuantity: "" });

  const getTables = () => {
    const bearerToken = localStorage.getItem("token");
    axiosCustom
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

  const getTableById = (id) => {
    const bearerToken = localStorage.getItem('token');
    axiosCustom.get(`${apiUrl}/api/Tables/${id}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      }
    })
      .then(response => {
        console.log(response);
        if (response.data.success) {
          console.log(response.data.data);
          setTableDetail(response.data.data);
        }
      })
      .catch(err => {
        console.log(err);
        toast.current.show({ severity: 'error', summary: 'Error', detail: '' });
      });
  }

  const handleClick = (id, label) => {
    console.log(`Button ${label} was clicked.`);
    getTableById(id);
  };

  const table = [];

  for (let i = 0; i < tableData.length; i++) {
    const row = [];

    for (let j = 0; j < 6; j++) { // Limit the number of columns to 6
      const index = i * 6 + j;
      if (index < tableData.length) {
        const entry = tableData[index];
        const { id, status, code } = entry;
        row.push(
          <td key={index}>
            <Button
              label={code}
              onClick={() => handleClick(id, code)}
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
      <Toast ref={toast} />
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
      {tableDetail.code === "" ? "" : (
        <div className="tableDetail" >
          <h3>Table detail</h3>
          <p>{tableDetail.code}</p>
          <p>{tableDetail.status}</p>
          <p>{tableDetail.seatQuantity}</p>
        </div>
      )}

    </div>
  );
};

TableMana.propTypes = {};

TableMana.defaultProps = {};

export default TableMana;
