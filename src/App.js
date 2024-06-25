import { Fragment } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/*** Layout ***/
import Header from './components/layout/Header';
import Nav from './components/layout/Navegation';

/**  Components **/
import Customer from './components/customers/Customers';
import NewCustomer from './components/customers/NewCustomer';
import EditCustomer from './components/customers/EditCustomer';

import Products from './components/products/Products';
import NewProduct from './components/products/NewProduct';
import EditProduct from './components/products/EditProduct';

import Orders from './components/orders/Orders';

function App() {
    return (
        <Router>
            <Fragment>
                <Header />
                <div className="grid contenedor contenido-principal">
                    <Nav />
                    <main className="caja-contenido col-9">
                        <Switch>
                            {/* Customers  */}
                            <Route exact path="/" component={Customer} />
                            <Route
                                exact
                                path="/customers/new"
                                component={NewCustomer}
                            />
                            <Route
                                exact
                                path="/customers/edit/:id"
                                component={EditCustomer}
                            />
                            {/* Products  */}
                            <Route
                                exact
                                path="/products"
                                component={Products}
                            />
                            <Route
                                exact
                                path="/products/new"
                                component={NewProduct}
                            />
                            <Route
                                exact
                                path="/products/edit/:id"
                                component={EditProduct}
                            />

                            {/* Orders  */}
                            <Route exact path="/orders" component={Orders} />
                        </Switch>
                    </main>
                </div>
            </Fragment>
        </Router>
    );
}

export default App;
