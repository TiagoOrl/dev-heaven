import { REGISTER_SUCCESS } from "../actions/types";
import { REGISTER_FAIL } from "../actions/types";



const initialState = {
    loading: true,
    user: null
}


export default function register(state = initialState, action) {

    switch (action.type) {
        case REGISTER_SUCCESS:

            return {
                ...state, 
                ...action.payload,
                loading: false
            }

        case REGISTER_FAIL:
            
            return {
                ...state, 
                loading: false
            }
    
        default:
            return state;
    }
}