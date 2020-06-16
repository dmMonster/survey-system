import React from 'react';
import PropTypes from 'prop-types';

const RespondentFeedback = props => {
    return (
        <ul>
            {props.opinions.map((opinion) =>
                <li key={opinion.id}>
                    {opinion.description}
                </li>
            )}
        </ul>
    );
};

RespondentFeedback.propTypes = {
    opinions: PropTypes.array.isRequired
};

export default RespondentFeedback;
