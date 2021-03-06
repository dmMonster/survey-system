import React, {Component} from 'react';
import './header.css';
import Register from "../register/Register";
import blackTablet from '../../../images/gray_laptop.jpg'
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <section className="header-section">
                <header>
                    <nav className="header-nav d-flex justify-content-between">
                        <div className="logo">
                            LOGO<br/>
                            <img src="https://via.placeholder.com/150" alt="survey system logo"/>
                        </div>
                        <div>
                            <Link to="/login">
                                <button className="btn btn-outline-info btn-lg text-white">Login</button>
                            </Link>
                        </div>
                    </nav>

                    <div className="row justify-content-lg-center m-0">
                        <div className="title col-md-5 offset-1">
                            <h1 className="pb-3">Online surveys for free</h1>
                            <h5 className="font-italic">Modern surveys for everyone </h5>
                            <img className="header-image" src={blackTablet} alt="laptop"/>
                        </div>
                        <div className="col-lg-4 col-md-5 offset-1">
                            <Register/>
                        </div>
                    </div>


                </header>
            </section>
        );
    }
}

export default Header;
