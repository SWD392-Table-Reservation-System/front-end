import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./makeOrder.module.scss";
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';

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
        "Content-Type": "application/json"
      }
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
  }

  useEffect(() => {
    getTime()
  }, [])



  const show = (severity, summary, detail) => {
    toast.current.show({ severity: severity, summary: summary, detail: detail });
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
      method: "POST", headers: {
        "Content-Type": "application/json"
      },
      body: requestBody,
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        } else {
          show('error', 'Ordered fail', `${response.statusText}`)
          throw new Error(
            `API request failed: ${response.status} ${response.statusText}`
          );
        }
      })
      .then((data) => {
        console.log("API response:", data);
        show('success', `Hello ${data.data.customerFullName}, you ordered successfully!`, 'You are directing to Order Detail')
        setTimeout(() => {
          navigate('/order/success')
        }, 3000);

      })
      .catch((error) => {
        console.error("API request error:", error);
        show('error', 'Ordered fail', `${error}`)
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
          <form onSubmit={handleSubmit}>
            <div className="input-group input-group-quantity">
              <div>
                <label for="number1">Number of Adult: </label>
                <input
                  type="number"
                  id="number1"
                  value={number1}
                  onChange={(e) => setNumber1(parseInt(e.target.value))}
                  required="true"
                />
                <button type="button" onClick={() => decrement('number1')}>-</button>
                <button type="button" onClick={() => increment('number1')}>+</button>
              </div>

              <div>
                <label for="number2">Number of Child(ren): </label>
                <input
                  type="number"
                  id="number2"
                  value={number2}
                  onChange={(e) => setNumber2(parseInt(e.target.value))}
                  required="true"
                />
                <button type="button" onClick={() => decrement('number2')}>-</button>
                <button type="button" onClick={() => increment('number2')}>+</button>
              </div>

            </div>



            <div className="input-group input-group-time">
              <label for="time">Time: </label>
              <select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}>
                {
                  timeArray.map(time => <option value={time}>{time.slice(0, -3)}</option>)
                }
              </select>
            </div>

            <div className="input-group input-group-date">
              <label for="date">Date: </label>
              <input type="date" id="date" value={date}
                onChange={(e) => setDate(e.target.value)} required="true"
              />
            </div>

            <div className="input-group input-group-personal">
              <input
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
              ></textarea>
            </div>


            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

MakeOrder.propTypes = {};

MakeOrder.defaultProps = {};

export default MakeOrder;
