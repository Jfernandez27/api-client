import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import axiosClient from '../../config/axios';

function EditCustomer(props) {
    const { id } = props.match.params;

    let [customer, dataCustomer] = useState({
        name: '',
        lastname: '',
        company: '',
        email: '',
        phone: '',
    });

    const apiQuery = async () => {
        const customersQuery = await axiosClient.get(`/customers/${id}`);
        dataCustomer(customersQuery.data);
    };

    useEffect(() => {
        apiQuery();
    }, []);

    const handleChange = (e) => {
        dataCustomer({
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
            .put(`/customers/${customer._id}`, customer)
            .then((res) => {
                Swal.fire({
                    title: 'Customer Updated',
                    text: res.data.message,
                    icon: 'success',
                });
                props.history.push('/');
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    title: 'Error',
                    text: err.response.data,
                    icon: 'error',
                });
            });
    };

    return (
        <Fragment>
            <h2>
                Edit Customer: {customer.name} {customer.lastname}
            </h2>

            <form onSubmit={handleSubmit}>
                <legend>Fill in all fields</legend>
                <div className="campo">
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Customer name"
                        name="name"
                        onChange={handleChange}
                        value={customer.name}
                    />
                </div>

                <div className="campo">
                    <label>Lastname:</label>
                    <input
                        type="text"
                        placeholder="Customer Lastname"
                        name="lastname"
                        onChange={handleChange}
                        value={customer.lastname}
                    />
                </div>

                <div className="campo">
                    <label>Company:</label>
                    <input
                        type="text"
                        placeholder="Customer Company"
                        name="company"
                        onChange={handleChange}
                        value={customer.company}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Customer Email"
                        name="email"
                        onChange={handleChange}
                        value={customer.email}
                    />
                </div>

                <div className="campo">
                    <label>Phone:</label>
                    <input
                        type="tel"
                        placeholder="Customer Phone"
                        name="phone"
                        onChange={handleChange}
                        value={customer.phone}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Update Customer"
                        disabled={customerValidate()}
                    />
                </div>
            </form>
        </Fragment>
    );
}
//HOC (Higher Order Component), is a function that takes a component and returns a new component.
export default withRouter(EditCustomer);
