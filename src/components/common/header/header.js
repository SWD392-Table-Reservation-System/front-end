import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png';

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
                <ul style={{listStyle: "none"}}>
                    <li>
                        <Link to={"/"}>
                            <img src={logo} alt="Home" style={{ width: "50px", height: "50px" }} />
                        </Link>
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
