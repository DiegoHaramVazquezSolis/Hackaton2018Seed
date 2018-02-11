import firebase from './../../firebase';
import {Alert} from 'react-native'

const db = firebase.database().ref("usuario");

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";

function getUserSuccess(userProfile) {
    return {
        type: GET_USER_SUCCESS,
        profile: userProfile
    };
}

function getOrCreateProfile(user, dispatch) {
    db.orderByChild("email").equalTo(user.email).once("value", usuario => {
        dispatch(getUserSuccess(usuario.val()));
    });
}

export const signInWithEmail = ({email ,password}) => (dispatch) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(s => {
        dispatch(getOrCreateProfile(s, dispatch));
    })
    .catch(e => {
        console.error(e.message);
    });
}

export const signUpUser = ({email, password, name}) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export const userChecker = () => (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            dispatch(getOrCreateProfile(user, dispatch));
        }
    });
}