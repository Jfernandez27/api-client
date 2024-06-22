import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';

function Customer({ customer }) {
    const { _id, name, lastname, company, email, phone } = customer;

    const deleteCustomer = (id) => {
        Swal.fire({
            title: `Are you sure? `,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient
                    .delete(`/customers/${id}`)
                    .then((res) => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: res.data.message,
                            icon: 'success',
                        });
                        // props.history.push('/');
                    })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire({
                            title: 'Error',
                            text: err.response.data,
                            icon: 'error',
                        });
                    });
            }
        });
    };

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
                <Link to={`/customers/edit/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Edit Customer
                </Link>
                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteCustomer(_id)}
                >
                    <i className="fas fa-times"></i>
                    Delete Customer
                </button>
            </div>
        </li>
    );
}

export default Customer;
