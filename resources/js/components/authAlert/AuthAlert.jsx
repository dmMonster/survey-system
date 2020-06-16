import React from 'react';
import PropTypes from 'prop-types';
import './authAlert.css';

AuthAlert.propTypes = {
    errors: PropTypes.object,
};

function AuthAlert(props) {

    let errorList = [];
    if (props.errors) {
        Object.values(props.errors).forEach(value => {
            errorList.push(<li key={value}>{value[0]}</li>);
        });
    }


    return (
        <ul className="register-alert">
            {errorList}
        </ul>
    );
}

export default AuthAlert;
