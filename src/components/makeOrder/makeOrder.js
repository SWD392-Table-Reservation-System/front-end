import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./makeOrder.module.scss";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

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
    // Construct the request body
    const requestBody = JSON.stringify({
      dateTimeBooking: dateTimeBooking,
      customerQuantity: customerQuantity,
      note: note,
      customerFullName: customerFullName,
      customerEmail: customerEmail,
      customerPhoneNumber: customerPhoneNumber,
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
      <div className={styles["container"]}>
        <div className={styles["thumbnail"]}>
          <img className={styles["img"]} src="orderPageImg.png" alt="" />
          <h1 className={styles["res-name"]}>RESTAURANT NAME</h1>
          <p className={styles["res-address"]}>Restaurant address</p>
        </div>

        <div className={styles["order-menu"]}>
          <form className={styles["inputs-form"]} onSubmit={handleSubmit}>
            <div className={styles["input-adult-quantity"]}>
              <div className={styles["input-adults"]}>
                <span className={styles["adult-quantity-label"]}>
                  <label for="number1">Number of Adult: </label>
                </span>
                <span className={styles["adult-quantity-change-btn"]}>
                  <button
                    className={styles["decrement-adult"]}
                    type="button"
                    onClick={() => decrement("number1")}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className={styles["display-adult-quantity"]}
                    id="number1"
                    value={number1}
                    onChange={(e) => setNumber1(parseInt(e.target.value))}
                    required="true"
                  />
                  <button
                    className={styles["increment-adult"]}
                    type="button"
                    onClick={() => increment("number1")}
                  >
                    +
                  </button>
                </span>
              </div>

              <div className={styles["input-children-quantity"]}>
                <div className={styles["input-children"]}>
                  <span className={styles["children-quantity-label"]}>
                    <label for="number2">Number of Child(ren): </label>
                  </span>
                  <span className={styles["children-quantity-change-btn"]}>
                    <button
                      className={styles["decrement-children"]}
                      type="button"
                      onClick={() => decrement("number2")}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className={styles["display-children-quantity"]}
                      id="number2"
                      value={number2}
                      onChange={(e) => setNumber2(parseInt(e.target.value))}
                      required="true"
                    />
                    <button
                      className={styles["increment-children"]}
                      type="button"
                      onClick={() => increment("number2")}
                    >
                      +
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles["input-group-time"]}>
              <span className={styles["time-label"]}>
                <label for="time">Available slot: </label>
              </span>
              {/* <select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                {timeArray.map((time) => (
                  <option value={time}>{time.slice(0, -3)}</option>
                ))}
              </select> */}
              <Dropdown
                id="time"
                value={time}
                options={timeArray.map((time) => ({
                  label: time.slice(0, -3),
                  value: time,
                }))}
                onChange={(e) => setTime(e.value)}
                optionLabel="label"
                placeholder="Select a time"
              />
            </div>

            <div className={styles["input-group-date"]}>
              <span className={styles["date-label"]}>
                <label for="date">Date: </label>
              </span>
              {/* <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required="true"
              /> */}
              <Calendar
                id="date"
                value={date}
                onChange={(e) => setDate(e.value)}
                showIcon
                style={{ width: "165px" }}
                required
              />
            </div>

            <div className={styles["input-group-personal"]}>
              <label className={styles["personal-info-label"]} for="personal">
                Personal Information:
              </label>

              <div className={styles["input-text-personal"]}>
                <label className={styles["label"]} htmlFor="customerFullName">
                  Full Name:
                </label>
                <input
                  class={styles["underline-input"]}
                  type="text"
                  id="customerFullName"
                  value={customerFullName}
                  onChange={(e) => setCustomerFullName(e.target.value)}
                  placeholder="Abc"
                  required
                />
              </div>
              <div className={styles["input-text-personal"]}>
                <label className={styles["label"]} htmlFor="customerEmail">
                  Email:
                </label>
                <input
                  class={styles["underline-input"]}
                  type="email"
                  id="customerEmail"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Email@gmail.com"
                  required
                />
              </div>
              <div className={styles["input-text-personal"]}>
                <label
                  className={styles["label"]}
                  htmlFor="customerPhoneNumber"
                >
                  Phone Number:
                </label>
                <input
                  class={styles["underline-input"]}
                  type="tel"
                  id="customerPhoneNumber"
                  value={customerPhoneNumber}
                  onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                  placeholder="0123456789"
                  required
                />
              </div>
              <div className={styles["input-text-personal"]}>
                <label className={styles["label"]} htmlFor="note">
                  Note:
                </label>
                <textarea
                  class={styles["underline-note"]}
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Note"
                />
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

//-----------------------------------DRAFT------------------------------------------//

//****Input Personal Information****

{
  /* <InputText
                className={styles["input-text-personal"]}
                type="text"
                id="customerFullName"
                value={customerFullName}
                onChange={(e) => setCustomerFullName(e.target.value)}
                placeholder="Full Name"
                required
              />
              <InputText
                className={styles["input-text-personal"]}
                type="email"
                id="customerEmail"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <InputText
                className={styles["input-text-personal"]}
                type="tel"
                id="customerPhoneNumber"
                value={customerPhoneNumber}
                onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                required
              />
              <InputTextarea
                className={styles["input-text-personal"]}
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Note"
              /> */
}
{
  /* <input
                type="text"
                id="customerFullName"
                value={customerFullName}
                onChange={(e) => setCustomerFullName(e.target.value)}
                placeholder="Full Name"
                required="true"
              />
              <input
                type="email"
                id="customerEmail"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Email"
                required="true"
              />
              <input
                type="tel"
                id="customerPhoneNumber"
                value={customerPhoneNumber}
                onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                required="true"
              />
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Note"
              ></textarea> */
}
