import React, {useEffect, useState} from 'react';
import {userService} from "../../_services/userService";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faUserEdit, faUserMinus} from "@fortawesome/free-solid-svg-icons";
import Loader from 'react-loader-spinner'
import './userList.css';
import {NavLink} from "react-router-dom";

const UserList = () => {

    const [userList, setUserList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        userService.getAllUsers().subscribe({
            next(response) {
                setUserList(response.data);
            },
            error(error) {
                console.log(error.response.data)
            },
            complete() {
                setLoading(false);
            }
        });
    }, []);

    const htmlUserList = userList.map((val) => {
        return (
            <tr className="user-list-row" key={val.id}>
                <td className="user-list-item">{val.id}</td>
                <td className="user-list-item">{val.name}</td>
                <td className="user-list-item">{val.email}</td>
                <td className="user-list-item">
                    {val.is_admin && <FontAwesomeIcon icon={faCheck} color={"green"} size={"2x"}/>}
                </td>
                <td className="user-list-item action-icon">
                    <NavLink to={"/dashboard/users/" + val.id + "/edit"} className="nav-link">
                        <FontAwesomeIcon icon={faUserEdit} size={"2x"}
                                         color={"#677CE4"}/>
                    </NavLink>
                </td>
                <td className="user-list-item action-icon">
                    <NavLink to={"/dashboard/users/" + val.id + "/delete"} className="nav-link">
                        <FontAwesomeIcon icon={faUserMinus} size={"2x"}
                                         color={"#d42f35"}/>
                    </NavLink>
                </td>
            </tr>
        )
    });

    return (
        <div className="container overflow-auto pb-3">
            <h3 className="text-center font-weight-bold">User list</h3>
            {isLoading ? <div className="m-auto w-100 text-center"><Loader type={"ThreeDots"}/></div> : null}
            <table className="user-list">
                <thead>
                <tr className="user-list-row">
                    <th className="user-list-item">#</th>
                    <th className="user-list-item">Name</th>
                    <th className="user-list-item">Email</th>
                    <th className="user-list-item">Admin</th>
                    <th className="user-list-item">Edit</th>
                    <th className="user-list-item">Delete</th>
                </tr>
                </thead>
                <tbody>
                {htmlUserList}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
