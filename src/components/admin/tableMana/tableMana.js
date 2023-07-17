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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [formValues, setFormValues] = useState({ code: "", status: "", seatQuantity: "" });

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
                  status === 1 ? "#d8d8d8" : status === 2 ? "#48EF45" : "#CD672E",
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
    const { code, status, seatQuantity } = formValues;

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
    const { code, seatQuantity } = formValues;

    const bearerToken = localStorage.getItem('token');
    axios.post(`${apiUrl}/api/Tables`, formValues, {
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
        reject: () => {}
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

        <table>
          <tbody>{table}</tbody>
        </table>
      </div>
      {tableDetail.code === "" ? "" : (
        <div className="tableDetail" style={{ background: 'green' }}>
          <h3>Table detail</h3>
          <p>{tableDetail.code}</p>
          <p>{tableDetail.status}</p>
          <p>{tableDetail.seatQuantity}</p>
          <Button id="removeTableBtn" icon="pi pi-trash" onClick={confirmDelete}></Button>
          <Button id="editTableBtn" icon="pi pi-pencil" onClick={handleEditButtonClick}></Button>
        </div>
      )}
      <div className="newTableBtn">
        <Button id="newTableBtn" icon="pi pi-plus" onClick={handleAddButtonClick}></Button>
      </div>

      {/* Edit table dialog */}
      <Dialog visible={showDialog} onHide={handleDialogHide}>
        <form onSubmit={handleFormSubmit}>
          <div className="p-field">
            <label htmlFor="code">Code</label>
            <InputText id="code"
              value={formValues.code}
              onChange={(e) => setFormValues({ ...formValues, code: e.target.value })}
            />
          </div>
          <div className="p-field">
            <label>Status</label>
            <div>
              <label htmlFor="active" className="p-mr-2">
                <RadioButton id="active" name="status"
                  value="Active"
                  onChange={(e) => setFormValues({ ...formValues, status: e.value })}
                  checked={formValues.status === 'Active'}
                />
                <span className="p-ml-1">Active</span>
              </label>
              <label htmlFor="inactive" className="p-ml-4 p-mr-2">
                <RadioButton id="inactive" name="status"
                  value="Inactive"
                  onChange={(e) => setFormValues({ ...formValues, status: e.value })}
                  checked={formValues.status === 'Inactive'}
                />
                <span className="p-ml-1">Inactive</span>
              </label>
            </div>
          </div>
          <div className="p-field">
            <label htmlFor="seatQuantity">Seat Quantity</label>
            <InputText id="seatQuantity"
              value={formValues.seatQuantity}
              onChange={(e) => setFormValues({ ...formValues, seatQuantity: e.target.value })}
            />
          </div>
          <Button type="submit" label="Submit" />
        </form>
      </Dialog>

      {/* Add table dialog */}
      <Dialog visible={showNewDialog} onHide={handleDialogHide}>
        <form onSubmit={handleFormNewSubmit}>
          <div className="p-field">
            <label htmlFor="code">Code</label>
            <InputText id="code"
              value={formValues.code}
              onChange={(e) => setFormValues({ ...formValues, code: e.target.value })}
            />
          </div>
          <div className="p-field">
            <label htmlFor="seatQuantity">Seat Quantity</label>
            <InputText id="seatQuantity"
              value={formValues.seatQuantity}
              onChange={(e) => setFormValues({ ...formValues, seatQuantity: e.target.value })}
            />
          </div>
          <Button type="submit" label="Submit" />
        </form>
      </Dialog>

      {/* Delete table dialog */}
      <ConfirmDialog/>
    </div>
  );
};

TableMana.propTypes = {};

TableMana.defaultProps = {};

export default TableMana;
