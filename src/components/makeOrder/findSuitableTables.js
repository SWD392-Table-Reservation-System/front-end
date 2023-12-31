import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./makeOrder.module.scss";
import image from "../../assets/make-order-img.jpg";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import "../makeOrder/makeOrder.scss"
import axios from "axios";
import { ProgressSpinner } from 'primereact/progressspinner';

const FindSuitableTables = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [number1, setNumber1] = useState(1);
  const [number2, setNumber2] = useState(1);
  const [time, setTime] = useState("09:00 AM");
  const [date, setDate] = useState(Date);
  const [dateTimeBooking, setDateTimeBooking] = useState("");
  const [availableTables, setAvailableTables] = useState([]);
  const [dateAvailable, setDateAvailable] = useState([]);
  const [timeAvailable, setTimeAvailable] = useState([]);
  const toast = useRef(null);
  const [timeArray, setTimeArray] = useState([]);
  const [isSpinner, setIsSpinner] = useState(false);
  const customerQuantity = number1 + number2;

  let today = new Date();
  let minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

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
    setDate(e.value);
    //Format the Calendar input
    const originalDate = new Date(`${e.value.toISOString().split("T")[0]}T${time.replace(/[^\d:]/g, "")}`);
    const nextDay = new Date(originalDate.getTime() + (24 * 60 * 60 * 1000));
    const nextDayISOString = nextDay.toISOString();

    // Extract the date and time components separately
    const nextDayDate = nextDayISOString.split("T")[0];

    setDateTimeBooking(`${nextDayDate}T${time.replace(/[^\d:]/g, "")}`);
    setDateAvailable(`${e.value.toISOString().split("T")[0]}`);
    setTimeAvailable(`${time.replace(/[^\d:]/g, "")}`);

    // console.log('Format:::::');
    console.log(dateTimeBooking); // "2020-12-31"
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSpinner(true);

    function validate() {
      return new Promise((resolve, reject) => {
        console.log('Datetimebooking');
        console.log(dateTimeBooking);
        var bookingDate = new Date(dateTimeBooking);
        var currentDate = new Date();

        // Check if booking date is in the future
        if (bookingDate < currentDate) {
          console.log(bookingDate);          console.log(currentDate);
          console.log('Sai ngayf');
          resolve(false);
        } else {
          if (bookingDate === currentDate) {
            // Check if booking time is in the future
            var bookingHours = bookingDate.getHours();
            var bookingMinutes = bookingDate.getMinutes();
            var currentHours = currentDate.getHours();
            var currentMinutes = currentDate.getMinutes();

            if (
              bookingHours < currentHours ||
              (bookingHours === currentHours && bookingMinutes <= currentMinutes)
            ) {
              console.log('Sai gioooo');
              resolve(false);
            } 
              
            
          }
        }
        resolve(true);
      });
    }


    validate()
    .then((result) => {
      if (result) {
        // Construct the request body
        const requestBody = JSON.stringify({
          dateTimeBooking: dateTimeBooking,
          quantitySeats: customerQuantity
        });
        console.log(requestBody);

        // Perform the API request
        axios.post(`${apiUrl}/api/Tables/find`, requestBody, {
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then((response) => {
            console.log("API response:", response);
            setIsSpinner(false)
            if (response.data.success) {
              if (response.data.data.length !== 0) {
                show("success", `Horray!!`, `You chose a good period of time!`);
                console.log('Availableeee:');
                console.log(response.data.data);
                setAvailableTables(response.data.data) //an array
              } else {
                show("warn", "No available table", 'Please choose another quantity, time, or date');
              }
            } else {
              throw new Error(
                `API request failed: ${response.status} ${response.statusText}`
              );
            }
          })
          .catch((error) => {
            console.error("API request error:", error);
            show("error", "Ordered fail", 'Something went wrong, please reload the page then try again');
          });
      } else {
        setIsSpinner(false)
        setAvailableTables([]);
        show("warn", "Date or Time is not valid", 'Please choose another time, or date');
      }
    })
      .catch(err => console.log(err))
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
          <img className={styles.img} src={image} alt="" />
          <h1 className={styles["res-name"]} style={{ color: "white" }}>TLA RESTAURANT</h1>
          <p className={styles["res-address"]} style={{ color: "white" }}>36 Nguyen Hue St, District 1, HCMC</p>
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
                placeholder="Time"
                id="time"
                value={time}
                options={timeArray.map((time) => ({
                  label: time.slice(0, -3),
                  value: time,
                }))}
                onChange={(e) => setTime(e.value)}
                required="true"
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
                minDate={minDate}
                placeholder="Date"
                style={{ width: "160px" }} />
            </div>
            <div>{isSpinner ? (<ProgressSpinner style={{ width: '34px', height: '34px' }} strokeWidth="6" />) : (<span></span>)}</div>
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
