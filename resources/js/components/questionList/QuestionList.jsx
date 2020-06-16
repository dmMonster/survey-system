import React, {useEffect, useState} from 'react';
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
        setUpdating(true);
        props.onStatusChange("Update in progress...");
        surveyService.deleteQuestion(questionId).subscribe({
            next() {
                props.onStatusChange("Saved.")
            },
            error() {
                props.onStatusChange("Deleting error. Try again.")
            },
            complete() {
                setUpdating(false)
            }
        })
    }

    const [responses, setResponses] = useState({
        // 1: {answerIds: [1], answerText: ''},
    });

    const SINGLE_CHOICE = 'single-choice';
    const MULTIPLE_CHOICE = 'multiple-choice';
    const TEXT_ANSWER = 'text';

    function selectAnswer(questionType, questionId, answerId, e) {

        let answers = new Set();
        let textAnswer = e.target.value;
        if (questionType !== TEXT_ANSWER) {
            answers.add(answerId);
            textAnswer = "";
        }

        if (questionType === MULTIPLE_CHOICE && responses[questionId]) {
            for (let answer of responses[questionId].answerIds) {
                if (answer === answerId) {
                    answers.delete(answerId);
                } else {
                    answers.add(answer);
                }
            }

        }
        setResponses({
            ...responses,
            [questionId]: {answerIds: [...answers], answerText: textAnswer},
        });
    }

    function isSelected(questionId, answerId) {
        if (responses[questionId]) {
            return responses[questionId].answerIds.indexOf(answerId);
        } else {
            return -1;
        }
    }

    function answerTip(questionType) {
        switch (questionType) {
            case SINGLE_CHOICE:
                return 'Select one answer';
            case MULTIPLE_CHOICE:
                return 'Select one or more answers';
            default:
                return 'Enter the answer'
        }

    }

    const [showAlert, setShowAlert] = useState(false);
    const [missingAnswers, setMissingAnswers] = useState([]);
    const saveAnswers = () => {
        setShowAlert(false);
        let requiredQuestionIds = [];
        for (let question of props.questions) {

            if (!responses.hasOwnProperty(question.id) || (responses[question.id].answerIds.length === 0 && responses[question.id].answerText.length === 0)) {
                requiredQuestionIds.push(question.id);
            }
        }
        if (requiredQuestionIds.length < 1) {
            props.onSaveAnswers(responses);
        }
        setMissingAnswers(requiredQuestionIds);
    };

    useEffect(() => {
        if(missingAnswers.length > 0) {
            window.scrollTo({top: 0, behavior: "smooth"});
            setShowAlert(true);
        }
    }, [missingAnswers]);

    const [isTouch] = useState(('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
    const questionsList = props.questions.map((question, id) =>
        (
            <div key={question.id}
                 className={"question-list-question " + ((missingAnswers && missingAnswers.indexOf(question.id) !== -1) ? "missing-answer" : "")}>
                <h3 className="font-weight-bold"><span>{id + 1}: </span>{question.question_text}</h3>
                <h5 className="text-secondary">{answerTip.call(this, question.type)}</h5>
                <textarea style={question.type !== 'text' ? {display: 'none'} : null} className="question-text-answer"
                          onChange={selectAnswer.bind(this, question.type, question.id, -1)}/>
                <ul className="answers-list">
                    {question.answers.map(answer =>
                        <li key={answer.id} onClick={selectAnswer.bind(this, question.type, question.id, answer.id)}
                            style={
                                isSelected(question.id, answer.id) > -1 ? {color: 'red'} : {}
                            }>
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
    );

    return (
        <div className="row m-auto">
            <div className={showAlert ? "missing-answer-alert" : "d-none"}>
                Please complete all the questions
            </div>
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
                {!props.editMode && (<div className="d-flex justify-content-center border-top border-secondary">
                    <button className="btn btn-success btn-lg w-50 m-1" onClick={saveAnswers}>
                        Save
                    </button>
                </div>)}
            </div>
            {showModal === true && (
                <EditQuestion
                    questionType={SINGLE_CHOICE}
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
    saveAnswers: PropTypes.func,
    /**
     * Edit question mode
     */
    editMode: PropTypes.bool,
    onStatusChange: PropTypes.func,
    updateQuestions: PropTypes.bool,
};

export default QuestionList;


