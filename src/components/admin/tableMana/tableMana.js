import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./tableMana.module.scss";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from 'primereact/toast';
import axiosCustom from '../../../utils/axiosConfig'
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { RadioButton } from 'primereact/radiobutton';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const apiUrl = process.env.REACT_APP_API_URL;

const TableMana = () => {
  const toast = useRef(null);
  const [tableData, setTableData] = useState([{ code: "Table 01", status: 0 }]);
  const [tableDetail, setTableDetail] = useState({ id: "", code: "", status: "", seatQuantity: "" });
  const [showDialog, setShowDialog] = useState(false);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [formValues, setFormValues] = useState({ code: "", status: "", seatQuantity: "" });
  const [formNewValues, setFormNewValues] = useState({ code: "", status: "", seatQuantity: "" });

  //Get tables data
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

  //Get a table detail
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
          setFormValues({
            code: response.data.data.code,
            seatQuantity: response.data.data.seatQuantity,
            status: response.data.data.status
          })
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

  // Calculate column
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
                  status === 'Inactive' ? "#d8d8d8" : "#CD672E",
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

  const handleEditButtonClick = () => {
    setShowDialog(true);
  };

  const handleAddButtonClick = () => {
    setTableDetail({ id: "", code: "", status: "", seatQuantity: "" })
    setShowNewDialog(true);
  };

  const handleDialogHide = () => {
    setShowDialog(false);
    setShowNewDialog(false);
  };

  //Handle form submit for Edit a table
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary form validation

    // Access the form input values from the formValues state variable
    const bearerToken = localStorage.getItem('token');
    axios.put(`${apiUrl}/api/Tables/${tableDetail.id}`, formValues, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      }
    })
      .then(response => {
        console.log(response);
        if (response.status === 204) {
          toast.current.show({ severity: 'success', summary: 'Update successfully', detail: '' });
          getTableById(tableDetail.id)
        } else {
          toast.current.show({ severity: 'error', summary: 'Error', detail: response.data.errorMessage });
        }
      })
      .catch(err => {
        console.log(err);
        toast.current.show({ severity: 'error', summary: 'Some error occured!', detail: 'Try again or Refresh the page' });
      });


    // Close the dialog
    setShowDialog(false);
  };

  //Handle form submit for Add a table
  const handleFormNewSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary form validation

    // Access the form input values from the formValues state variable
    const bearerToken = localStorage.getItem('token');
    axios.post(`${apiUrl}/api/Tables`, formNewValues, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      }
    })
      .then(response => {
        console.log(response);
        if (response.status === 201) {
          toast.current.show({ severity: 'success', summary: 'Add successfully', detail: '' });
          getTables();
        } else {
          toast.current.show({ severity: 'error', summary: 'Error', detail: response.data.errorMessage });
        }
      })
      .catch(err => {
        console.log(err);
        toast.current.show({ severity: 'error', summary: 'Some error occured!', detail: 'Try again or Refresh the page' });
      });


    // Close the dialog
    setShowNewDialog(false);
  }

  //Handle function for Delete a table
  const deleteTable = () => {
    const bearerToken = localStorage.getItem('token');
    axios.delete(`${apiUrl}/api/Tables/${tableDetail.id}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      }
    })
      .then(response => {
        console.log(response);
        if (response.status === 204) {
          toast.current.show({ severity: 'success', summary: 'Delete successfully', detail: '' });
          // Perform any additional actions after successful deletion
          setTableDetail({ id: "", code: "", status: "", seatQuantity: "" })
          getTables();
        } else {
          toast.current.show({ severity: 'error', summary: 'Error', detail: response.data.errorMessage });
        }
      })
      .catch(err => {
        console.log(err);
        toast.current.show({ severity: 'error', summary: 'Some error occurred!', detail: 'Try again or Refresh the page' });
      });
  }
  const confirmDelete = () => {
    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deleteTable(),
      reject: () => { }
    });
  }


  return (
    <div className={styles.TableMana}>
      <Toast ref={toast} />
      <div className={styles.displayTables}>
        <h1>Table Management</h1>

        <span className={styles.annotate}>
          <div style={{ width: 17, height: 17, background: "#CD672E", borderRadius: 9999 }} />
          <label>Active</label>
          <div style={{ width: 17, height: 17, background: "#d8d8d8", borderRadius: 9999 }} />
          <label>In-active</label>
        </span>
        <div className={styles.table}>
          <div className={styles.newTableBtn}>
            <Button id="newTableBtn" icon="pi pi-plus" label="Add new Table"
              onClick={handleAddButtonClick} style={{ background: "#cd672e" }}></Button>
          </div>
          <table>
            <tbody>{table}</tbody>
          </table>
        </div>
      </div>

      {/* Display table detail */}
      {tableDetail.code === "" ? "" : (
        <div className={styles.tableDetail}>
          <h3>Table detail</h3>
          <div className={styles.tableInfo}>
            <div className={styles.tableData}>
              <p><strong>ID: </strong>{tableDetail.code}</p>
              <p><strong>Status: </strong>{tableDetail.status}</p>
              <p><strong>Quantity: </strong>{tableDetail.seatQuantity}</p>
            </div>
            <div className={styles.tableUpdate}>
              <Button id="removeTableBtn" icon="pi pi-trash" onClick={confirmDelete}></Button>
              <Button id="editTableBtn" icon="pi pi-pencil" onClick={handleEditButtonClick}></Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit table dialog */}
      <Dialog className={styles.Dialog} visible={showDialog} onHide={handleDialogHide}>
        <h1 style={{ marginBottom: "50px" }}>Table Detail</h1>
        <form onSubmit={handleFormSubmit}>
          <div id={styles.inputTableDetail} className="p-field">
            <label className={styles.label}
            style={{
              marginRight: "10px",
              fontSize: "15px",
              paddingRight: "10px",
              textAlign: "left",
              width: "30%"}} 
            htmlFor="code"><strong>Code</strong></label>
            <input
              className={styles.underlineInput}
              id="code"
              value={formValues.code}
              onChange={(e) => setFormValues({ ...formValues, code: e.target.value })}
              style={{
                border: "1px solid #000",
                borderRadius: "5px",
                marginLeft: "60px",
                padding: "5px",
                fontSize: "15px",
                height: "30px",
                width: "300px"}}
            />
          </div>
          <div style={{display: "flex", flexDirection: "row", marginTop: "10px"}} className="p-field">
            <label className={styles.label}
            style={{
              marginRight: "10px",
              fontSize: "15px",
              paddingRight: "10px",
              textAlign: "left",
              width: "30%"}} 
              ><strong>Status</strong></label>
            <div className={styles.underlineInput}>
              <label htmlFor="active" className="p-mr-2">
                <RadioButton id="active" name="status"
                  value="Active"
                  onChange={(e) => setFormValues({ ...formValues, status: e.value })}
                  checked={formValues.status === 'Active'}
                />
                <span className="p-ml-1" style={{ marginLeft: "5px" }}>Active</span>
              </label>
              <label htmlFor="inactive" className="p-ml-4 p-mr-2" style={{ marginLeft: "50px" }}>
                <RadioButton id="inactive" name="status"
                  value="Inactive"
                  onChange={(e) => setFormValues({ ...formValues, status: e.value })}
                  checked={formValues.status === 'Inactive'}
                />
                <span className="p-ml-1" style={{ marginLeft: "5px" }}>Inactive</span>
              </label>
            </div>
          </div>
          <div id={styles.inputTableDetail} style={{ marginTop: "10px"}} className="p-field">
            <label className={styles.label}
            style={{
              marginRight: "10px",
              fontSize: "15px",
              paddingRight: "10px",
              textAlign: "left",
              width: "30%"}} 
            htmlFor="seatQuantity"><strong>Seat Quantity</strong></label>
            <input
              className={styles.underlineInput}
              id="seatQuantity"
              value={formValues.seatQuantity}
              onChange={(e) => setFormValues({ ...formValues, seatQuantity: e.target.value })}
              style={{
                border: "1px solid #000",
                borderRadius: "5px",
                padding: "5px",
                fontSize: "15px",
                height: "30px",
                width: "300px"}}
            />
          </div>
          <Button style={{ marginTop: "50px", marginLeft: "170px", background: "#cd672e" }} type="submit" label="Submit" />
        </form>
      </Dialog>

      {/* Add table dialog */}
      <Dialog className={styles.Dialog} visible={showNewDialog} onHide={handleDialogHide}>
        <h1 style={{ marginBottom: "50px" }}>Table Detail</h1>
        <form onSubmit={handleFormNewSubmit}>
          <div id={styles.inputTableDetail} className="p-field">
            <label className={styles.label} 
            style={{
              marginRight: "10px",
              fontSize: "15px",
              paddingRight: "10px",
              textAlign: "left",
              width: "30%"}} 
            htmlFor="code"><strong>Code</strong></label>
            <input
              className={styles.underlineInput}
              id="code"
              value={formNewValues.code}
              onChange={(e) => setFormNewValues({ ...formNewValues, code: e.target.value })}
              style={{
                border: "1px solid #000",
                borderRadius: "5px",
                marginLeft: "60px",
                padding: "5px",
                fontSize: "15px",
                height: "30px",
                width: "300px"}}
            />
          </div>
          <div id={styles.inputTableDetail} style={{marginTop: "10px"}} className="p-field">
            <label className={styles.label}
            style={{
              marginRight: "10px",
              fontSize: "15px",
              paddingRight: "10px",
              textAlign: "left",
              width: "30%"}} 
            htmlFor="seatQuantity"><strong>Seat Quantity</strong></label>
            <input
              className={styles.underlineInput}
              id="seatQuantity"
              value={formNewValues.seatQuantity}
              onChange={(e) => setFormNewValues({ ...formNewValues, seatQuantity: e.target.value })}
              style={{
                border: "1px solid #000",
                borderRadius: "5px",
                padding: "5px",
                fontSize: "15px",
                height: "30px",
                width: "300px"}}
            />
          </div>
          <Button style={{ marginTop: "50px", marginLeft: "170px", background: "#cd672e" }} type="submit" label="Submit" />
        </form>
      </Dialog>

      {/* Delete table dialog */}
      <ConfirmDialog />
    </div>
  );
};

TableMana.propTypes = {};

TableMana.defaultProps = {};

export default TableMana;
