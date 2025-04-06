import {SET_LOGIN_PENDING, SET_LOGIN_SUCCESS,SET_LOGIN_EMAIL, SET_LOGIN_ERROR,SET_MULTIFACTOR_LOGIN_SUCCESS, SET_LOGIN_REDIRECT_ON_AUTH_TYPE__SUCCESS} from '../constants/login';

export const initialState = {
    isLoading: false,
    redirectOnAuthTypeResponse:{},
    userData: {},
    multifactorUserResponse: {},
    email:'',
    onError: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_LOGIN_PENDING: {
            return {...state}
        }

        case SET_LOGIN_SUCCESS: {
            return {
                ...state,
                userData: action.success,
            };
        }
        
        case SET_LOGIN_REDIRECT_ON_AUTH_TYPE__SUCCESS: {
            return {
                ...state,
                redirectOnAuthTypeResponse: action.success,
            };
        }
        
        case SET_LOGIN_EMAIL: {
            return {
                ...state,
                email: action.success,
            };
        }
        
        case SET_MULTIFACTOR_LOGIN_SUCCESS: {
            return {
                ...state,
                multifactorUserResponse: action.success,
            };
        }
        
        case SET_LOGIN_ERROR: {
            return {
                ...state,
                onError: action.error,
            };
        }
        

        default:
            return {...state}
    }
}