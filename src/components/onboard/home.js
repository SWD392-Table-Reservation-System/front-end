import React from "react";
import styles from "./home.module.scss";

import { Button } from "primereact/button";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const Home = () => {   
    return (
        <div className={styles['home-container']}>
            <p className={styles['thumbnail']}>
                Planning First<br/>
                Booking First
            </p>
            <p className={styles['ad-text']}>
                The best grain, the finest roast, the most powerful flavor.
            </p>
            <div className="btn flex flex-wrap">
            <Link className={styles['link']} to="/signin">
                <Button className={styles['btn-getstarted']} label="Get Started" text size="large" link/>
            </Link>
            </div>
        </div>
    );
}

Home.protoTypes = {}
Home.defaultProps = {};

export default Home;


