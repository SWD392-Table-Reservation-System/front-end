import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./makeOrder.module.scss";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Link } from "react-router-dom";

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
          return response.json();
        } else {
          throw new Error(
            `API request failed: ${response.status} ${response.statusText}`
          );
        }
      })
      .then((data) => {
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
    toast.current.show({ severity, summary, detail });
  };

  const increment = (inputId) => {
    if (inputId === "number1") {
      setNumber1((prevNumber) => prevNumber + 1);
    } else if (inputId === "number2") {
      setNumber2((prevNumber) => prevNumber + 1);
    }
  };

  const decrement = (inputId) => {
    if (inputId === "number1" && number1 > 0) {
      setNumber1((prevNumber) => prevNumber - 1);
    } else if (inputId === "number2" && number2 > 0) {
      setNumber2((prevNumber) => prevNumber - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = JSON.stringify({
      dateTimeBooking: dateTimeBooking,
      customerQuantity: customerQuantity,
      note: note,
      customerFullName: customerFullName,
      customerEmail: customerEmail,
      customerPhoneNumber: customerPhoneNumber,
    });

    fetch(`${apiUrl}/api/Reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          show("error", "Order failed", `${response.statusText}`);
          throw new Error(
            `API request failed: ${response.status} ${response.statusText}`
          );
        }
      })
      .then((data) => {
        show(
          "success",
          `Hello ${data.data.customerFullName}, your order was successful!`,
          "You are being directed to the Order Detail page."
        );
        setTimeout(() => {
          navigate("/order/success");
        }, 3000);
      })
      .catch((error) => {
        console.error("API request error:", error);
        show("error", "Order failed", `${error}`);
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
                  <label htmlFor="number1">Number of Adults: </label>
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
                    id="number1"
                    type="number"
                    value={number1}
                    onChange={(e) => setNumber1(parseInt(e.target.value))}
                    required
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

              <div className={styles.inputChildrenQuantity}>
                <div className={styles.inputChildren}>
                  <span className={styles.childrenQuantityLabel}>
                    <label htmlFor="number2">Number of Children: </label>
                  </span>
                  <span className={styles.childrenQuantityChangeButton}>
                    <button
                      className={styles.decrementChildren}
                      type="button"
                      onClick={() => decrement("number2")}
                    >
                      -
                    </button>
                    <input
                      className={styles.displayChildrenQuantity}
                      id="number2"
                      type="number"
                      value={number2}
                      onChange={(e) => setNumber2(parseInt(e.target.value))}
                      required
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
            </div>

            <div
              id={styles.inputGroupTime}
              className="input-group input-group-time"
            >
              <span className={styles.timeLabel}>
                <label htmlFor="time">Time: </label>
              </span>
              <Dropdown
                className={styles.dropdown}
                id="time"
                value={time}
                options={timeArray}
                onChange={(e) => setTime(e.value)}
              />
            </div>

            <div
              id={styles.inputGroupDate}
              className="input-group input-group-date"
            >
              <span className={styles.dateLabel}>
                <label htmlFor="date">Date: </label>
              </span>
              <Calendar
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                showIcon
                style={{ width: "120px" }}
                required
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
                  class={styles.underlineInput}
                  type="text"
                  id="customerFullName"
                  value={customerFullName}
                  onChange={(e) => setCustomerFullName(e.target.value)}
                  placeholder="Abc"
                  required
                />
              </div>

              <div className={styles.inputTextPersonal}>
                <label className={styles.label} htmlFor="customerFullName">
                  Email:
                </label>
                <input
                  class={styles.underlineInput}
                  id="customerEmail"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="email@gmail.com"
                  required
                />
              </div>

              <div className={styles.inputTextPersonal}>
                <label className={styles.label} htmlFor="customerFullName">
                  Phone:
                </label>
                <input
                  class={styles.underlineInput}
                  id="customerPhoneNumber"
                  value={customerPhoneNumber}
                  onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  required
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
                />
              </div>
            </div>
            <Link to={"/order/success"}>
              <Button  style={{ marginTop: "10px" }} type="submit" label="Submit" />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

MakeOrder.propTypes = {};

MakeOrder.defaultProps = {};

export default MakeOrder;
