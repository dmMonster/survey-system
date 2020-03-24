const initialState =
    {
        isAuthorized: false,
        user: "...",
        errors: {},
        //abilities: ["non-admin", "admin-test", "user", "admin"],
    };

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return (
                {
                    ...state,
                    isAuthorized: true,
                    user: action.user.email,
                }
            );

        case 'LOGIN_FAILED':
            return (
                {
                    ...state,
                    isAuthorized: true,
                    user: "",
                    errors: action.errors,
                }
            );

        default:
            return state
    }
};
