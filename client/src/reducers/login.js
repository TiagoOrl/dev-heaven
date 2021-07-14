import { LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types';



const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}


export default function(state = initialState, action) {

    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                token: localStorage.getItem('token'),
                ...state, 
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }

        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                token: null,
                ...state, 
                token: null,
                isAuthenticated: false,
                loading: false
            }

        case LOGOUT:
            localStorage.removeItem('token');
            return {
                token: null,
                ...state, 
                token: null,
                isAuthenticated: false,
                loading: false
            }
    
        default:
            return state;
    }
}