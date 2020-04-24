import React, {useEffect, useState} from 'react';
import QuestionList from "../questionList/QuestionList";
import {surveyService} from "../../_services/surveyService";

function StartSurvey() {

    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        surveyService.getSurveyQuestions(1).subscribe({
            next(res){setQuestions(res.data)}
        })
    },[]);


    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <QuestionList questions={questions}/>
                </div>
            </div>
        </div>
    )
}

export default StartSurvey;
