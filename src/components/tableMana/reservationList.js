import React, { useEffect, useState } from 'react';
import styles from './reservationList.scss';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';


const apiUrl = process.env.REACT_APP_API_URL;

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);

    const fetchReservationList = () => {
        const bearerToken = localStorage.getItem('token');
        fetch(`${apiUrl}/api/Reservations`, {
            method: 'GET',
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

    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Delete" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
        </div>
    );

    return (
        <div className={styles.ReservationList}>
            {reservations.map((reservation, index) => (
                <Card key={index} title='Detail' footer={footer} style={{ margin: '1rem' }}>
                    <p>Id: {reservation.id}</p>
                    <p>Creation Date: {reservation.creationDate}</p>
                    <p>Booking Date: {reservation.dateTimeBooking}</p>
                    <p>Customer Quantity: {reservation.customerQuantity}</p>
                    <p>Note: {reservation.note}</p>
                    <p>Customer Name: {reservation.customerFullName}</p>
                    <p>Customer Email: {reservation.customerEmail}</p>
                    <p>Customer Phone Number: {reservation.customerPhoneNumber}</p>
                </Card>
            ))}
        </div>
    );
};

ReservationList.defaultProps = {};

export default ReservationList;
