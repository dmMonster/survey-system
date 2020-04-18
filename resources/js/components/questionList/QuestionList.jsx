import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './questionList.css';
import EditQuestion from "../editQuestionModal/EditQuestion";
import {surveyService} from "../../_services/surveyService";
import Loader from 'react-loader-spinner';

const QuestionList = props => {
    const questionsList = props.questions.map((question, id) => {
        return (
            <div key={question.id} className="question-list-question">
                <h3 className="font-weight-bold"><span>{id + 1}: </span>{question.question_text}</h3>
                <textarea style={question.type !== 'text' ? {display: 'none'} : null} className="question-text-answer"/>
                <ul className="answers-list">
                    {question.answers.map(answer => <li key={answer.id}>
                        {answer.answer_text}
                    </li>)}
                </ul>
                <div className={props.editMode ? "edit-frame" : "d-none"} onClick={showEditModal.bind(this, question)}>
                    <div>Click to edit.</div>
                </div>
            </div>
        )
    });

    const [showModal, setShowModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState({});

    function showEditModal(question) {
        setEditingQuestion(question);
        setShowModal(true);
    }

    const [updating, setUpdating] = useState(false);
    const updateQuestion = (formData) => {
        setShowModal(false);
        setUpdating(true);
        props.onStatusChange("Update in progress...");
        surveyService.updateQuestion(formData.get('question_id'), formData.get('question_text'), formData.get('question_type'), formData.getAll('answer'))
            .subscribe({
                next() {
                    props.onStatusChange("Saved.");
                    setUpdating(false);
                },
                error(){props.onStatusChange("Error. Please refresh the page and try again.")}
            })
    };

    return (
        <div className="row m-auto">
            <div className="col-md-12">
                <div className="questions-container">
                    {updating || props.updatingQuestions ? (
                            <div className="text-center">
                                <Loader type={"Grid"} color={"#5f9aff"}/>
                            </div>
                        )
                        : questionsList
                    }
                </div>


            </div>
            {showModal === true && (
                <EditQuestion
                    questionType={"single-choice"}
                    currentQuestion={editingQuestion}
                    showModal={showModal}
                    onClose={() => {
                        setShowModal(false)
                    }}
                    onSave={updateQuestion}/>
            )}

        </div>
    );
};

QuestionList.propTypes = {
    questions: PropTypes.array.isRequired,
    /**
     * Edit question mode
     */
    editMode: PropTypes.bool,
    onStatusChange: PropTypes.func,
    updateQuestions: PropTypes.bool,
};

export default QuestionList;


