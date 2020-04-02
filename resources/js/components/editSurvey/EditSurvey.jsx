import React, {useState} from 'react';
import './editSurvey.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faTasks, faCheck, faBars} from "@fortawesome/free-solid-svg-icons";

const EditSurvey = () => {

    const [showQuestionTypes, setShowQuestionTypes] = useState(false);
    return (
        <div className="container">
            <div>
                <div className="add-question">
                    <div className="dashed-line"/>
                    <div className="add-question-plus" onClick={() => setShowQuestionTypes(true)}>
                        <FontAwesomeIcon icon={faPlusCircle} size={"3x"}/>
                    </div>
                </div>
                <div className={"add-question-select-type text-center" + (showQuestionTypes ? "" : " d-none")}>
                    <div className="question-type">
                        <FontAwesomeIcon icon={faTasks} size={"3x"}/>
                        <div>Multi select</div>
                    </div>
                    <div className="question-type">
                        <FontAwesomeIcon icon={faCheck} size={"3x"}/>
                        <div>Single select</div>
                    </div>
                    <div className="question-type">
                        <FontAwesomeIcon icon={faBars} size={"3x"}/>
                        <div>Text answer</div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EditSurvey;

