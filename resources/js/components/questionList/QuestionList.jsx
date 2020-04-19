import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './questionList.css';
import EditQuestion from "../editQuestionModal/EditQuestion";
import {surveyService} from "../../_services/surveyService";
import Loader from 'react-loader-spinner';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const QuestionList = props => {
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
                error() {
                    props.onStatusChange("Error. Please refresh the page and try again.")
                }
            })
    };

    function deleteQuestion(questionId, e) {
        e.stopPropagation();
        alert("delete");
        setUpdating(true);
        alert("updating");
        setUpdating(false);
    }

    const [isTouch] = useState(('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
    const questionsList = props.questions.map((question, id) => {
        return (
            <div key={question.id} className="question-list-question">
                <h3 className="font-weight-bold"><span>{id + 1}: </span>{question.question_text}</h3>
                <textarea style={question.type !== 'text' ? {display: 'none'} : null} className="question-text-answer"/>
                <ul className="answers-list">

                    {question.answers.map(answer =>
                        <li key={answer.id}>
                            {answer.answer_text}
                        </li>
                    )}

                </ul>
                <div className={(props.editMode ? "edit-frame" : "d-none") + (isTouch ? " edit-frame-touch" : "")}
                     onClick={showEditModal.bind(this, question)}>
                    <div>Click to edit</div>
                    <div className="question-delete">
                        <div onClick={deleteQuestion.bind(this, question.id)}>
                            <h5>Delete</h5>
                            <FontAwesomeIcon icon={faTrash}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    });
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


