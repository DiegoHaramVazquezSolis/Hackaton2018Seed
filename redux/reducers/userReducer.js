import {combineReducers} from 'redux';
import GET_USER_SUCCESS from './../actions/userActions';

function perfil(state = {}, action){
    switch(action.type){
        case GET_USER_SUCCESS:
            return action.profile;    
        default:
            return state;
    }
}

export const userReducer = combineReducers({
    perfil
});