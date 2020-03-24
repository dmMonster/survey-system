import {from} from "rxjs";

export const userService = {
    getAllUsers,
    getSpecificUser,
    updateUser,
    deleteUser,
};

function getAllUsers() {
    return from(axios.get("/api/users"));
}

function getSpecificUser(id) {
    return from(axios.get("/api/users/" + id));
}

function updateUser(id, user) {
    return from(axios.put("/api/users/" + id, user));
}

function deleteUser(id) {
    return from(axios.delete("/api/users/" + id));
}
