import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import axiosClient from '../../config/axios';

function NewProduct({ history }) {
    let [product, saveProduct] = useState({
        name: '',
        price: '',
    });

    let [file, saveFile] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('image', file);

        try {
            const res = await axiosClient.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200) {
                Swal.fire({
                    title: 'Product Added',
                    text: res.data.message,
                    icon: 'success',
                });
                history.push('/products');
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
            <h2>New Product</h2>

            <form onSubmit={handleSubmit}>
                <legend>Fill in all fields</legend>

                <div className="campo">
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Name Product"
                        name="name"
                        onChange={handleChange}
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
                    />
                </div>

                <div className="campo">
                    <label>Image:</label>
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
                        value="Add Product"
                        disabled={productValidate()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default withRouter(NewProduct);
