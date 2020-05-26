import React, {useEffect, useState} from 'react';
import Chart from "../chart/Chart";
import AnswersList from "../surveyResultAnswersList/AnswersList";
import {useParams} from 'react-router-dom';
import RespondentList from "../respondentList/RespondentList";
import {surveyService} from "../../_services/surveyService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import RespondentFeedback from "../respondentFeedback";

const SurveyResult = () => {

    const [questions, setQuestions] = useState(null);
    const [survey, setSurvey] = useState({
        results_count: '...',
        end_date: '...'
    });
    const [showRespondents, setShowRespondent] = useState(false);

    let {id} = useParams();
    useEffect(() => {
        surveyService.getSurveyResult(id).subscribe({
           next(response){
               setQuestions(response.data.questions);
               setSurvey({
                   results_count: response.data.results_count,
                   end_date: response.data.end_date
               })
           },
            error(){alert('Loading error Refresh the application page.')}
        });
    }, []);

    const [respondents, setRespondents] = useState([]);
    const seeRespondents = () => {
        if (showRespondents === true) {
            setShowRespondent(false);
        } else {
           surveyService.getRespondents(id).subscribe({
               next(response){
                   setRespondents(response.data);
               },
               error(){alert("Loading error Refresh the application page.")}
           })
        }
    };

    useEffect(() => {
        if (respondents.length > 0) {
            setShowRespondent(true);
        }
    }, [respondents]);


    const [rating, setRating] = useState({
        average_rating: 0,
        opinions: []
    });
    useEffect(() => {
        surveyService.getSurveyRating(id).subscribe({
            next(response){
                setRating(response.data);
            },
            error(error){console.log('Error loading ratings: ',error.response.data.message)}
        })
    },[]);

    const [showOpinion, setShowOpinion] = useState(false);
    const toggleShowOpinion = () => {
      if(showOpinion === false) {
          setShowOpinion(true);
      }  else {
          setShowOpinion(false);
      }
    };

    return (
        <div>

            <div className="jumbotron">
                <h2>Survey stats</h2>
                <ul className="list-group">
                    <li className="list-group-item">
                        Number of responses: {survey.results_count}
                    </li>
                    <li className="list-group-item">
                        Cutoff date and time: {survey.end_date}
                    </li>
                    <li className="list-group-item">
                        <span>Average rating: </span>
                        <span>{rating.average_rating}</span>
                        <FontAwesomeIcon icon={faStar} color={'#bda20e'}/>
                        <button onClick={toggleShowOpinion} className="btn btn-outline-info ml-2">Click to show opinions({rating.opinions.length})</button>

                        {!!showOpinion &&  <RespondentFeedback opinions={rating.opinions}/>}

                    </li>
                </ul>
                <div className="d-flex justify-content-center m-3">
                    <button onClick={seeRespondents} className="btn btn-primary btn-lg">{!showRespondents ? 'See respondents' : 'Hide list' }</button>
                </div>
                {showRespondents && <RespondentList respondents={respondents}/>}
            </div>

            {questions && (
                questions.map(question => {
                    return (
                        <div key={question.id}>
                            {question.type !== 'text' ? (
                                    <Chart title={question.question_text}
                                           labels={question.answers.map(v => v.answer_text)}
                                           dataset={question.answers.map(v => v.given_answers_count)}/>)
                                : <AnswersList question={question.question_text}
                                               answers={question.text_answers.map(v => v.text_answer)}/>
                            }
                        </div>
                    )
                })
            )}


        </div>
    );
};

export default SurveyResult;
