import React from 'react';
import {useHistory, Route, Link} from "react-router-dom";
import {authService} from "../../_services/authService";
import UserList from "../userList/UserList.jsx";
import EditUser from "../editUser/EditUser";
import DeleteUser from "../deleteUser/DeleteUser";
import CreateSurvey from "../createSurvey/CreateSurvey";
import EditSurvey from "../editSurvey/EditSurvey";
import SurveyList from "../surveyList/SurveyList";
import DeleteSurvey from "../surveyList/DeleteSurvey";
import CollectAnswers from "../collectAnswers/CollectAnswers";
import {useSelector} from "react-redux";
import './mainNavigation.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faClipboardList,
    faIdCard,
    faPlusCircle,
    faSignOutAlt,
    faUsers
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {

    const history = useHistory();

    const logout = () => {
        authService.logout().then(() => {
            history.push("/");
        });
    };

    const user = useSelector(state => state.authReducer.user);

    return (
        <div>
            <nav className="navigation">
                <div>
                    <Link className="navigation-main-page" to={"/"}>
                        Dashboard
                    </Link>
                </div>
                <div className="navigation-options">
                    <Link className="navigation-profile" to={"/dashboard/users/" + user.id + "/edit"}>
                        <FontAwesomeIcon icon={faIdCard}/>
                        {user.name}
                    </Link>
                    <div className="navigation-sing-out" onClick={logout}>
                        <FontAwesomeIcon icon={faSignOutAlt} size={'2x'}/>
                        Logout
                    </div>
                </div>
            </nav>

            <div className="dashboard-container container-md">
                <nav className="survey-navigation">

                    <Link className="survey-navigation-link" to={"/dashboard/surveys/add"}>
                        <FontAwesomeIcon icon={faPlusCircle} size={"4x"}/>
                        <span className="">Create Survey</span>
                    </Link>

                    <Link className="survey-navigation-link" to={"/dashboard/surveys-list"}>
                        <FontAwesomeIcon icon={faClipboardList} size={"4x"}/>
                        <span>Survey List</span>
                    </Link>

                    <Link className="survey-navigation-link" to={"/dashboard/userList"}>
                        <FontAwesomeIcon icon={faUsers} size={"4x"}/>
                        <span>UserList</span>
                    </Link>
                </nav>
                <hr/>

                <Route path={"/dashboard/userList"}>
                    <UserList/>
                </Route>
                <Route path={"/dashboard/users/:id/edit"}>
                    <EditUser/>
                </Route>
                <Route path={"/dashboard/users/:id/delete"}>
                    <DeleteUser/>
                </Route>
                <Route path={"/dashboard/surveys/add"}>
                    <CreateSurvey/>
                </Route>
                <Route path={"/dashboard/surveys/:id/edit"}>
                    <EditSurvey/>
                </Route>
                <Route path={"/dashboard/surveys/:id/delete"}>
                    <DeleteSurvey/>
                </Route>
                <Route path={"/dashboard/surveys/share/:token"}>
                    <CollectAnswers/>
                </Route>
                <Route path={"/dashboard/surveys-list"}>
                    <SurveyList/>
                </Route>

            </div>
        </div>
    );
};

export default Dashboard;
