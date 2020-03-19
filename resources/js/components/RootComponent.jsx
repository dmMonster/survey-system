import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header/Header.jsx";
import FeatureList from "./featureList/FeatureList";
import Footer from "./footer/Footer";
import Login from "./login/Login"
import {Provider} from 'react-redux';
import {
    Router,
    Route, Switch
} from 'react-router-dom';
import Dashboard from "./dashboard/Dashboard";
import store from "../store";
import PrivateRoute from "./privateRoute/PrivateRoute";
import {history} from '../history';



function RootComponent() {
    return (
        <div className="container-fluid">
            <Router history={history}>
                <Switch>
                    <Route path="/login">
                        <Login/>
                        <Header/>
                        <FeatureList/>
                    </Route>
                    <Route exact path="/">
                        <Header/>
                        <FeatureList/>
                    </Route>

                    <PrivateRoute path={"/dashboard"}>
                        <Dashboard/>
                    </PrivateRoute>

                </Switch>


                <Footer/>

            </Router>


        </div>
    );
}

export default RootComponent;

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={store}>
            <RootComponent/>
        </Provider>
        , document.getElementById('app'));
}
