import React, { useState, useEffect, Fragment } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import axiosClient from '../../config/axios';
import Spinner from '../layout/Spinner';

function EditProduct(props) {
    const { id } = props.match.params;

    let [product, saveProduct] = useState({
        name: '',
        price: '',
        image: '',
    });

    let [file, saveFile] = useState('');

    const apiQuery = async () => {
        const productQuery = await axiosClient.get(`/products/${id}`);
        saveProduct(productQuery.data);
    };

    useEffect(() => {
        apiQuery();
    }, []);

    const handleChange = (e) => {
        saveProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        saveFile(e.target.files[0]);
    };

    const productValidate = () => {
        const { name } = product;

        let valid = !name.length;

        return valid;
    };

    const { name, price, image } = product;

    if (!name) return <Spinner />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('image', file);

        try {
            const res = await axiosClient.put(`/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200) {
                Swal.fire({
                    title: 'Product Updated',
                    text: res.data.message,
                    icon: 'success',
                });
                props.history.push('/products');
            }
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: err.response.data,
                icon: 'error',
            });
        }
    };

    return (
        <Fragment>
            <h2>Edit Product</h2>

            <form onSubmit={handleSubmit}>
                <legend>Fill in all fields</legend>

                <div className="campo">
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Name Product"
                        name="name"
                        onChange={handleChange}
                        defaultValue={name}
                    />
                </div>

                <div className="campo">
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        min="0.00"
                        step="1"
                        placeholder="Price"
                        onChange={handleChange}
                        defaultValue={price}
                    />
                </div>

                <div className="campo">
                    <label>Image:</label>
                    {image ? (
                        <img
                            src={`http://localhost:5000/${image}`}
                            alt={image}
                            width="300"
                        />
                    ) : null}
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Edit Product"
                        disabled={productValidate()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditProduct;
