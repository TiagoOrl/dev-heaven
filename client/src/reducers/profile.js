import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, UPDATE_PROFILE_ERROR} from '../actions/types';

const initialState = {
    data: null,
    profiles: [],
    repos: [],
    loading: true,
    msg: null,
    error: {}
};



export default function(state = initialState, action) {
    
    switch (action.type) {

        case UPDATE_PROFILE:
            return {
                ...state,
                msg: action.payload,
                loading: false
            };
        case GET_PROFILE:
            return {
                ...state,
                data: action.payload,
                loading: false
            };
        
        case PROFILE_ERROR:
        case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        default:
            return state;
        
    }
}