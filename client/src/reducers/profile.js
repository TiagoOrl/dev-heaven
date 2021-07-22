import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, GET_ALL_PROFILES, 
        UPDATE_PROFILE_ERROR, CLEAR_PROFILE, GET_REPOS } from '../actions/types';

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

        case GET_ALL_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                msg: "Queried all profiles",
                loading: false
            };
        
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                msg: "Queried github repository",
                loading: false
            };

        
        case PROFILE_ERROR:
        case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                msg: action.payload,
                loading: false
            };

        case CLEAR_PROFILE:
            return {
                ...state,
                data: null,
                msg: "Cleared current user profile from the state"
            };

        default:
            return state;
        
    }
}