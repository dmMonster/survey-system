import React, {useRef, useState} from 'react';
import './register.css';
import AuthAlert from "../authAlert/AuthAlert";
import {useHistory} from "react-router-dom";

function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    };

    const [registerErrors, setRegisterErrors] = useState(null);

    const  history = useHistory();

    const register = (e) => {
        e.preventDefault();


        fetch("/api/register", {
            method: "post",
            headers: {
                accept: 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((response) => {
                    if (response.status === 201) {
                        history.push("/dashboard");
                    } else if(response.status === 422){
                        response.json().then(response => {
                            setRegisterErrors(response.errors);
                        })
                    }

                }
            )

    };

    const refPass = useRef(null);

    const checkPassConfirm = (e) => {
        if (refPass.current.value !== e.target.value) {
            e.target.setCustomValidity("Your password and confirmation password do not match.");
        } else {
            e.target.setCustomValidity("");
        }

    };

    return (
        <form className="register-form" onSubmit={register}>
            <h4 className="text-center font-italic font-weight-light">Free register</h4>
            <AuthAlert errors={registerErrors}/>
            <div className="form-group">
                <label htmlFor="username">Name</label>
                <input required={true} type="username" className="form-control" id="username" name={"name"}
                       onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input required={true} type="email" className="form-control" id="email" name={"email"}
                       onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input ref={refPass} required={true} minLength={8} type="password" className="form-control"
                       id="password"
                       name={"password"}
                       onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="password-confirm">Confirm password</label>
                <input onInput={checkPassConfirm} required={true} minLength={8}
                       type="password" className="form-control" id="password-confirm"
                       name={"password_confirmation"} onChange={handleChange}/>
            </div>

            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    );
}

export default Register;
