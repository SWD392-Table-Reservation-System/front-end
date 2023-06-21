import React, { useEffect, useState } from 'react';
import styles from './reservationList.scss';
const apiUrl = process.env.REACT_APP_API_URL;
const bearerToken = localStorage.getItem('token');

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);

    const fetchReservationList = () => {
        fetch(`${apiUrl}/api/Reservations`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch reservations.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Reservations:::');
                console.log(data);
                setReservations(data.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchReservationList();
    }, []);

    return (
        <div className={styles.ReservationList}>
            {reservations.map((reservation, index) => (
                <div key={index}>{reservation.customerFullName}</div>
            ))}
        </div>
    );
};

ReservationList.defaultProps = {};

export default ReservationList;
