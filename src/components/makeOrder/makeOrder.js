import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./makeOrder.module.scss";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useLocation } from "react-router-dom";
import "../makeOrder/makeOrder.scss"
import image from "../../assets/orderPageImg.png"

const MakeOrder = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const variables = location.state;

  const [dateTimeBooking, setDateTimeBooking] = useState("");
  const [customerQuantity, setCustomerQuantity] = useState("");
  const [tablesId, setTablesId] = useState([]);

  console.log(variables);

  useEffect(() => {
    if (variables) {
      setDateTimeBooking(variables.dateTimeBooking);
      setCustomerQuantity(variables.customerQuantity);
      setTablesId(variables.tablesId);
    }
  }, [])


  const [customerFullName, setCustomerFullName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [note, setNote] = useState("");
  const toast = useRef(null);


  const show = (severity, summary, detail) => { toast.current.show({ severity: severity, summary: summary, detail: detail }); };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the request body
    const requestBody = JSON.stringify({
      dateTimeBooking: dateTimeBooking,
      customerQuantity: customerQuantity,
      note: note,
      customerFullName: customerFullName,
      customerEmail: customerEmail,
      customerPhoneNumber: customerPhoneNumber,
      tablesId: tablesId
    });
    console.log(requestBody);

    // Perform the API request
    fetch(`${apiUrl}/api/Reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        } else {
          show("error", "Ordered fail", `${response.statusText}`);
          throw new Error(
            `API request failed: ${response.status} ${response.statusText}`
          );
        }
      })
      .then((data) => {
        console.log("API response:", data);
        show(
          "success",
          `Hello ${data.data.customerFullName}, you ordered successfully!`,
          "You are directing to Order Detail"
        );
        setTimeout(() => {
          navigate("/order/success");
        }, 3000);
      })
      .catch((error) => {
        console.error("API request error:", error);
        show("error", "Ordered fail", `${error}`);
      });
  };

  return (
    <div className={styles.MakeOrder}>
      <Toast ref={toast} />
      <div className={styles.container}>
        <div className={styles.thumbnail}>
          <img className={styles.img} src={image} alt="" />
          <h1 className={styles["res-name"]}>RESTAURANT NAME</h1>
          <p className={styles["res-address"]}>Restaurant address</p>
        </div>

        <div className={styles.orderMenu}>
          <form className={styles.inputsForm} onSubmit={handleSubmit}>
            <div
              id={styles.inputGroupPersonal}
              className="input-group input-group-personal"
            >
              <label className={styles.personalInfoLabel} for="personal">
                Personal Information:
              </label>

              <div className={styles.inputTextPersonal}>
                <label className={styles.label} htmlFor="customerFullName">
                  Full Name:
                </label>
                <input
                  className={styles.underlineInput}
                  type="text"
                  id="customerFullName"
                  value={customerFullName}
                  onChange={(e) => setCustomerFullName(e.target.value)}
                  placeholder="Full Name"
                  required="true"
                />
              </div>

              <div className={styles.inputTextPersonal}>
                <label className={styles.label} htmlFor="customerFullName">
                  Email:
                </label>
                <input
                  className={styles.underlineInput}
                  type="email"
                  id="customerEmail"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Email"
                  required="true"
                />
              </div>

              <div className={styles.inputTextPersonal}>
                <label className={styles.label} htmlFor="customerFullName">
                  Phone:
                </label>
                <input
                  className={styles.underlineInput}
                  type="tel"
                  id="customerPhoneNumber"
                  value={customerPhoneNumber}
                  onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  required="true"
                />
              </div>

              <div className={styles.inputTextPersonal}>
                <label className={styles.label} htmlFor="customerFullName">
                  Note:
                </label>
                <textarea
                  className={styles.underlineNote}
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Note"
                ></textarea>
              </div>
            </div>
            <Button style={{ marginTop: "10px" }} type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

MakeOrder.propTypes = {};

MakeOrder.defaultProps = {};

export default MakeOrder;
