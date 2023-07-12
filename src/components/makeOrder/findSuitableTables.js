import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./makeOrder.module.scss";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import "../makeOrder/makeOrder.scss"

const MakeOrder = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [number1, setNumber1] = useState(1);
  const [number2, setNumber2] = useState(1);
  const [time, setTime] = useState("09:00 AM");
  const [date, setDate] = useState("");
  const [customerFullName, setCustomerFullName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [note, setNote] = useState("");
  const toast = useRef(null);
  const [timeArray, setTimeArray] = useState([]);
  // Format the time value to remove AM/PM and leading zero
  const formattedTime = time.replace(/[^\d:]/g, "");
  const adjustedDate = date;
  const dateTimeBooking = `${adjustedDate}T${formattedTime}`;
  const customerQuantity = number1 + number2;
  const getTime = () => {
    fetch(`${apiUrl}/api/Test/time-list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        } else {
          throw new Error(
            `API request failed: ${response.status} ${response.statusText}`
          );
        }
      })
      .then((data) => {
        console.log("getTime API response data:", data);
        setTimeArray(data);
      })
      .catch((error) => {
        console.error("getTime API request error:", error);
      });
  };

  useEffect(() => {
    getTime();
  }, []);

  const show = (severity, summary, detail) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  };

  const increment = (inputId) => {
    if (inputId === "number1") {
      setNumber1(number1 + 1);
    } else if (inputId === "number2") {
      setNumber2(number2 + 1);
    }
  };

  const decrement = (inputId) => {
    if (inputId === "number1" && number1 > 0) {
      setNumber1(number1 - 1);
    } else if (inputId === "number2" && number2 > 0) {
      setNumber2(number2 - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Format the Calendar input
    const selectedDate = new Date(date); // Convert the date string to a Date object
    const formattedDate = selectedDate.toISOString().split("T")[0]; // Format the date as desired
    console.log(formattedDate); // "2020-12-31"

    // Construct the request body
    const requestBody = JSON.stringify({
      dateTimeBooking: `${formattedDate}T${formattedTime}`,
      customerQuantity: customerQuantity
    });
    console.log(requestBody);

    // Perform the API request
    fetch(`${apiUrl}/api/Tables/find`, {
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
          <img className={styles.img} src="orderPageImg.png" alt="" />
          <h1 className={styles["res-name"]}>RESTAURANT NAME</h1>
          <p className={styles["res-address"]}>Restaurant address</p>
        </div>

        <div className={styles.orderMenu}>
          <form className={styles.inputsForm} onSubmit={handleSubmit}>
            <div
              id={styles.inputAdultQuantity}
              className="input-group input-group-quantity"
            >
              <div className={styles.inputAdults}>
                <span className={styles.adultQuantityLabel}>
                  <label for="number1">Number of Adult: </label>
                </span>
                <span className={styles.adultQuantityChangeButton}>
                  <button
                    className={styles.decrementAdult}
                    type="button"
                    onClick={() => decrement("number1")}
                  >
                    -
                  </button>
                  <input
                    className={styles.displayAdultQuantity}
                    type="number"
                    id="number1"
                    value={number1}
                    onChange={(e) => setNumber1(parseInt(e.target.value))}
                    required="true"
                  />
                  <button
                    className={styles.incrementAdult}
                    type="button"
                    onClick={() => increment("number1")}
                  >
                    +
                  </button>
                </span>
              </div>
            </div>

            <div className={styles.inputChildrenQuantity}>
              <div className={styles.inputChildren}>
                <span className={styles.childrenQuantityLabel}>
                  <label for="number2">Number of Child(ren): </label>
                </span>
                <span className={styles.childrenQuantityChangeButton}>
                  <button
                    className={styles.decrementChildren}
                    type="button"
                    onClick={() => decrement("number2")}
                  >
                    -
                  </button>{" "}
                  <input
                    className={styles.displayChildrenQuantity}
                    type="number"
                    id="number2"
                    value={number2}
                    onChange={(e) => setNumber2(parseInt(e.target.value))}
                    required="true"
                  />
                  <button
                    className={styles.incrementChildren}
                    type="button"
                    onClick={() => increment("number2")}
                  >
                    +
                  </button>
                </span>
              </div>
            </div>

            <div
              id={styles.inputGroupTime}
              className="input-group input-group-time"
            >
              <span className={styles.timeLabel}>
                <label for="time">Time: </label>
              </span>
              <Dropdown
                className={styles.dropdown}
                id="time"
                value={time}
                options={timeArray.map((time) => ({
                  label: time.slice(0, -3),
                  value: time,
                }))}
                onChange={(e) => setTime(e.value)}
                style={{ width: "120px" }}
              />
            </div>

            <div
              id={styles.inputGroupDate}
              className="input-group input-group-date"
            >
              <span className={styles.dateLabel}>
                <label for="date">Date: </label>
              </span>
              <Calendar
                id="date"
                value={date}
                onChange={(e) => setDate(e.value)}
                required
                showIcon
                style={{ width: "160px" }}
              />
            </div>

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
