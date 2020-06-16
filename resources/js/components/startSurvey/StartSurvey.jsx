import React, {useEffect, useState} from 'react';
import QuestionList from "../questionList/QuestionList";
import {surveyService} from "../../_services/surveyService";
import './startSurvey.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPollH} from "@fortawesome/free-solid-svg-icons";
import {useParams, useHistory} from 'react-router-dom';
import Loader from 'react-loader-spinner'

function StartSurvey() {

    const [survey, setSurvey] = useState({
        questions: [],
    });

    let {token} = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        setLoading(true);
        surveyService.startSurvey(token).subscribe({
            next(res) {
                setSurvey(res.data)
            },
            error(error) {
                setError(error.response.data);
                setLoading(false);
            },
            complete(){setLoading(false)}
        })
    }, []);

    const history = useHistory();
    function saveResult(responses) {
        surveyService.collectAnswers(responses, survey.id).subscribe({
            next() {
                history.push('/surveys/' + survey.token + '/respondent-opinion')
            },
            error(error) {
                setError(error.response.data);
            }
        })
    }

    const loader = (
        <div className='text-center'>
            <Loader type="TailSpin" color="#00BFFF" height={250} width={250} />
        </div>
    );

    return (
        <div className="container">
            {loading ? loader :(<div>
                <div className="jumbotron">
                    <h1 className="survey-name">
                        <FontAwesomeIcon icon={faPollH} size={"4x"}
                                         color={"rgba(49,176,255,0.78)"}/>
                        {!error ? ("Survey name:" + survey.name) : (
                            <div className="alert alert-danger">The survey is probably over</div>)}
                    </h1>
                    <p className="survey-description">
                        {survey.description}
                    </p>
                </div>
                {!error && (<div className="survey-questions">
                    <QuestionList questions={survey.questions} onSaveAnswers={saveResult}/>
                </div>)}
            </div>)}
        </div>
    )
}

export default StartSurvey;
