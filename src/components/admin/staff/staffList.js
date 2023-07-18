import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import styles from "./staffList.module.scss";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { RadioButton } from "primereact/radiobutton";

const apiUrl = process.env.REACT_APP_API_URL;

const StaffList = () => {
  const toast = useRef(null);
  const [isManager, setIsManager] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newStaff, setNewStaff] = useState({
    userName: "",
    password: "",
    fullName: "",
    role: "Staff",
  });

  const fetchStaffsList = () => {
    const bearerToken = localStorage.getItem("token");
    fetch(`${apiUrl}/api/Accounts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch staffs list.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setIsManager(true);
          setStaffs(data.data);
        } else {
          throw new Error(data.errorMessage);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteStaff = () => {
    const bearerToken = localStorage.getItem("token");
    axios
      .delete(`${apiUrl}/api/Accounts/${selectedStaff.id}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          const updatedStaffs = staffs.filter(
            (staff) => staff.id !== selectedStaff.id
          );
          setStaffs(updatedStaffs);
        } else {
          throw new Error("Failed to delete staff.");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSelectedStaff(null);
        setShowConfirmDialog(false);
      });
  };

  const confirmDelete = (staff) => {
    setSelectedStaff(staff);
    setShowConfirmDialog(true);
  };

  const handleAddButtonClick = () => {
    setShowNewDialog(true);
  };

  const handleDialogHide = () => {
    setShowNewDialog(false);
  };

  const handleFormNewSubmit = (e) => {
    e.preventDefault();
    const { userName, password, fullName, role } = newStaff;
    const bearerToken = localStorage.getItem("token");
    axios
      .post(`${apiUrl}/api/Accounts`, newStaff, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.current.show({
            severity: "success",
            summary: "Add successfully",
            detail: "",
          });
          fetchStaffsList();
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: response.data.errorMessage,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        let message = err.response.data.errorMessage;
        toast.current.show({
          severity: "error",
          summary: "Some error occured!",
          detail: message,
        });
      });

    setShowNewDialog(false);
  };

  const getOrdinal = (number) => {
    const remainder = number % 100;

    return (
      number 
    );
  };

  useEffect(() => {
    fetchStaffsList();
  }, []);

  return (
    <div className={styles.container}>
      {isManager === true ? (
        <div>
          <div className={styles.staffList}>
            <Toast ref={toast} />
            <h1>Staff list</h1>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Ordinal Number</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {staffs.map((staff, index) => {
                  const ordinalNumber = index + 1;
                  return (
                    <tr className={styles.row} key={staff.id} title="Detail">
                      <td>{getOrdinal(ordinalNumber)}</td>
                      <td>{staff.fullName}</td>
                      <td>{staff.userName}</td>
                      <td>{staff.role}</td>
                      <td>
                        <Button
                          icon="pi pi-trash"
                          className={`${styles.deleteButton} p-button-danger`}
                          onClick={() => confirmDelete(staff)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="newTableBtn" style={{ marginTop: "50px" }}>
            <Button
              id="newTableBtn"
              icon="pi pi-plus"
              onClick={handleAddButtonClick}
              label="Create new Account"
              style={{ background: "#cd672e" }}
            ></Button>
          </div>

          <Dialog visible={showNewDialog} onHide={handleDialogHide}>
            <form onSubmit={handleFormNewSubmit}>
              <div className="p-field">
                <label htmlFor="userName">Username</label>
                <InputText
                  id="userName"
                  value={newStaff.userName}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, userName: e.target.value })
                  }
                />
              </div>
              <div className="p-field">
                <label htmlFor="password">Password</label>
                <InputText
                  id="password"
                  value={newStaff.password}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, password: e.target.value })
                  }
                />
              </div>
              <div className="p-field">
                <label htmlFor="fullName">Full Name</label>
                <InputText
                  id="fullName"
                  value={newStaff.fullName}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, fullName: e.target.value })
                  }
                />
              </div>
              <div className="p-field">
                <label htmlFor="role">Role</label>
                <div>
                  <RadioButton
                    inputId="roleStaff"
                    name="role"
                    value="Staff"
                    checked={newStaff.role === "Staff"}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, role: e.value })
                    }
                  />
                  <label htmlFor="roleStaff" className="p-radiobutton-label">
                    Staff
                  </label>
                </div>
                <div>
                  <RadioButton
                    inputId="roleManager"
                    name="role"
                    value="Manager"
                    checked={newStaff.role === "Manager"}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, role: e.value })
                    }
                  />
                  <label htmlFor="roleManager" className="p-radiobutton-label">
                    Manager
                  </label>
                </div>
              </div>
              <Button type="submit" label="Submit" />
            </form>
          </Dialog>

          <ConfirmDialog
            visible={showConfirmDialog}
            onHide={() => setShowConfirmDialog(false)}
            message="Are you sure you want to delete this staff member?"
            header="Confirmation"
            icon="pi pi-exclamation-triangle"
            acceptLabel="Yes"
            rejectLabel="No"
            accept={() => deleteStaff()}
          />
        </div>
      ) : (
        <div>
          <h3>Only manager can access this page!</h3>
        </div>
      )}
    </div>
  );
};

export default StaffList;
