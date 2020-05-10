import React from 'react';
import PropTypes from 'prop-types';

const RespondentList = props => {
    return (
        <ul className="list-group">
            {props.respondents.map(respondent => (
                <li key={respondent.id} className="list-group-item">
                    <span className="alert alert-secondary">{respondent.browser}</span>
                    <span className="alert alert-primary">{respondent.ip}</span>
                    <span className="alert alert-secondary">{respondent.system}</span>
                </li>
            ))}
        </ul>
    );
};

RespondentList.propTypes = {
    respondents: PropTypes.array.isRequired,
};

export default RespondentList;
