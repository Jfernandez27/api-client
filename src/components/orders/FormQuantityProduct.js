import React from 'react';

function FormQuantityProduct(props) {
    const {
        index,
        product,
        decreaseProducts,
        increaseProducts,
        deleteOrderProduct,
    } = props;
    return (
        <li>
            <div className="texto-producto">
                <p className="nombre">{product.name}</p>
                <p className="precio">$ {product.price}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i
                        className="fas fa-minus"
                        onClick={() => decreaseProducts(index)}
                    ></i>
                    <p>{product.quantity}</p>
                    <input type="hidden" name="quantity" />
                    <i
                        className="fas fa-plus"
                        onClick={() => increaseProducts(index)}
                    ></i>
                </div>
                <button
                    type="button"
                    className="btn btn-rojo"
                    onClick={() => deleteOrderProduct(product.product)}
                >
                    <i className="fas fa-minus-circle"></i>
                    Delete Product
                </button>
            </div>
        </li>
    );
}

export default FormQuantityProduct;
