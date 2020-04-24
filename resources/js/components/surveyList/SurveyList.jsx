import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faPencilAlt, faTrash, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import './surveyList.css';
import {surveyService} from "../../_services/surveyService";
import Loader from 'react-loader-spinner'
import {Link} from "react-router-dom";

const SurveyList = () => {

    const [surveys, setSurveys] = useState(null);
    useEffect(() => {
        surveyService.getMySurveys().subscribe({
            next(response) {
                setSurveys(response.data);
            },
            error() {
                alert("Loading Error")
            }
        })
    }, []);

    const surveyList = (surveys !==null ? surveys : []).map((survey) => {
        return (
            <tr key={survey.id}>
                <td>
                    {survey.name}
                </td>
                <td className="action-section">
                    <div className="d-flex justify-content-end flex-nowrap">
                        <Link to={"/dashboard/surveys/" + survey.id + "/edit"}>
                            <div className="action-link">
                                <FontAwesomeIcon icon={faPencilAlt} color={"#5159d2"} size={"2x"}/>
                                <div>Edit</div>
                            </div>
                        </Link>
                        <Link to={"/dashboard/surveys/share/" + survey.token}>
                            <div className="action-link">
                                <FontAwesomeIcon icon={faUserFriends} color={"#388016"} size={"2x"}/>
                                <div>Get Responses</div>
                            </div>
                        </Link>
                        <Link to={"#"}>
                            <div className="action-link">
                                <FontAwesomeIcon icon={faChartLine} color={"#388016"} size={"2x"}/>
                                <div>Analyze Results</div>
                            </div>
                        </Link>
                        <Link to={"/dashboard/surveys/" + survey.id + "/delete"}>
                            <div className="action-link">
                                <FontAwesomeIcon icon={faTrash} color={"#df6c62"} size={"2x"}/>
                                <div>Delete</div>
                            </div>
                        </Link>
                    </div>
                </td>
            </tr>
        )
    });

    return (
        <div className="container">
            <h3 className="text-center font-weight-bold">Survey List</h3>
            <table className="table table-striped text-center table-bordered">
                <thead>
                <tr className="bg-primary text-white">
                    <th>
                        Your current surveys
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {surveys !== null ? surveyList : <tr>
                    <td><Loader type="Rings" color={"#1aa878"}/></td>
                </tr>}
                </tbody>
            </table>
        </div>
    );
};

export default SurveyList;
