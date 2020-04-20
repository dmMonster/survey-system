import React, {useState} from 'react';
import './createSurvey.css';
import {surveyService} from "../../_services/surveyService";
import {useHistory} from "react-router-dom";
import SurveyAlert from "../surveyAlert/SurveyAlert";

const CreateSurvey = () => {

    const [survey, setSurvey] = useState({
        name: '',
        description: '',
        end_date: '0-0-0 0:0',
    });

    const handleInput = e => {
        setSurvey({
            ...survey,
            [e.target.name]: e.target.value,
        })
    };

    const handleDateTimeInput = e => {
        if (e.target.name === 'end_date') {
            setSurvey({
                ...survey,
                end_date: e.target.value + ' ' + survey.end_date.split(' ')[1],
            })
        } else if (e.target.name === 'end_time') {
            setSurvey({
                ...survey,
                end_date: survey.end_date.split(' ')[0] + ' ' + e.target.value + ':00',
            })
        }
    };

    const history = useHistory();
    const [errors, setErrors] = useState(Object);
    const createSurvey = (e) => {
        e.preventDefault();
        surveyService.createSurvey(survey).subscribe({
            next() {
                history.push("/dashboard/surveys-list");
            },
            error(error) {
                setErrors(error.response.data);
            }
        });
    };

    return (
        <div className="container">
            <h3 className="text-center">New Survey</h3>

            {Object.entries(errors).length !== 0 && <SurveyAlert errors={errors}/>}

            <form onSubmit={createSurvey} className="text-center survey-form survey-form-anim">
                <div className="form-group">
                    <label htmlFor="name">Survey name</label>
                    <input className="form-control" id="name" type="text" name="name" onChange={handleInput}
                           required={true}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Survey description</label>
                    <input className="form-control" id="description" type="text" name="description"
                           onChange={handleInput} required={true}/>
                </div>

                <div className="form-row">
                    <div className="col-md-4 m-auto">
                        <label htmlFor="end_date">End date</label>
                        <input className="form-control" id="end_date" type="date" name="end_date"
                               onChange={handleDateTimeInput} required={true}/>
                        <label htmlFor="end_time">End time</label>
                        <input className="form-control" id="end_time" type="time" name="end_time" required={true}
                               onChange={handleDateTimeInput}/>
                    </div>
                </div>

                <button className="survey-form-button">Create Survey</button>
            </form>
        </div>
    );
};

export default CreateSurvey;
