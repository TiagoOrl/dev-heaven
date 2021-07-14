import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import combinedReducers from './reducers/root';


const initialState = {};
const middleware = [thunk];

const store = createStore(
    combinedReducers,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    );


export default store;