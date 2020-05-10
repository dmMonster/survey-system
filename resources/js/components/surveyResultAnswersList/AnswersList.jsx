import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './answersList.css';

const AnswersList = props => {
    const [collapsed, setCollapsed] = useState(true);
    const collapseToggle = () => {
        if(collapsed === true) {
            setCollapsed(false);
        } else {
            setCollapsed(true);
        }
    };
    return (
        <div className="card mb-3">
            <h2 className="text-center card-header">{props.question}</h2>
            <div className="card-body">
                <h5 onClick={collapseToggle} className="alert alert-secondary btn-see-answers">See answers</h5>
                <ul className={'list-group ' + (collapsed ? 'd-none' : null)}>
                    {props.answers.map((answer,id) => (
                        <div className="list-group-item" key={id}>{answer}</div>
                    ))}
                </ul>

            </div>
        </div>
    );
};

AnswersList.propTypes = {
    question: PropTypes.string.isRequired,
    answers: PropTypes.array.isRequired,
};

export default AnswersList;
