import {authService} from "../_services/authService";
import {history} from "../history";

const login = (user) => {
    return dispatch => {
        authService.login(user.email, user.password).then((response) => {
            dispatch(loginSuccessful(response.data));
            history.push("/dashboard");
        })
            .catch(errors => {
                dispatch(loginFailed(errors.response.data.errors));
            })
    }

};

const getLoggedUser = () => {
    return dispatch => {
        authService.user().then((response) => {
            dispatch(loginSuccessful(response.data));
        })
            .catch((errors) => {
                dispatch(loginFailed(errors.response.data.errors));
            })
    }
};

const loginSuccessful = (user) => {
    return {
        type: "LOGIN_SUCCESS",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            is_admin: user.is_admin,
        }
    }
};

const loginFailed = (errors) => {
    return {
        type: "LOGIN_FAILED",
        errors
    }
};

const clearCredentials = () => {
    return {
        type: "CLEAR_CREDENTIALS",
    }
};

export {
    login,
    getLoggedUser,
    clearCredentials,
}
