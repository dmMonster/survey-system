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
            {"user: " + user.name + " | "}
            Dashboard
            <button onClick={logout} className="btn btn-outline-info btn-lg text-black-50">Logout</button>

            <Link to={"/dashboard/surveys/add"} >
                <button className="btn btn-primary">Create Survey</button>
            </Link>

            <Link to={"/dashboard/userList"} >
                <button className="btn btn-primary">UserList</button>
            </Link>

            <Link to={"/dashboard/surveys-list"}>
                <button className="btn btn-primary">Survey List</button>
            </Link>

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
    );
};

export default Dashboard;
