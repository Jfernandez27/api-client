import React, { useEffect, useState, Fragment } from 'react';
import axiosClient from '../../config/axios';

import OrderDetail from './OrderDetail';

function Orders() {
    let [orders, saveOrders] = useState([]);

    const apiQuery = async () => {
        const ordersQuery = await axiosClient.get('/orders');
        saveOrders(ordersQuery.data);
    };

    useEffect(() => {
        apiQuery();
    }, [orders]);

    return (
        <Fragment>
            <h2>Orders</h2>

            <ul className="listado-pedidos">
                {orders.map((order) => (
                    <OrderDetail key={order._id} order={order} />
                ))}
            </ul>
        </Fragment>
    );
}

export default Orders;
