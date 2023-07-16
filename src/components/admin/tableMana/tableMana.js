import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./tableMana.module.scss";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog"; // Import Dialog component
import Navbar from "../../common/navbar/navbar";
import { Toast } from "primereact/toast";
import axiosCustom from "../../../utils/axiosConfig";

const apiUrl = process.env.REACT_APP_API_URL;

const TableMana = () => {
  const toast = useRef(null);
  const [tableData, setTableData] = useState([{ code: "Table 01", status: 0 }]);
  const [tableDetail, setTableDetail] = useState({ code: "", status: "", seatQuantity: "" });
  const [showTableDetails, setShowTableDetails] = useState(false); // Track the visibility of the modal

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
    const bearerToken = localStorage.getItem("token");
    axiosCustom
      .get(`${apiUrl}/api/Tables/${id}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          console.log(response.data.data);
          setTableDetail(response.data.data);
          setShowTableDetails(true); // Show the modal when table details are retrieved
        }
      })
      .catch((err) => {
        console.log(err);
        toast.current.show({ severity: "error", summary: "Error", detail: "" });
      });
  };

  const handleClick = (id, label) => {
    console.log(`Button ${label} was clicked.`);
    getTableById(id);
  };

  const table = [];

  for (let i = 0; i < tableData.length; i++) {
    const row = [];

    for (let j = 0; j < 6; j++) {
      // Limit the number of columns to 6
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
        row.push(<td key={index}></td>);
      }
    }

    table.push(<tr key={i}>{row}</tr>);
  }

  const onHideTableDetails = () => {
    setShowTableDetails(false); // Hide the modal when closed
    setTableDetail({ code: "", status: "", seatQuantity: "" }); // Reset the table details
  };

  return (
    <div className={styles.TableMana}>
      <Toast ref={toast} />
      <div className={styles.displayTables}>
        <h1>Table Management</h1>
        {/* ... */}
        <table>
          <tbody>{table}</tbody>
        </table>
        <Dialog
        visible={showTableDetails}
        onHide={onHideTableDetails}
        className={styles.tableDetails}
        header="Table detail"
        modal
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
      >
        <div className={styles.dialogContent}>
          <p>
            <strong>Code:</strong> {tableDetail.code}
          </p>
          <p>
            <strong>Status:</strong> {tableDetail.status}
          </p>
          <p>
            <strong>Seat Quantity:</strong> {tableDetail.seatQuantity}
          </p>
        </div>
      </Dialog>
      </div>
    </div>
  );
};

TableMana.propTypes = {};

TableMana.defaultProps = {};

export default TableMana;
