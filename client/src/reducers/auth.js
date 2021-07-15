import { AUTH_SUCCESS, AUTH_FAIL } from '../actions/types';



const initialState = {
    hasToken: null,
    token: null,
    loading: true,
    user: null
}


// Execute a case based on the type and payload triggered by the auth ACTION
export default function(state = initialState, action) {

    switch (action.type) {
        
        case AUTH_SUCCESS: 
            return {
                ...state,
                token: action.payload.token,
                hasToken: true,
                loading: false,
                user: action.payload.usr
            };

        case AUTH_FAIL:
            return {
                ...state,
                token: null,
                hasToken: false,
                loading: false,
                user: null
            };

        default:
            return state;

    }
}