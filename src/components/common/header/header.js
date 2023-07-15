import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
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
