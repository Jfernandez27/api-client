import React, { useState, useEffect, Fragment } from 'react';
import axiosClient from '../../config/axios';
import Swal from 'sweetalert2';

import FormProductSearch from '../products/FormProductSearch';
import FormQuantityProduct from './FormQuantityProduct';

function NewOrder(props) {
    const { customerId } = props.match.params;

    // state
    let [customer, saveCustomer] = useState([]);
    let [search, saveSearch] = useState('');
    let [products, saveProducts] = useState([]);
    let [total, saveTotal] = useState(0);

    const apiQuery = async () => {
        const res = await axiosClient.get(`/customers/${customerId}`);
        saveCustomer(res.data);

        updateTotal();
    };

    useEffect(() => {
        apiQuery();
    }, [products]);

    const searchProduct = async (e) => {
        e.preventDefault();

        const res = await axiosClient.post(`/products/search/${search}`);

        if (res.data[0]) {
            let productRes = res.data[0];
            productRes.product = res.data[0]._id;
            productRes.quantity = 0;

            saveProducts([...products, productRes]);
        } else {
            Swal.fire({
                title: 'No results',
                text: 'There are no results for the search',
                icon: 'error',
            });
        }
    };

    const readDataSeach = (e) => {
        saveSearch(e.target.value);
    };

    const decreaseProducts = (i) => {
        const allProducts = [...products];
        if (allProducts[i].quantity === 0) return;
        allProducts[i].quantity--;

        saveProducts(allProducts);
    };
    const increaseProducts = (i) => {
        const allProducts = [...products];
        allProducts[i].quantity++;
        saveProducts(allProducts);
    };

    const updateTotal = () => {
        if (products.length === 0) {
            saveTotal(0);
            return;
        }

        let newTotal = 0;

        products.map(
            (product) => (newTotal += product.quantity * product.price)
        );

        saveTotal(newTotal);
    };

    const deleteOrderProduct = (id) => {
        const allProducts = products.filter(
            (product) => product.product !== id
        );

        saveProducts(allProducts);
    };

    const addOrder = async (e) => {
        e.preventDefault();

        const { customerId } = props.match.params;
        const order = {
            customer: customerId,
            order: products,
            total: total,
        };
        console.log(order);
        try {
            const res = await axiosClient.post(`/orders/`, order);

            if (res.status === 200) {
                Swal.fire({
                    title: 'Order Added',
                    text: res.data.message,
                    icon: 'success',
                });
            }
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: err.response.data,
                icon: 'error',
            });
        }
        props.history.push('/orders');
    };

    return (
        <Fragment>
            <h2>New Order</h2>

            <div className="ficha-cliente">
                <h3>Customer</h3>
                <p>
                    Name: {customer.name} {customer.lastname}
                </p>
                <p>Phone: {customer.phone}</p>
            </div>

            <FormProductSearch
                searchProduct={searchProduct}
                readDataSeach={readDataSeach}
            />

            <ul className="resumen">
                {products.map((product, index) => (
                    <FormQuantityProduct
                        key={product.product}
                        product={product}
                        decreaseProducts={decreaseProducts}
                        increaseProducts={increaseProducts}
                        deleteOrderProduct={deleteOrderProduct}
                        index={index}
                    />
                ))}
            </ul>
            <p className="total">
                Total: <span>$ {total}</span>
            </p>
            {total > 0 ? (
                <form onSubmit={addOrder}>
                    <input
                        type="submit"
                        className="btn btn-verde btn-block"
                        value="Add Order"
                    />
                </form>
            ) : null}
        </Fragment>
    );
}

export default NewOrder;
