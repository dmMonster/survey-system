import {authService} from "../_services/authService";
import {history} from "../history";

const login = (user) => {
    return dispatch => {
        authService.login(user.email, user.password).then(() => {
            dispatch(loginSuccessful(user));
            history.push("/dashboard");
        })
            .catch(errors => {
                dispatch(loginFailed(errors.response.data.errors));
            })
    }

};


const loginSuccessful = (user) => {
    return {
        type: "LOGIN_SUCCESS",
        user
    }
};

const loginFailed = (errors) => {
    return {
        type: "LOGIN_FAILED",
        errors
    }
};


export {
    login
}
