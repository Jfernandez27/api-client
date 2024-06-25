import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';

function Product({ product }) {
    const { _id, name, price, image } = product;

    const deleteProduct = (id) => {
        Swal.fire({
            title: `Are you sure?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient
                    .delete(`/products/${id}`)
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
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{name}</p>
                <p className="precio">$ {price} </p>
                {image ? (
                    <img src={`http://localhost:5000/${image}`} alt={name} />
                ) : null}
            </div>
            <div className="acciones">
                <Link to={`/products/edit/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Edit Product
                </Link>

                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteProduct(_id)}
                >
                    <i className="fas fa-times"></i>
                    Delete Product
                </button>
            </div>
        </li>
    );
}

export default Product;
