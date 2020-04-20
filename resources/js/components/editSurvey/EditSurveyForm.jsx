import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useParams} from "react-router-dom";
import {surveyService} from "../../_services/surveyService";

const EditSurveyForm = props => {

    const [editingSurvey, setEditingSurvey] = useState({
        name: '',
        description: '',
        end_date: '',
    });
    const handleDateTimeInput = e => {
        if (e.target.name === 'end_date') {
            setEditingSurvey({
                ...editingSurvey,
                end_date: e.target.value + ' ' + editingSurvey.end_date.split(' ')[1],
            })
        } else if (e.target.name === 'end_time') {
            setEditingSurvey({
                ...editingSurvey,
                end_date: editingSurvey.end_date.split(' ')[0] + ' ' + e.target.value + ':00',
            })
        }
    };

    const handleTextInputChanges = (e) => {
        setEditingSurvey({
            ...editingSurvey,
            [e.target.name]: e.target.value,
        });
    };

    let {id} = useParams();
    useEffect(() => {
        surveyService.getMySurveys().subscribe({
            next(response) {
                setEditingSurvey(response.data.find((survey) => {
                    return survey.id === parseInt(id);
                }));
            }
        })
    }, []);

    const saveSurvey = (e) => {
        e.preventDefault();
        props.onSaving();
        surveyService.updateSurvey(editingSurvey).subscribe({
            next() {
                props.onSaved();
            },
            error(errors){
                props.onSavingError(errors.response);
            }
        })
    };
    return (
        <>
            <form onSubmit={saveSurvey} className="mt-3 p-3">
                <div className="form-group">
                    <label htmlFor="name">Survey name: </label>
                    <input name="name" id="name" className="form-control" required={true} type="text"
                           defaultValue={editingSurvey.name} onChange={handleTextInputChanges}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Survey description: </label>
                    <input name="description" id="description" className="form-control" required={true}
                           type="text" defaultValue={editingSurvey.description} onChange={handleTextInputChanges}/>
                </div>
                <div className="form-row mb-3">
                    <div className="col-md-12 m-auto">
                        <label htmlFor="end_date">End date</label>
                        <input className="form-control" id="end_date" type="date" name="end_date"
                               onChange={handleDateTimeInput} required={true}
                               defaultValue={editingSurvey.end_date.split(' ')[0]}/>
                        <label htmlFor="end_time">End time</label>
                        <input className="form-control" id="end_time" type="time" name="end_time" required={true}
                               defaultValue={editingSurvey.end_date  && editingSurvey.end_date.split(' ')[1].slice(0,5)}
                               onChange={handleDateTimeInput}/>
                    </div>
                </div>
                <button className="btn btn-lg btn-outline-success">Save</button>
            </form>
        </>
    );
};

EditSurveyForm.propTypes = {
    onSaving: PropTypes.func.isRequired,
    onSaved: PropTypes.func.isRequired,
    onSavingError: PropTypes.func.isRequired,
};

export default EditSurveyForm;
