import React from 'react';

function FormProductSearch(props) {
    return (
        <form onSubmit={props.searchProduct}>
            <legend>Search for a Product and add a quantity</legend>

            <div className="campo">
                <label>Products:</label>
                <input
                    type="text"
                    placeholder="Products Name"
                    name="products"
                    onChange={props.readDataSeach}
                />
            </div>

            <input
                type="submit"
                className="btn btn-azul btn-block"
                value="Search Product"
            />
        </form>
    );
}

export default FormProductSearch;
