import React, { Fragment, useState } from 'react';
import axiosClient from '../../config/axios';

function NewCustomer() {
    let [customer, saveCustomer] = useState({
        name: '',
        lastname: '',
        company: '',
        email: '',
        phone: '',
    });

    const handleChange = (e) => {
        saveCustomer({
            ...customer,
            [e.target.name]: e.target.value,
        });
    };

    const customerValidate = () => {
        const { name, lastname, company, email, phone } = customer;

        let valid =
            !name.length ||
            !lastname.length ||
            !company.length ||
            !email.length ||
            !phone.length;

        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosClient
            .post('/customers', customer)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Fragment>
            <h2>New Customer</h2>

            <form onSubmit={handleSubmit}>
                <legend>Fill in all fields</legend>
                <div className="campo">
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Customer name"
                        name="name"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Lastname:</label>
                    <input
                        type="text"
                        placeholder="Customer Lastname"
                        name="lastname"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Company:</label>
                    <input
                        type="text"
                        placeholder="Customer Company"
                        name="company"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Customer Email"
                        name="email"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Phone:</label>
                    <input
                        type="tel"
                        placeholder="Customer Phone"
                        name="phone"
                        onChange={handleChange}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Add Customer"
                        disabled={customerValidate()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default NewCustomer;
