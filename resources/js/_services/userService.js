import {from} from "rxjs";

export const userService = {
    getAllUsers,
    getSpecificUser,
};

function getAllUsers() {
    return from(axios.get("/api/users"));
}

function getSpecificUser(id) {
    return from(axios.get("/api/users/" + id));
}
