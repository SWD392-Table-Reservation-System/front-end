import React from "react";
import styles from "./success.module.scss";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

const Success = () => (
  <div className={styles.Success}>
    <div className={styles.OrderOptions}>
      <div className={styles.Group7022}>
        <div className={styles.Rectangle31}/>
        <Link to={"/order"} className={styles.BackHome}>
          <Button className={styles.btn}>Back Home</Button>
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
