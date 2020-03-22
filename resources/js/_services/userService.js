import {from} from "rxjs";

export const userService = {
    getAllUsers,
};

function getAllUsers() {
    return from(axios.get("/api/users"));
}
