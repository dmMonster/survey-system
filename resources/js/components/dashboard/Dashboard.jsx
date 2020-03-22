import React from 'react';
import {useHistory, Route, Link} from "react-router-dom";
import {authService} from "../../_services/authService";
import UserList from "../userList/UserList.jsx";

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
            <Link to={"/dashboard/userList"} >
                <button className="btn btn-primary">UserList</button>
            </Link>
            <Route path={"/dashboard/userList"}>
                <UserList/>
            </Route>
        </div>
    );
};

export default Dashboard;
