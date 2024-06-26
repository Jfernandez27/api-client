import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';

function Login(props) {
    const [credentials, saveCredentials] = useState({});

    const readData = (e) => {
        saveCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const login = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosClient.post('/login', credentials);
            const { token } = res.data;
            localStorage.setItem('token', token);
            Swal.fire({
                title: 'Login',
                text: 'You have logged in',
                icon: 'success',
            });
            props.history.push('/');
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: error.response.data.message,
                icon: 'error',
            });
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <div className="contenedor-formulario">
                <form onSubmit={login}>
                    <div className="campo">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            required
                            onChange={readData}
                        />
                    </div>
                    <div className="campo">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            onChange={readData}
                        />
                    </div>
                    <input
                        type="submit"
                        value="Login"
                        className="btn btn-verde btn-block"
                    />
                </form>
            </div>
        </div>
    );
}
export default Login;
