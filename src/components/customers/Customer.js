import React from 'react';
import { Link } from 'react-router-dom';

function Customer({ customer }) {
    const { _id, name, lastname, company, email, phone } = customer;

    return (
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">
                    {name} {lastname}
                </p>
                <p className="empresa">{company}</p>
                <p>{email}</p>
                <p>Tel: {phone}</p>
            </div>
            <div className="acciones">
                <Link to={'#'} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Edit Customer
                </Link>
                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                    Delete Customer
                </button>
            </div>
        </li>
    );
}

export default Customer;
