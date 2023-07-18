import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png';
import calling from '../../../assets/calling.gif';
import '../header/header.scss';

const Header = () => {
    
    return (
        <div className="header">
            <nav>
                <ul className="nav-list">
                    <li className="nav-item" style={{width: '20%'}}>
                        <Link to={"/"} style={{ backgroundColor: '#cd682e00' }}>
                            <div>
                                <img src={logo} alt="Home" className="logo" />
                                <h4 style={{ margin: 0 }}>TLA Restaurant</h4>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item" style={{width: '20%'}}>
                        <Link to={"/order"}>Make Order</Link>
                    </li>
                    <li className="nav-item" style={{width: '60%'}}>
                        <div className='call-img'>
                            <a href="tel:+1234567890" style={{ backgroundColor: '#cd682e00' }}>
                                <img src={calling} alt='Call us to book a table NOW!' style={{maxWidth: '130px'}}/>
                                </a>
                    
                        </div>
                        </li>
                </ul>

            </nav>
        </div>
    );
};

export default Header;
