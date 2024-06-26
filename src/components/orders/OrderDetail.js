import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';

function OrderDetail({ order }) {
    const { customer } = order;
    const deleteOrder = (id) => {
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
                    .delete(`/orders/${id}`)
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
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {order._id}]</p>
                <p className="nombre">
                    Customer: {customer.name} {customer.lastname}
                </p>

                <div className="articulos-pedido">
                    <p className="productos">Items Ordered: </p>
                    <ul>
                        {order.order.map((article) => (
                            <li key={order._id + article.product._id}>
                                <p>{article.product.name}</p>
                                <p>Price: ${article.product.price}</p>
                                <p>Quantity: {article.quantity}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="total">Total: {order.total} </p>
            </div>
            <div className="acciones">
                <Link to={'#'} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Edit Order
                </Link>

                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteOrder(order._id)}
                >
                    <i className="fas fa-times"></i>
                    Delete Order
                </button>
            </div>
        </li>
    );
}

export default OrderDetail;
