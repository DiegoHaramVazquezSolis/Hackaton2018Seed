import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import {rootReducer} from './reducers/rootReducer';
import {userChecker} from './actions/userActions';

export default function configureStor() {
    let store = createStore(rootReducer,
        applyMiddleware(logger, thunk)
    );
    //store.dispatch(userChecker());
    return store;
}