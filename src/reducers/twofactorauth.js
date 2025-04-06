import { SET_TFA, 
    SET_TFA_ERROR,
SET_QR_SUCCESS, 
SET_TFA_USERS_SUCCESS,
SET_TFA_ENABLE_SUCCESS,
SET_TFA_DISABLE_SUCCESS,
SET_REGENERATE_QR} from "../constants/twofactorauth";

const initialState = {

    userData: {},
    qrResponse: {},
    userList: [],
    enableResponse:{},
    disableResponse:{},
    regenerateQR:{},
    onError:null

};

export default (state = initialState, action) => {
    switch(action.type) {
       

        case SET_TFA: {
            return {
                ...state,
                userData: action.success,
            };
        }
        
        case SET_QR_SUCCESS: {
            return {
                ...state,
                qrResponse: action.success,
            };
        }
        
        case SET_REGENERATE_QR: {
            return {
                ...state,
                regenerateQR: action.success,
            };
        }
        
        case SET_TFA_USERS_SUCCESS: {
            return {
                ...state,
                userList: action.success,
            };
        }
        
        case SET_TFA_ENABLE_SUCCESS: {
            return {
                ...state,
                enableResponse: action.success,
            };
        }
        
        case SET_TFA_DISABLE_SUCCESS: {
            return {
                ...state,
                disableResponse: action.success,
            };
        }
        
        case SET_TFA_ERROR: {
            return {
                ...state,
                onError: action.error,
            };
        }
        

        default:
            return {...state}
    }
}