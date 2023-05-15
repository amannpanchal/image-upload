import {createStore, combineReducers , applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { picReducers } from './reducers/picupload'
const  middleware = [thunk];
const reducer = combineReducers({
    pics : picReducers
})
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
) 
export default store;