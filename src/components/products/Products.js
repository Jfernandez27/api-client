import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../config/axios';

import Product from './Product';
import Spinner from '../layout/Spinner';

function Products() {
    let [products, saveProducts] = useState([]);

    const apiQuery = async () => {
        const productsQuery = await axiosClient.get('/products');
        saveProducts(productsQuery.data);
    };

    useEffect(() => {
        apiQuery();
    }, [products]);

    if (!products) return <Spinner />;

    return (
        <Fragment>
            <h2>Products</h2>
            <Link to={'/products/new'} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                New Product
            </Link>

            <ul className="listado-productos">
                {products.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </ul>
        </Fragment>
    );
}

export default Products;
