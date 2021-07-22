import { LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types';



const initialState = {
    loading: true
}


export default function login(state = initialState, action) {

    switch (action.type) {

        case LOGIN_SUCCESS:

            return {
                ...state,
                ...action.payload,
                loading: false
            }

        case LOGIN_FAIL:
            
            return {
                ...state, 
                loading: false
            }

        case LOGOUT:

            return {
                ...state, 
                loading: false
            }
    
        default:
            return state;
    }
}