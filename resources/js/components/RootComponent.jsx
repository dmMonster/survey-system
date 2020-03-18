import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header/Header.jsx";
import FeatureList from "./featureList/FeatureList";
import Footer from "./footer/Footer";
import Login from "./login/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";


function RootComponent() {
    return (
        <div className="container-fluid">
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/login">Public Page</Link>
                        </li>
                    </ul>

                    <Switch>
                        <Route path="/login">
                            <Login/>
                        </Route>
                    </Switch>
                </div>
            </Router>

            <Header/>
            <FeatureList/>
            <Footer/>
        </div>
    );
}

export default RootComponent;

if (document.getElementById('app')) {
    ReactDOM.render(<RootComponent/>, document.getElementById('app'));
}
