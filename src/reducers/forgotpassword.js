import {SET_RESET_PASSWORD_PENDING, SET_RESET_PASSWORD_SUCCESS,SET_VAIDATE_OTP_SUCCESS,SET_FP_UPDATE_PASSWORD_SUCCESS, SET_RESET_PASSWORD_ERROR, SET_EMAIL, SET_OTP } from '../constants/forgotpassword';

const initialState = {
    isLoading: false,
    resetdata:'',
    fpEmail:'',
    fpOtp:'',
    validateOtp:{},
    fpUpdatepassword:{},
    onError: null
};
export default (state = initialState, action) => {
    switch(action.type) {
        case SET_RESET_PASSWORD_PENDING: {
            return {...state}
        }

        case SET_RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetdata: action.success
            };
        }
        
        case SET_VAIDATE_OTP_SUCCESS: {
            return {
                ...state,
                validateOtp: action.success
            };
        }
        
        case SET_FP_UPDATE_PASSWORD_SUCCESS: {
            return {
                ...state,
                fpUpdatepassword: action.success
            };
        }
        
        case SET_EMAIL: {
            return {
                ...state,
                fpEmail: action.success
            };
        }
        
        case SET_OTP: {
            return {
                ...state,
                fpOtp: action.success
            };
        }
        
        case SET_RESET_PASSWORD_ERROR: {
            return {
                ...state,
                onError: action.error
            };
        }
        

        default:
            return {...state}
    }
}