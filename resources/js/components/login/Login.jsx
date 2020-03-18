import React from 'react';
import './login.css';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";

function Login(props) {

    let history = useHistory();

    const clickOutsideHandler = () => {
        history.push("/");
    };

    const stopPropagate = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };

    return (
        <div className="login-modal" onClick={clickOutsideHandler}>
            <div className="login-modal-container" onClick={stopPropagate}>
                <form className="p-3 rounded fade-in-form">
                    <div className="login-modal-close">
                        <Link to={"/"}>&times;</Link>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                               placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
