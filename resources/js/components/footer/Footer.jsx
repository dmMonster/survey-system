import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <footer className="row m-0 bg-dark text-white p-3">
            <div className="col-12 text-center">
                <a className="p-3" href="#">
                    <FontAwesomeIcon icon={faTwitter}  color={"#f2f4f4"} size={"lg"}/>
                </a>
                <a className="p-3" href="#">
                    <FontAwesomeIcon icon={faFacebook}  color={"#f2f4f4"} size={"lg"}/>
                </a>
                <a className="p-3" href="#">
                    <FontAwesomeIcon icon={faGoogle}  color={"#f2f4f4"} size={"lg"}/>
                </a>

            </div>
            <div className="col-12">
                <h6 className="text-center">© Copyright {new Date().getFullYear()} Survey System. All rights reserved.</h6>
            </div>
        </footer>
    );
};

export default Footer;
