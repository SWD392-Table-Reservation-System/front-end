import React, { useRef, useState } from "react";
import './login.scss';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
    const apiUrl = 'https://localhost:7147';

    const toast = useRef(null);
    const navigate = useNavigate();

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.item.toString() });
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validate: (data) => {
            let errors = {};

            if (data.username) {
                errors.username = 'Username is required.';
            }
            if (data.password) {
                errors.password = 'Password is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            if (!formik.validate) {
                console.log('Input form sucessful');
                console.log(data);
                console.log(formik.values.username);
                console.log(formik.values.password);
                try {
                    handleLogin()
                } catch (error) {
                    console.log(error);
                }

            }
            console.log("hello");
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const handleLogin = (e) => {
    //     axios
    //         .post(`${apiUrl}/api/Auth/login`, { username, password })
    //         .then((response) => {
    //             const token = response.data.token;

    //             // Save the token in localStorage or cookies
    //             localStorage.setItem('token', token);

    //             // Redirect or perform any other action upon successful login
    //             navigate('/home')
    //         })
    //         .catch((error) => {
    //             // Handle error, show error message, etc.
    //         });
    // };

    const handleLogin = (e) => {
        axios
            .post(`${apiUrl}/api/Auth/login`, { username: formik.values.username, password: formik.values.password })
            .then((response) => {
                const token = response.data.token;

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
        <div className='loginComponentContainer'>
            <Toast ref={toast} />
            <h2 className="loginComponentTitle">Welcome to Restaurant Reservation System website</h2>
            <form onSubmit={formik.handleSubmit} className="loginComponentForm">
                {/* <InputText id="username" type="text" className="p-inputtext-lg" placeholder="Email or Username" required="true" />
                <InputText id="password" type="password" className="p-inputtext-lg" placeholder="Password" required="true" /> */}
                <InputText
                    id="username"
                    name="username" // Add the "name" attribute with the corresponding field name
                    type="text"
                    className="p-inputtext-lg"
                    placeholder="Email or Username"
                    required="true"
                    onChange={formik.handleChange} // Add onChange handler to update formik state
                    value={formik.values.username} // Bind the value to formik state
                />
                <InputText
                    id="password"
                    name="password" // Add the "name" attribute with the corresponding field name
                    type="password"
                    className="p-inputtext-lg"
                    placeholder="Password"
                    required="true"
                    onChange={formik.handleChange} // Add onChange handler to update formik state
                    value={formik.values.password} // Bind the value to formik state
                />

                <Button label="Login" type="submit" />

            </form>


        </div>
    )

};


Login.defaultProps = {};

export default Login;
