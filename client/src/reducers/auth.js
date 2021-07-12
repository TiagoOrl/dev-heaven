import { AUTH_SUCCESS, AUTH_FAIL } from '../actions/types';



const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}



export default function(state = initialState, action) {

    switch (action.type) {
        case AUTH_SUCCESS: 
            return {
                ...state,
                token: localStorage.getItem('token'),
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };

        case AUTH_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };

        default:
            return state;

    }
}