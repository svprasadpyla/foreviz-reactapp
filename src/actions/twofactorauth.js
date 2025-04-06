import { qrCodeService, getUserDetails, tfaUsersActivation, tfaEnable, tfaDisable, regenerateQRCodeService, twoFactorAuth } from "../services/twofactorauth";
import { SET_QR_SUCCESS, SET_TFA_USERS_SUCCESS, SET_TFA_ENABLE_SUCCESS, SET_TFA_DISABLE_SUCCESS, SET_REGENERATE_QR, SET_TFA, SET_TFA_ERROR } from "../constants/twofactorauth";
import jQuery, { data } from 'jquery';

export const setTFASuccess=(success)=>{
    return{
        type: SET_TFA,
        success
    }
}

// const setQRSuccess=(success) => {
//     return{
//         type : SET_QR_SUCCESS,
//         success
//     }
// }

// const setRegenerateQRSuccess=(success) => {
//     return{
//         type : SET_REGENERATE_QR,
//         success
//     }
// }

// const setTFAUserSuccess=(success) => {
//     return{
//         type : SET_TFA_USERS_SUCCESS,
//         success
//     }
// }

// const setTFAEnableSuccess=(success) => {
//     return{
//         type : SET_TFA_ENABLE_SUCCESS,
//         success
//     }
// }

// const setTFADisableSuccess=(success) => {
//     return{
//         type : SET_TFA_DISABLE_SUCCESS,
//         success
//     }
// }

// const setTFAError=(error)=>{
//     return{
//         type: SET_TFA_ERROR,
//         error
//     };
// }

// export const validateQRCode = (data) => dispatch =>{
//     dispatch(setTFAError(null));
//     dispatch(setQRSuccess(null));
//     qrCodeService(data,(response)=>{
//         dispatch(setTFAError(null));
//         dispatch(setQRSuccess(response.data));
//     },(error)=>{
//         dispatch(setTFAError(error));
//     });
// };
// export const regenerateQRCode = (data) => dispatch =>{
//     dispatch(setTFAError(null));
//     dispatch(setRegenerateQRSuccess(null));
//     regenerateQRCodeService(data,(response)=>{
//         dispatch(setTFAError(null));
//         dispatch(setRegenerateQRSuccess(response.data));
//     },(error)=>{
//         dispatch(setTFAError(error));
//     });
// };

// export const validateTFA=(data)=>dispatch=>{
//     dispatch(setTFAError(null));
// 	dispatch(setTFASuccess(null));
// 	twoFactorAuth(data,(response) => {
// 		dispatch(setTFAError(null));
// 		dispatch(setTFASuccess(response.data));
// 	}, (error) => {
// 		dispatch(setTFAError(error));
// 	});
// };

// export const usersToActivateTFA=()=>dispatch=>{
//     dispatch(setTFAError(null));
// 	dispatch(setTFAUserSuccess([]));
// 	tfaUsersActivation(data,(response) => {
// 		dispatch(setTFAError(null));
// 		dispatch(setTFAUserSuccess(response.data));
// 	}, (error) => {
// 		dispatch(setTFAError(error));
// 	});
// };

// export const enableTFA=(data)=>dispatch=>{
//     dispatch(setTFAError(null));
// 	dispatch(setTFAEnableSuccess(null));
//     dispatch(setTFADisableSuccess(null));
// 	tfaEnable(data,(response) => {
// 		dispatch(setTFAError(null));
// 		dispatch(setTFAEnableSuccess(response.data));
// 	}, (error) => {
// 		dispatch(setTFAError(error));
// 	});
// };

// export const disableTFA=(data)=>dispatch=>{
//     dispatch(setTFAError(null));
// 	dispatch(setTFADisableSuccess(null));
//     dispatch(setTFAEnableSuccess(null));
// 	tfaDisable(data,(response) => {
// 		dispatch(setTFAError(null));
// 		dispatch(setTFADisableSuccess(response.data));
// 	}, (error) => {
// 		dispatch(setTFAError(error));
// 	});
// };

export const getUserData = () => dispatch => {
	const userData = getUserDetails();
	if(!jQuery.isEmptyObject(userData)) {
		dispatch(setTFASuccess(userData));
	}
}