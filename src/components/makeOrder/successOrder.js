import React from "react";
import styles from "./success.module.scss";
import { Link } from "react-router-dom";

const Success = () => (
  <div className={styles.Success}>
    <div className={styles.OrderOptions}>
      <div className={styles.Group7022}>
        <div className={styles.Rectangle31}/>
        <Link to={"/order"} className={styles.BackHome}>
          Back Home
        </Link>
      </div>
      <div className={styles.Line}/>
      <div className={styles.Title}>
        SUCCESSFULLY
      </div>
      <div className={styles.PressBackHomeToBookMore}
      >
        Press ‘Back Home’ to book more!
      </div>
    </div>
  </div>
);

Success.defaultProps = {};

export default Success;
