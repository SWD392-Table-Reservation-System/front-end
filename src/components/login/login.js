import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Formik, Field, ErrorMessage, Form } from "formik";

import PropTypes from "prop-types";
import styles from "./login.module.scss";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values) => {
    // Perform login logic here
    console.log("Username:", values.username);
    console.log("Password:", values.password);
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["title"]}>
        <h1>Sign in</h1>
        <p>Welcome back</p>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        <Form className={styles["form"]}>

          <div className={styles["p-field"]}>
            <label className={styles["label"]} htmlFor="username">
              <img src="username.svg" alt="Username" width="50" height="30"/> 
            </label>
            <input
              class={styles["underline-input"]}
              type="text"
              id="username"
              name="username"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="error-message"
            />
          </div>

          <div className={styles["p-field"]}>
          <label className={styles["label"]} htmlFor="username">
              <img src="lock.svg" alt="Username" width="50" height="30"/> 
            </label>
            <input
              class={styles["underline-input"]}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
          </div>

          <Button className={styles['btn-submit']} type="submit" label="Login" />
        </Form>
      </Formik>
    </div>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
