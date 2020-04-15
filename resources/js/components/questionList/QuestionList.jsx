import React from 'react';
import PropTypes from 'prop-types';
import './questionList.css';

const QuestionList = props => {

    const questionsList = props.questions.map((question, id) => {
        return(
            <div key={question.id} className="question-list-question">
                <h3 className="font-weight-bold"><span>{id + 1}: </span>{question.question_text}</h3>
                <textarea style={question.type !== 'text'? {display: 'none'} : null} className="question-text-answer"/>
                <ul className="answers-list">
                    {question.answers.map(answer => <li key={answer.id}>
                        {answer.answer_text}
                    </li>)}
                </ul>
            </div>
        )
    });
    return (
        <div className="row m-auto">
            <div className="col-md-12">
                <div className="questions-container">
                    {questionsList}
                </div>

            </div>
        </div>
    );
};

QuestionList.propTypes = {

};

export default QuestionList;


