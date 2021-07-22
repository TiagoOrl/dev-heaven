import { AUTH_SUCCESS, AUTH_FAIL, DELETE_ACCOUNT } from '../actions/types';



const initialState = {
    hasToken: null,
    token: null,
    loading: true,
    user: null,
    msg: null
}

export default function auth(state = initialState, action) {

    switch (action.type) {
        
        case AUTH_SUCCESS: 
            return {
                ...state,
                token: action.payload.token,
                hasToken: true,
                loading: false,
                user: action.payload.usr
            };

        case DELETE_ACCOUNT:
        case AUTH_FAIL:
            return {
                ...state,
                token: null,
                hasToken: false,
                loading: false,
                user: null,
                msg: action.payload
            };

        

        default:
            return state;

    }
}