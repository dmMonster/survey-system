import React, {useEffect, useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {authService} from "../../_services/authService";
import Loader from 'react-loader-spinner'

const PrivateRoute = ({children, ...rest}) => {

    const [isLoading, setLoading] = useState(true);
    const [isLogged, setLogged] = useState(true);

    useEffect(() => {
        authService.isLogged().then(response => {
            setLogged(response.data);
            setLoading(false);
        })
    }, []);

    return (
        isLoading ?
            <div className="loader">
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            </div>
            :
            <Route
                {...rest}
                render={({location}) =>
                    isLogged ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {from: location}
                            }}
                        />
                    )
                }
            />
    );
};
export default PrivateRoute;

