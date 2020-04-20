import React from 'react';
import PropTypes from 'prop-types';

const SurveyAlert = (props) => {
    const errorList = () => {
        let errorList = [];
        for (let error in props.errors) {
            errorList.push(
                <div key={error} className="alert alert-danger alert-dismissible">
                    <button className="close" data-dismiss="alert" aria-label="close">&times;</button>
                    {props.errors[error]}
                </div>
            );
        }
        return errorList;
    };

    return (
        <div>
            {errorList()}
        </div>
    );
};

SurveyAlert.propTypes = {
    errors: PropTypes.object.isRequired,
};

export default SurveyAlert;




