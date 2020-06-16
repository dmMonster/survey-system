import React from 'react';
import './featureList.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPoll, faMapSigns, faHandsHelping, faTabletAlt} from "@fortawesome/free-solid-svg-icons";

const FeatureList = () => {
    return (
        <section className="container feature-list p-3">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        We are developing for you.
                    </h2>
                </div>
            </div>
            <div className="row m-3">
                <div className="col-md-3 text-center">
                    <FontAwesomeIcon icon={faMapSigns} size="6x"/>
                    <h4 className="mt-3">We're creating a new way</h4>
                    <h5 className="mt-3">This is our mission</h5>
                </div>
                <div className="col-md-3 text-center">
                    <FontAwesomeIcon icon={faPoll} size="6x"/>
                    <h4 className="mt-3">Survey templates</h4>
                    <h5 className="mt-3">You can use templates</h5>
                </div>
                <div className="col-md-3 text-center">
                    <FontAwesomeIcon icon={faHandsHelping} size="6x"/>
                    <h4 className="mt-3">Helpful support team</h4>
                    <h5 className="mt-3">
                        24/7 support Fast average response time 94% customer satisfaction
                    </h5>
                </div>
                <div className="col-md-3 text-center">
                    <FontAwesomeIcon icon={faTabletAlt} size="6x"/>
                    <h4 className="mt-3">Customer satisfaction</h4>
                    <h5 className="mt-3">Reach respondents on all devices. Collect more answers.</h5>
                </div>
            </div>

        </section>
    );
};

export default FeatureList;
