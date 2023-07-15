import React, { useEffect, useState } from 'react';
import styles from './staffList.module.scss';



const apiUrl = process.env.REACT_APP_API_URL;

const StaffList = () => {
    const [staffs, setStaffs] = useState([]);

    const fetchStaffsList = () => {
        const bearerToken = localStorage.getItem('token');
        fetch(`${apiUrl}/api/staffs`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch staffs list.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Staffssssss:::');
                console.log(data);
                setStaffs(data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchStaffsList();
    }, []);


    return (
        <div>
            <h1>STaff</h1>
            {staffs.map((staff, index) => (
                <div className={styles.card} key={index} title='Detail' style={{ margin: '1rem' }}>
                    <p>Id: {staff.id}</p>
                    <p>Name: {staff.name}</p>
                </div>
            ))}
        </div>
    );
}

export default StaffList;
