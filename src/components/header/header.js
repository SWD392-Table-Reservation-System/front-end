import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { Link } from "react-router-dom";

const Header = () => {
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            url: '/'
        },
        {
            label: 'About',
            icon: 'pi pi-fw pi-info',
            url: '/about'
        },
        {
            label: 'Contact',
            icon: 'pi pi-fw pi-envelope',
            url: '/contact'
        }
    ];

    // let logined;
    // useRef(() => {
    //     if (localStorage.getItem('token')) {
    //         logined = 'true'
    //     }
    // }, [])

    const logOut = () => {
        localStorage.removeItem('token');

    }


    return (
        <div>
            {/* <Menubar model={items} /> */}
            <nav>
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/order"}>Make Order</Link>
                    </li>
                    <li>
                        <Link to={"/admin"}>Sign in as Admin</Link>
                    </li>
                    <li>
                        <Link to={"/admin/reservations"}>Reservation List</Link>
                    </li>
                    <li >
                        <Link to={"/"}><button onClick={logOut}>Logout</button></Link>

                    </li>

                </ul>
            </nav>
        </div>
    );
};

export default Header;
