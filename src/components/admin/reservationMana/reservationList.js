import React, { useEffect, useState, useRef } from 'react';
import styles from './reservationList.module.scss';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import axiosCustom from '../../../utils/axiosConfig';
import { format } from 'date-fns';


const apiUrl = process.env.REACT_APP_API_URL;

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState([]);
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
        axiosCustom.put(`${apiUrl}/api/Reservations/update-status/${id}`, body, {
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

    const filterRvtStatus = (e) => {
        setSelectedStatusFilter(e.value);
        const bearerToken = localStorage.getItem('token');
        axiosCustom.get(`${apiUrl}/api/reservations/status/${e.value}`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            }
        })
            .then(response => {
                console.log(response);
                if (response.data.success){
                    setReservations(response.data.data);
                }else{
                    toast.current.show({ severity: 'error', summary: 'Error', detail: response.data.errorMessage });
                }
            })
            .catch(err => {
                console.log(err);
                toast.current.show({ severity: 'error', summary: 'Some error occured!', detail: 'Try again or Refresh the page' });
            });
    }

    return (
        <div className={styles.container}>
            <h1>Reservation List</h1>
            <div className={styles.ReservationList}>
                <Toast ref={toast} />
                <div className={styles.filterContainer}>
                    <Dropdown
                        value={selectedStatusFilter}
                        options={statusValues}
                        onChange={(e) => filterRvtStatus(e)}
                        placeholder={statusValues[0]}
                    />
                </div>
                <p>{reservations.length === 0 ? 'There is no reservation' : ''}</p>
                <div className={styles.reservations}>
                {reservations.map((reservation, index) => {
                    const formattedCreationDate = format(new Date(reservation.creationDate), 'dd/MM/yyyy - HH:mm');
                    const formattedBookingDate = format(new Date(reservation.dateTimeBooking), 'dd/MM/yyyy - HH:mm');
                    return (
                    <Card className={styles.card} key={index} style={{ margin: '1rem' }}>
                        <div className={styles.cardContent}>
                            <h2 className={styles.cardTitle}>Detail</h2>
                            <p><h3 style={{marginRight: "5px"}}>Creation Date:</h3>{formattedCreationDate}</p>
                            <p><h3 style={{marginRight: "5px"}}>Booking Date:</h3> {formattedBookingDate}</p>
                            <p><h3 style={{marginRight: "5px"}}>Customer Quantity:</h3> {reservation.customerQuantity}</p>
                            <p><h3 style={{marginRight: "5px"}}>Note:</h3> {reservation.note}</p>
                            <p><h3 style={{marginRight: "5px"}}>Customer Name:</h3> {reservation.customerFullName}</p>
                            <p><h3 style={{marginRight: "5px"}}>Customer Email:</h3> {reservation.customerEmail}</p>
                            <p><h3 style={{marginRight: "5px"}}>Customer Phone number:</h3> {reservation.customerPhoneNumber}</p>
                        </div>
                        <Dropdown
                            className={styles.cardDropdown}
                            value={selectedStatus[index]}
                            options={statusValues}
                            onChange={(e) => changeRvtStatus(e, index, reservation.id)}
                            placeholder={reservation.status}
                            />
                    </Card>
                )})}
                </div>
            </div>
        </div>
    );
};

export default ReservationList;
