import React, {useState} from 'react';
import './editSurvey.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faTasks, faCheck, faBars} from "@fortawesome/free-solid-svg-icons";
import EditQuestion from "../editQuestionModal/EditQuestion";
import {surveyService} from "../../_services/surveyService";

const EditSurvey = () => {

    const [showQuestionTypes, setShowQuestionTypes] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    };

    const [status, setStatus] = useState("Saved");
    const saveQuestionForm = (formData) => {
        setShowModal(false);
        setStatus("Saving...");
        surveyService.saveQuestion(1, formData.get("question_text"), questionType, formData.getAll('answer'))
            .subscribe({
                next() {
                    setStatus("Saved");
                },
                error(error) {
                    console.log(error);
                    setStatus("Saving Error. Refresh the page and try again.");
                }
            });
    };

    const [questionType, setQuestionType] = useState('single-choice');
    const showQuestionModal = (type) => {
        setShowModal(true);
        setQuestionType(type);

    };

    return (
        <div className="container">
            <div>
                <div className="d-flex justify-content-around">
                    <div>
                        <h4>Survey title</h4>
                        Survey description
                    </div>
                    <div className="w-25">
                        <span>Status: {status}</span>
                    </div>
                </div>
               <div>
                   <div>
                       Question 1
                   </div>
                   <div>
                       Qeustion 2
                   </div>
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

                    <EditQuestion questionType={questionType} showModal={showModal} onClose={closeModal}
                                  onSave={saveQuestionForm}/>

                </div>
            </div>
        </div>
    );
};

export default EditSurvey;

