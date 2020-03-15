import React from 'react';
import './register.css';

class Register extends React.Component {
    render() {
        return (
            <form className="register-form">
                <h4 className="text-center font-italic font-weight-light">Free register</h4>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input required={true} type="username" className="form-control" id="username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input required={true} type="email" className="form-control" id="email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input required={true} type="password" className="form-control" id="password"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password-confirm">Password</label>
                    <input required={true} type="password-confirm" className="form-control" id="password-confirm"/>
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        );
    }
}

export default Register;
