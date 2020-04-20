import React, {useEffect, useState} from 'react';
import './editSurvey.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faTasks, faCheck, faBars} from "@fortawesome/free-solid-svg-icons";
import EditQuestion from "../editQuestionModal/EditQuestion";
import {surveyService} from "../../_services/surveyService";
import EditSurveyForm from "./EditSurveyForm";
import {faInfo} from "@fortawesome/free-solid-svg-icons/faInfo";
import QuestionList from "../questionList/QuestionList";

const EditSurvey = () => {

    const [showQuestionTypes, setShowQuestionTypes] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    };

    const [status, setStatus] = useState("Saved.");
    const saveQuestionForm = (formData) => {
        setShowModal(false);
        setStatus("Saving...");
        surveyService.saveQuestion(1, formData.get("question_text"), questionType, formData.getAll('answer'))
            .subscribe({
                next() {
                    setStatus("Saved");
                    updateQuestions();
                },
                error() {
                    setStatus("Saving Error. Refresh the page and try again.");
                }
            });
    };

    const [questionType, setQuestionType] = useState('single-choice');
    const showQuestionModal = (type) => {
        setShowModal(true);
        setQuestionType(type);
    };

    const [questions, setQuestions] = useState([]);
    const [updatingQuestions, setUpdatingQuestions] = useState(true);
    function updateQuestions() {
        setUpdatingQuestions(true);
        surveyService.getSurveyQuestions(1).subscribe({
            next(response) {
                setQuestions(response.data);
                setUpdatingQuestions(false);
            }
        })
    }
    useEffect(() => {
        updateQuestions();
    }, []);


    return (
        <div className="container-md">
            <div>
                <div className="row border">
                    <div className="col-md-3 p-3 text-center">
                        <div className="dashed-line pb-3">
                            <FontAwesomeIcon icon={faInfo} size={'5x'}/>
                        </div>
                        <span className="text-black-50 font-weight-bold">Status: </span><span>{status}</span>
                    </div>
                    <div className="col-md-9">

                        <EditSurveyForm
                            onSaving={() => {
                                setStatus('Saving...')
                            }}
                            onSaved={() => {
                                setStatus('Saved.')
                            }}
                            onSavingError={(errorResponse) => {
                                errorResponse.status === 422 ? setStatus('Invalid Data.') : setStatus('Unknown error.')
                            }}/>

                    </div>
                </div>
                <div>

                    <QuestionList questions={questions} updatingQuestions={updatingQuestions} editMode={true} onStatusChange={(status) => {
                        updateQuestions();
                        setStatus(status);
                    }}/>

                </div>
                <div className="add-question">
                    <div className="dashed-line"/>
                    <div className="add-question-plus" onClick={() => setShowQuestionTypes(true)}>
                        <FontAwesomeIcon icon={faPlusCircle} size={"3x"}/>
                    </div>
                </div>
                <div className={"add-question-select-type text-center" + (showQuestionTypes ? "" : " d-none")}>
                    <div className="question-type" onClick={() => showQuestionModal('multiple-choice')}>
                        <FontAwesomeIcon icon={faTasks} size={"3x"}/>
                        <div>Multi select</div>
                    </div>
                    <div className="question-type" onClick={() => showQuestionModal('single-choice')}>
                        <FontAwesomeIcon icon={faCheck} size={"3x"}/>
                        <div>Single select</div>
                    </div>
                    <div className="question-type" onClick={() => showQuestionModal('text')}>
                        <FontAwesomeIcon icon={faBars} size={"3x"}/>
                        <div>Text answer</div>
                    </div>

                    {showModal && <EditQuestion questionType={questionType} showModal={showModal} onClose={closeModal}
                                                onSave={saveQuestionForm}/>
                    }

                </div>
            </div>
        </div>
    );
};

export default EditSurvey;

