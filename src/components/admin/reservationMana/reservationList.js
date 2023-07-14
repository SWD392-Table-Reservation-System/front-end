import React, { useEffect, useState, useRef } from 'react';
import styles from './reservationList.module.scss';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const toast = useRef(null);

    const [statusValues, setStatusValues] = useState([]);

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
                else {
                    console.log('hahahah');
                    console.log(response);
                }
                return response.json();
            })
            .then(data => {
                console.log('Reservations:::');
                console.log(data);
                setReservations(data.data);
                setSelectedStatus(new Array(data.data.length).fill(null));
            })
            .catch(error => {
                console.error(error);
            });
    };

    const fetchStatusValues = () => {
        const bearerToken = localStorage.getItem('token');
        fetch(`${apiUrl}/api/Reservations/status-list`, {
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
                console.log('Status:::');
                console.log(data);
                setStatusValues(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchReservationList();
        fetchStatusValues();
    }, []);

    const updateRvtStatus = (status, id) => {
        const bearerToken = localStorage.getItem('token');
        let body = {
            status: status
        };
        axios.put(`${apiUrl}/api/Reservations/update-status/${id}`, body, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            }
        })
            .then(response => {
                console.log(response);
                toast.current.show({ severity: 'success', summary: 'Status Updated', detail: '' });
            })
            .catch(err => {
                console.log(err);
                toast.current.show({ severity: 'error', summary: 'Error', detail: '' });
            });
    };

    const changeRvtStatus = (e, index, rvtId) => {
        const newSelectedStatus = [...selectedStatus];
        newSelectedStatus[index] = e.value;
        setSelectedStatus(newSelectedStatus);
        updateRvtStatus(e.value, rvtId);
    };

    return (
        <div className={styles.ReservationList}>
            <Toast ref={toast} />
            <p>{reservations.length === 0 ? 'There is no reservation' : ''}</p>
            {reservations.map((reservation, index) => (
                <Card className={styles.card} key={index} title='Detail' style={{ margin: '1rem' }}>
                    <p>Id: {reservation.id}</p>
                    <p>Creation Date: {reservation.creationDate}</p>
                    <p>Booking Date: {reservation.dateTimeBooking}</p>
                    <p>Customer Quantity: {reservation.customerQuantity}</p>
                    <p>Note: {reservation.note}</p>
                    <p>Customer Name: {reservation.customerFullName}</p>
                    <p>Customer Email: {reservation.customerEmail}</p>
                    <p>Reservation status: {reservation.customerPhoneNumber}</p>

                    <Dropdown
                        value={selectedStatus[index]}
                        options={statusValues}
                        onChange={(e) => changeRvtStatus(e, index, reservation.id)}
                        placeholder={reservation.status}
                    />
                </Card>
            ))}
        </div>
    );
};

export default ReservationList;