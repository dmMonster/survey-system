import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from "react-router-dom";
import {userService} from "../../_services/userService";
import Loader from 'react-loader-spinner';
import './editUser.css';
import {useDispatch, useSelector} from "react-redux";
import {getLoggedUser} from "../../actions";
import {useSelector} from "react-redux";

function EditUser() {

    const [isLoading, setLoading] = useState(true);

    let {id} = useParams();


    const [user, setUser] = useState({
        name: '',
        email: '',
        is_admin: false,
    });

    const is_admin = useSelector(state => state.authReducer.user.is_admin);

    const history = useHistory();

    useEffect(() => {
        userService.getSpecificUser(id).subscribe({
            next(response) {
                setUser(response.data[0]);
            },
            error(error) {
                console.log(error.response.data)
            },
            complete() {
                setLoading(false);
            }

        })
    }, []);


    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    };

    const handleCheckBox = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.checked,
        })
    };

    const dispatch = useDispatch();
    const saveData = e => {
        e.preventDefault();
        userService.updateUser(id, user).subscribe({
            next() {
                dispatch(getLoggedUser());
                if (is_admin) {
                    history.push("/dashboard/userList");
                }
            },
            error(error) {
                setErrors(error.response.data);
            }
        });
    };


    const [errors, setErrors] = useState([]);
    const updateAlert = (
        <div className="alert alert-danger">
            <div>{errors.name}</div>
            <div>{errors.email}</div>
        </div>
    );

    const editUserForm = (
        <form className="edit-user-form" onSubmit={saveData}>
            <div className="form-group">
                <label htmlFor="name">
                    Name:
                </label>
                <input id="name" className="form-control" type="text" name="name" value={user.name} required={true}
                       onChange={handleChange}/>
            </div>

            <div className="form-group">
                <label htmlFor="email">
                    Email:
                </label>
                <input id="email" className="form-control" type="email" name="email" value={user.email} required={true}
                       onChange={handleChange}/>
            </div>

            {is_admin ?
                (<div className="custom-control custom-checkbox form-group">
                    <input type="checkbox" className="custom-control-input" id="isAdmin" name="is_admin"
                           defaultChecked={user.is_admin}
                           onChange={handleCheckBox}/>
                    <label className="custom-control-label" htmlFor="isAdmin">Admin</label>
                </div>) : null
            }

            <input className="btn btn-lg btn-primary" type="submit" value="Save"/>

        </form>
    );

    return (
        <div className="container">
            <div>
                <h3 className="text-center">Edit user</h3>
                {errors.length !== 0 && updateAlert}
                {isLoading ?
                    <div className="m-auto w-100 text-center"><Loader type={"ThreeDots"}/></div> : editUserForm}

            </div>

        </div>
    );
}

export default EditUser;
