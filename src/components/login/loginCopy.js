import axios from 'axios';
import React, { useState } from 'react';

const LoginCopy = () => {
    const apiUrl = 'https://localhost:7147';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

                // Save the token in localStorage or cookies
                localStorage.setItem('token', token);
                console.log(token);

                // Redirect or perform any other action upon successful login
                // navigate('/home')
            })
            .catch((error) => {
                // Handle error, show error message, etc.
                console.log(error);
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default LoginCopy;
