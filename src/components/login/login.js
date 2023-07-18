import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./login.module.scss";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useRef(null);

  const show = (severity, summary, detail) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/admin/table-mana')
    }
  }, [])


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
        if (response.data.success) {
          console.log('Login Successfully');
          console.log(response);
          const token = response.data.data;
          localStorage.setItem('token', token);
          console.log(token);
          navigate('/admin/table-mana')
        } else {
          show("error", "Login fail, please do it again", response.data.errorMessage);
        }
      })
      .catch((error) => {
        // Handle error, show error message, etc.
        console.log(error);
        show("error", "Login fail, please do it again", error.message);
      });
  };



  return (
    <div className={styles["login-container"]}>
      <Toast ref={toast} />
      


      <form className={styles["form"]} onSubmit={handleSubmit}>
      <div className={styles["title"]}>
        <h1><strong>Sign in</strong></h1>
        <p>Welcome back</p>
      </div>
        <div className={styles["p-field"]}>
          <label className={styles["label"]} htmlFor="username">
            <img src="username.svg" alt="Username" width="30" height="30" />
          </label>
          <input
            class={styles["underline-input"]}
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleUsernameChange}
          />
        </div>

        <div className={styles["p-field"]}>
          <label className={styles["label"]} htmlFor="username">
            <img src="lock.svg" alt="Username" width="30" height="30" />
          </label>
          <input
            class={styles["underline-input"]}
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <Button type="submit" style={{background: "#cd672e"}}>Log In</Button>
      </form>
    </div>
  );
};

Login.propTypes = {};
Login.defaultProps = {};

export default Login;
