import React from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {userService} from "../../_services/userService";

const DeleteUser = () => {

    let {id} = useParams();

    const history = useHistory();

    const cancelDelete = () => {
        history.goBack();
    };

    const deleteUser = () => {
        userService.deleteUser(id).subscribe({
            next() {history.goBack()},
            error(error){console.log(error.response.data)}
        })
    };

    return (
        <div className="container">
            <div>
                <h4 className="text-center">Are you sure?</h4>
                <div className="d-flex justify-content-center">
                    <button onClick={cancelDelete} className="btn btn-outline-info m-3 p-3">Cancel</button>
                    <button onClick={deleteUser} className="btn btn-danger m-3 p-3">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUser;
