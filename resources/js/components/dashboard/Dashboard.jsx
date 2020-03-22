import React from 'react';
import {useHistory} from "react-router-dom";
import {authService} from "../../_services/authService";

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
        </div>
    );
};

export default Dashboard;
