import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header/Header.jsx";
import FeatureList from "./featureList/FeatureList";
import Footer from "./footer/Footer";
import Login from "./login/Login"
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom';

function RootComponent() {
    return (
        <div className="container-fluid">
            <Router>
                <Header/>

                <Switch>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/">

                    </Route>

                </Switch>

                <FeatureList/>
                <Footer/>

            </Router>


        </div>
    );
}

export default RootComponent;

if (document.getElementById('app')) {
    ReactDOM.render(<RootComponent/>, document.getElementById('app'));
}
