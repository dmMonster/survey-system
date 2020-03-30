import React from 'react';
import {useHistory, Route, Link} from "react-router-dom";
import {authService} from "../../_services/authService";
import UserList from "../userList/UserList.jsx";
import EditUser from "../editUser/EditUser";
import DeleteUser from "../deleteUser/DeleteUser";
import CreateSurvey from "../createSurvey/CreateSurvey";

const Dashboard = () => {

    const history = useHistory();

    const logout = () => {
        authService.logout().then(() => {
            history.push("/");
        });
    };
    return (
        <div>
            Dashboard
            <button onClick={logout} className="btn btn-outline-info btn-lg text-black-50">Logout</button>

            <Link to={"/dashboard/surveys/add"} >
                <button className="btn btn-primary">Create Survey</button>
            </Link>

            <Link to={"/dashboard/userList"} >
                <button className="btn btn-primary">UserList</button>
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
        </div>
    );
};

export default Dashboard;
