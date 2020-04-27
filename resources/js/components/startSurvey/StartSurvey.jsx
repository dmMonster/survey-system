import React, {useEffect, useState} from 'react';
import QuestionList from "../questionList/QuestionList";
import {surveyService} from "../../_services/surveyService";
import './startSurvey.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPollH} from "@fortawesome/free-solid-svg-icons";
import {useParams} from 'react-router-dom';

function StartSurvey() {

    const [survey, setSurvey] = useState({
        questions: [],
    });

    let {token} = useParams();
    useEffect(() => {
        surveyService.startSurvey(token).subscribe({
            next(res) {
                setSurvey(res.data)
            }
        })
    }, []);

    function saveResult(responses) {
        console.log(responses);
        axios.post("/api/results",{
            survey_id: survey.id,
            responses: responses,
        })
    }


    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="survey-name">
                    <FontAwesomeIcon icon={faPollH} size={"4x"}
                                     color={"rgba(49,176,255,0.78)"}/>
                    Survey name: {survey.name}
                </h1>
                <p className="survey-description">
                    {survey.description}
                </p>
            </div>
            <div className="survey-questions">
                <QuestionList questions={survey.questions} onSaveAnswers={saveResult}
                />
            </div>
        </div>
    )
}

export default StartSurvey;
