import React, {useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Loader from 'react-loader-spinner'
import {useDispatch, useSelector} from "react-redux";
import {getLoggedUser} from "../../actions";

const PrivateRoute = ({children, ...rest}) => {

    const isLoading = useSelector(state => state.authReducer.pending);
    const authenticated = useSelector(state => state.authReducer.authenticated);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLoggedUser());
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
                    (authenticated === true) ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {from: location}
                            }}
                        />
                    )
                }
            />
    );
};
export default PrivateRoute;

