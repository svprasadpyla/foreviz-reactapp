import jQuery from "jquery";
import {
    SET_LOGIN_ERROR,
    SET_LOGIN_PENDING,
    SET_LOGIN_REDIRECT_ON_AUTH_TYPE__SUCCESS,
    SET_LOGIN_SUCCESS,
    SET_LOGIN_WITH_CODE_SUCCESS,
    SET_MULTIFACTOR_LOGIN_SUCCESS,
    SET_LOGIN_EMAIL
} from "../constants/login";
import { getUserDetails, loginService, loginWithCode, multifactorLoginService} from "../services/login";

const setLoginPending = (isLoading) => {
    return {
        type: SET_LOGIN_PENDING,
        isLoading,
    };
};

const setRedirectOnAuthTypeSuccess = (success) => {
    return {
        type: SET_LOGIN_REDIRECT_ON_AUTH_TYPE__SUCCESS,
        success,
    };
};
const setEmailSuccess = (success) => {
    return {
        type: SET_LOGIN_EMAIL,
        success,
    };
};
const setLoginSuccess = (success) => {
    return {
        type: SET_LOGIN_SUCCESS,
        success,
    };
};

export const setMultifactorLoginSuccess = (success) => {
    return {
        type: SET_MULTIFACTOR_LOGIN_SUCCESS,
        success,
    };
};

const setLoginWithCodeSuccess = (success) => {
    return {
        type: SET_LOGIN_WITH_CODE_SUCCESS,
        success,
    };
}

const setLoginError = (error) => {
    return {
        type: SET_LOGIN_ERROR,
        error,
    };
};

// export const submitRedirectOnAuthType = (data) => (dispatch) => {
//     dispatch(setLoginError(null));
//     dispatch(setRedirectOnAuthTypeSuccess(null));
//     redirectOnAuthTypeService(
//         data,
//         (response) => {
//             dispatch(setRedirectOnAuthTypeSuccess(response.data.dataObject));
//             dispatch(setLoginError(null));
//         },
//         (error) => {
//             dispatch(setLoginError(error));
//         }
//     );
// };

export const saveEmail = (data) => dispatch => {
	dispatch(setEmailSuccess(data));
}

export const setMultifactorLogin = (data) => (dispatch) => {
    dispatch(setLoginError(null));
    dispatch(setMultifactorLoginSuccess(null));
    multifactorLoginService(
        data,
        (response) => {
            dispatch(setMultifactorLoginSuccess(response.data));
            dispatch(setLoginError(null));
        },
        (error) => {
            dispatch(setLoginError(error));
        }
    );
};

export const submitLoginFrom = (data) => (dispatch) => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess({}));
    dispatch(setLoginError(null));
    loginService(
        data,
        (response) => {
            dispatch(setLoginSuccess(response.data));
            dispatch(setLoginError(null));
        },
        (error) => {
            dispatch(setLoginError(error));
        }
    );
};

// export const getUserData = () => dispatch => {
// 	const userData = getUserDetails();
// 	if(!jQuery.isEmptyObject(userData)) {
// 		dispatch(setLoginSuccess(userData));
// 	}
// }

export const getMultifactorUserData = () => (dispatch) => {
    const userData = getUserDetails();
    if (!jQuery.isEmptyObject(userData)) {
        dispatch(setMultifactorLoginSuccess(userData));
    }
};


export const submitLoginWithCode = (data) => (dispatch) => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess({}));
    dispatch(setLoginError(null));
    loginWithCode(
        data,
        (response) => {
            dispatch(setMultifactorLoginSuccess(response));
            dispatch(setLoginError(null));
        },
        (error) => {
            dispatch(setLoginError(error));
        }
    );
}