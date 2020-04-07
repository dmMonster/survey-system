import React, {useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faPencilAlt, faTrash, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import './surveyList.css';

const SurveyList = () => {

    useEffect(() => {

    }, []);
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
                <tr>
                    <td>
                        Survey 1
                    </td>
                    <td>
                        <div className="d-flex justify-content-end flex-nowrap">
                            <div className="action-link">
                                <FontAwesomeIcon icon={faPencilAlt} color={"#5159d2"} size={"2x"}/>
                                <div>Edit</div>
                            </div>
                            <div className="action-link">
                                <FontAwesomeIcon icon={faUserFriends} color={"#388016"} size={"2x"}/>
                                <div>Collect Answers</div>
                            </div>
                            <div className="action-link">
                                <FontAwesomeIcon icon={faChartLine} color={"#388016"} size={"2x"}/>
                                <div>Analyze Results</div>
                            </div>
                            <div className="action-link">
                                <FontAwesomeIcon icon={faTrash} color={"#df6c62"} size={"2x"}/>
                                <div>Delete</div>
                            </div>
                        </div>


                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SurveyList;
