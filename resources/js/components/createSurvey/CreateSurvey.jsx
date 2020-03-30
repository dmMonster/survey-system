import React, {useState} from 'react';
import './createSurvey.css';

const CreateSurvey = () => {

    const [survey, setSurvey] = useState({
        name: '',
        description: '',
        end_date: '',
    });

    const createSurvey = (e) => {
        e.preventDefault();
        console.log(e.target);
    };

    return (
        <div className="container">
            <form onSubmit={createSurvey} className="text-center survey-form">
                <div className="form-group">
                    <label htmlFor="name">Survey name</label>
                    <input className="form-control" id="name" type="text" name="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Survey description</label>
                    <input className="form-control" id="description" type="text" name="description"/>
                </div>

                <div className="form-row">
                    <div className="col-md-4 m-auto">
                        <label htmlFor="end_date">End date</label>
                        <input className="form-control" id="end_date" type="date" name="end_date"/>
                        <label htmlFor="end_time">Survey name</label>
                        <input className="form-control" id="end_time" type="time" name="end_time"/>
                    </div>
                </div>




                <button className="survey-form-button">Create Survey</button>
            </form>
        </div>
    );
};

export default CreateSurvey;
