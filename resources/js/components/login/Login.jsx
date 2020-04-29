import React, {useState} from 'react';
import './login.css';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearCredentials, login} from "../../actions";
import AuthAlert from "../authAlert/AuthAlert";

function Login() {

    const history = useHistory();

    const clickOutsideHandler = () => {
       closeLoginForm();
    };

    const closeLoginForm = () => {
        authDispatch(clearCredentials());
        history.push("/");
    };

    const stopPropagate = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const authDispatch = useDispatch();
    const authErrors = useSelector(state => state.authReducer.errors);

    const submitForm = (e) => {
        e.preventDefault();
        authDispatch(login(user));
    };

    return (
        <div className="login-modal" onClick={clickOutsideHandler}>
            <div className="login-modal-container" onClick={stopPropagate}>
                <AuthAlert errors={authErrors}/>
                <form className="p-3 rounded fade-in-form" onSubmit={submitForm}>
                    <div className="login-modal-close">
                        <div onClick={closeLoginForm}>&times;</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email"
                               placeholder="Enter email" onChange={(e) => {
                            {
                                setUser({...user, email: e.target.value})
                            }
                        }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password"
                               placeholder="Password" onChange={(e) => {
                            {
                                setUser({...user, password: e.target.value})
                            }
                        }}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
