import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, UPDATE_PROFILE_ERROR} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};



export default function(state = initialState, action) {
    
    switch (action.type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
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