import React, { useEffect, useState } from 'react';
import styles from './staffList.module.scss';



const apiUrl = process.env.REACT_APP_API_URL;

const StaffList = () => {
    const [staffs, setStaffs] = useState([]);

    const fetchStaffsList = () => {
        const bearerToken = localStorage.getItem('token');
        fetch(`${apiUrl}/api/Accounts`, {
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
                if (data.success) {
                    console.log('Staffssssss:::');
                    console.log(data);
                    setStaffs(data.data);
                } else {
                    throw new Error(data.errorMessage)
                }

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
            <h1>Staff</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {/* <th>Id</th> */}
                        <th>Name</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {staffs.map((staff, index) => (
                        <tr className={styles.row} key={index} title='Detail'>
                            {/* <td>{staff.id}</td> */}
                            <td>{staff.fullName}</td>
                            <td>{staff.userName}</td>
                            <td>{staff.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default StaffList;
