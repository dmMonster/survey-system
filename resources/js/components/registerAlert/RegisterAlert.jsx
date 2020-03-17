import React from 'react';
import PropTypes from 'prop-types';
import './registerAlert.css';

RegisterAlert.propTypes = {
    errors: PropTypes.object,
};

function RegisterAlert(props) {

    let errorList = [];
    if (props.errors !== null) {
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

export default RegisterAlert;
