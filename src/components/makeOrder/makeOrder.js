import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./makeOrder.module.scss";




const MakeOrder = () => (
  <div className={styles.MakeOrder}>
    <div className={styles["container"]}>
      
      <div className={styles["thumbnail"]}>
        <img className={styles["img"]} src="orderPageImg.png" alt></img>
        <h1 className={styles["res-name"]}>
          RESTAURANT NAME
        </h1>
        <p className={styles["res-address"]}>Restaurant address</p>
      </div>

      <div className={styles["order-menu"]}>
        <div className={styles["people-quantity"]}>
          <div className={styles["adult-quantity"]}>
            <h3>No. of Adults</h3>
          </div>
          <div className={styles["children-quantity"]}>
            <h3>No. of Children</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
);

MakeOrder.propTypes = {};

MakeOrder.defaultProps = {};

export default MakeOrder;
