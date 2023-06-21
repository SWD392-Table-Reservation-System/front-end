import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./login.module.scss";
import axios from "axios";

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login authentication with the entered credentials
    // You can use an API call or any other method to authenticate the user
    // For simplicity, let's assume authentication is successful

    console.log(username);
    console.log(password);
    console.log('Logged in successfully');
    handleLogin();
  };

  const handleLogin = (e) => {
    axios
      .post(`${apiUrl}/api/Auth/login`, { username, password })
      .then((response) => {
        console.log('Login Suggest');
        console.log(response);
        const token = response.data.data;
        localStorage.setItem('token', token);
        console.log(token);
        navigate('/table-mana')
      })
      .catch((error) => {
        // Handle error, show error message, etc.
        console.log(error);
      });
  };



  return (
    <div className={styles["login-container"]}>
      <div className={styles["title"]}>
        <h1>Sign in</h1>
        <p>Welcome back</p>
      </div>


      <form className={styles["form"]} onSubmit={handleSubmit}>

        <div className={styles["p-field"]}>
          <label className={styles["label"]} htmlFor="username">
            <img src="username.svg" alt="Username" width="50" height="30" />
          </label>
          <input
            class={styles["underline-input"]}
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
          {/* <ErrorMessage
              name="username"
              component="div"
              className="error-message"
            /> */}
        </div>

        <div className={styles["p-field"]}>
          <label className={styles["label"]} htmlFor="username">
            <img src="lock.svg" alt="Username" width="50" height="30" />
          </label>
          <input
            class={styles["underline-input"]}
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {/* <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            /> */}
        </div>

        {/* <button className={styles['btn-submit']} type="submit" label="Login" /> */}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

Login.propTypes = {};
Login.defaultProps = {};

export default Login;
