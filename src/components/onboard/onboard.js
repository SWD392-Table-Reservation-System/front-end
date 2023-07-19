import React from "react";
import styles from "./onboard.module.scss";

import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const Home = () => {   
    return (
        <div className={styles['home-container']}>
            <p className={styles['thumbnail']}>
                <strong>
                Planning First<br/>
                Booking First
                </strong>
            </p>
            <p className={styles['ad-text']}>
                <strong>The best grain, the finest roast, the most powerful flavor.</strong>
            </p>
            <div className="btn flex flex-wrap">
                <Link className={styles['link']} to="/order">
                    <Button className={styles.btn} label="Get Started" text size="large" link/>
                </Link>
            </div>
        </div>
    );
}

Home.defaultProps = {};

export default Home;


