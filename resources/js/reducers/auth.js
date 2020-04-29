const initialState =
    {
        authenticated: false,
        pending: true,
        user: {
            name: '',
            email: '',
            is_admin: false,
        },
        errors: {},
    };

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return (
                {
                    ...state,
                    authenticated: true,
                    pending: false,
                    user: action.user,
                }
            );

        case 'LOGIN_FAILED':
            return (
                {
                    ...state,
                    authenticated: false,
                    pending: false,
                    errors: action.errors,
                }
            );

        case 'CLEAR_CREDENTIALS':
            return {
                initialState
            };
        default:
            return state
    }
};
