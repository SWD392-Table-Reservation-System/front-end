import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./makeOrder.module.scss";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import "../makeOrder/makeOrder.scss"
import axios from "axios";

const FindSuitableTables = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [number1, setNumber1] = useState(1);
  const [number2, setNumber2] = useState(1);
  const [time, setTime] = useState("09:00 AM");
  const [date, setDate] = useState(Date);
  const [selectedDate, setSelectedDate] = useState(new Date(date));
  const [dateTimeBooking, setDateTimeBooking] = useState("");
  const [availableTables, setAvailableTables] = useState([]);
  const [dateAvailable, setDateAvailable] = useState([]);
  const [timeAvailable, setTimeAvailable] = useState([]);
  const toast = useRef(null);
  const [timeArray, setTimeArray] = useState([]);
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
    toast.current.show({ severity: severity, summary: summary, detail: detail, });
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

  const formatDateTime = (e) => {
    setDate(e.value)
    //Format the Calendar input
    setSelectedDate(new Date(date)); // Convert the date string to a Date object
    const formattedDate = selectedDate.toISOString().split("T")[0]; // Format the date as desired
    const formattedTime = time.replace(/[^\d:]/g, "");
    setDateTimeBooking(`${formattedDate}T${formattedTime}`);
    setDateAvailable(`${formattedDate}`);
    setTimeAvailable(`${formattedTime}`);

    console.log(formattedDate); // "2020-12-31"
    console.log(dateTimeBooking);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the request body
    const requestBody = JSON.stringify({
      dateTimeBooking: dateTimeBooking,
      quantitySeats: customerQuantity
    });
    console.log('Request:::::');
    console.log(requestBody);

    // Perform the API request
    axios.post(`${apiUrl}/api/Tables/find`, requestBody, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        console.log("API response:", response);
        if (response.data.success) {
          if (response.data.data.length !== 0) {
            show("success", `Horray!!`, `You chose a good period of time!`);

            setAvailableTables(response.data.data) //an array
          } else {
            show("warn", "No available table at choosen time", 'Please choose other time and date');
          }
        } else {
          throw new Error(
            `API request failed: ${response.status} ${response.statusText}`
          );
        }
      })
      .catch((error) => {
        console.error("API request error:", error);
        show("error", "Ordered fail", 'Something went wrong, please reload the page and try again');
      });
  };

  const goToMakeOrder = () => {
    let tablesId = [];

    availableTables.map((table) => {
      tablesId.push(table.id)
    })

    const variables = {
      dateTimeBooking: dateTimeBooking,
      customerQuantity: customerQuantity,
      tablesId: tablesId
    };
    navigate("/order/make", { state: variables });
  }

  return (
    <div className={styles.MakeOrder}>
      <Toast ref={toast} />
      <div className={styles.container}>
        {/* Titile */}
        <div className={styles.thumbnail}>
          <img className={styles.img} src="orderPageImg.png" alt="" />
          <h1 className={styles["res-name"]}>RESTAURANT NAME</h1>
          <p className={styles["res-address"]}>Restaurant address</p>
        </div>

        {/* Form input */}
        <div className={styles.orderMenu}>
          <form className={styles.inputsForm} onSubmit={handleSubmit}>
            {/* Adult num input */}
            <div
              id={styles.inputAdultQuantity}
              className="input-group input-group-quantity">
              <div className={styles.inputAdults}>
                <span className={styles.adultQuantityLabel}>
                  <label for="number1">Number of Adult: </label>
                </span>
                <span className={styles.adultQuantityChangeButton}>
                  <button
                    className={styles.decrementAdult}
                    type="button"
                    onClick={() => decrement("number1")}>
                    -
                  </button>
                  <input
                    className={styles.displayAdultQuantity}
                    type="number"
                    id="number1"
                    value={number1}
                    onChange={(e) => setNumber1(parseInt(e.target.value))}
                    required="true" />
                  <button
                    className={styles.incrementAdult}
                    type="button"
                    onClick={() => increment("number1")}>
                    +
                  </button>
                </span>
              </div>
            </div>

            {/* Children num input */}
            <div className={styles.inputChildrenQuantity}>
              <div className={styles.inputChildren}>
                <span className={styles.childrenQuantityLabel}>
                  <label for="number2">Number of Child(ren): </label>
                </span>
                <span className={styles.childrenQuantityChangeButton}>
                  <button
                    className={styles.decrementChildren}
                    type="button"
                    onClick={() => decrement("number2")}>
                    -
                  </button>{" "}
                  <input
                    className={styles.displayChildrenQuantity}
                    type="number"
                    id="number2"
                    value={number2}
                    onChange={(e) => setNumber2(parseInt(e.target.value))}
                    required="true" />
                  <button
                    className={styles.incrementChildren}
                    type="button"
                    onClick={() => increment("number2")}>
                    +
                  </button>
                </span>
              </div>
            </div>

            {/* Date Time input */}
            <div id={styles.inputGroupTime} className="input-group input-group-time">
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
                style={{ width: "120px" }} />
            </div>

            <div id={styles.inputGroupDate} className="input-group input-group-date">
              <span className={styles.dateLabel}>
                <label for="date">Date: </label>
              </span>
              <Calendar
                id="date"
                value={date}
                onChange={(e) => { formatDateTime(e) }}
                required
                showIcon
                style={{ width: "160px" }} />
            </div>
            <Button style={{ marginTop: "50px", background: "#ce6930" }} type="submit">
              Find
            </Button>
          </form>
        </div>
      </div>

      {/* Display available tables */}
      <div className={styles.availableTables} style={{ display: availableTables.length === 0 ? "none" : "block" }}>
        {availableTables.map((table) => (
          <div id={table.id} className={styles.tableDetail}>
            <h3>Available table</h3>
            <div className={styles.tableInfo}>
              <p><strong>Date: </strong>{dateAvailable}</p>
              <p><strong>Time: </strong>{timeAvailable}</p>
              <p><strong>Code:</strong> {table.code}</p>
              <p><strong>Seat Quantity:</strong> {table.seatQuantity}</p>
              <Button style={{ width: "fit-content", marginTop: "30px", marginLeft: "100px", background: "#ce6930", color: "white", fontWeight: "bold" }} onClick={goToMakeOrder}>
                Next
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

FindSuitableTables.propTypes = {};

FindSuitableTables.defaultProps = {};

export default FindSuitableTables;
