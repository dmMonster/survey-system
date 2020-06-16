import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import {surveyService} from "../../_services/surveyService";

function DeleteSurvey() {
    let {id} = useParams();

    const history = useHistory();

    const cancelDelete = () => {
        history.goBack();
    };

    const deleteSurvey = () => {
        surveyService.deleteSurvey(id).subscribe({
            next() {history.goBack()},
            error(error){console.log(error.response.data); alert("Deleting error. Try again.")}
        })
    };

    return (
        <div className="container">
            <div>
                <h4 className="text-center">Are you sure?</h4>
                <div className="d-flex justify-content-center">
                    <button onClick={cancelDelete} className="btn btn-outline-info m-3 p-3">Cancel</button>
                    <button onClick={deleteSurvey} className="btn btn-danger m-3 p-3">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteSurvey;
