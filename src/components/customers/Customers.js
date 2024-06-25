import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../config/axios';

import Customer from './Customer';
import Spinner from '../layout/Spinner';

function Customers() {
    // Work with State
    // customers = state, saveCustomers = function to save state
    let [customers, saveCustomers] = useState([]);

    const apiQuery = async () => {
        const customersQuery = await axiosClient.get('/customers');
        saveCustomers(customersQuery.data);
    };

    useEffect(() => {
        apiQuery();
    }, [customers]); // Empty array means this effect runs once after the initial render

    if (!customers) return <Spinner />;

    return (
        <Fragment>
            <h2>Customers</h2>

            <Link to={'/customers/new'} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {customers.map((customer) => (
                    <Customer key={customer._id} customer={customer} />
                ))}
            </ul>
        </Fragment>
    );
}

export default Customers;
