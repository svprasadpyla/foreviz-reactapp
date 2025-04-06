import httputils from '../utils/httputils';
import storageService from './storage';

const HTTP_POST = 'POST';
const HTTP_GET = 'GET';
const GET_TFA = 'v1/validate/code';
const GET_REGENERATE_TFA = 'mfa/regenarate/qrcode';
const GET_QRCODE= 'v1/qrurl';
const GET_USERS= 'users/';
const POST_ENABLE_TFA= 'mfa/enable/';
const POST_DISABLE_TFA= 'mfa/disable/';
const KEY_USERDATA = 'userdata';

export const twoFactorAuth=(data,successCallback,errorCallback)=>{
    twoFactorAuthService(data,GET_TFA,HTTP_POST,successCallback,errorCallback);
};

export const tfaUsersActivation=(data,successCallback,errorCallback)=>{
    twoFactorAuthService(data,GET_USERS,HTTP_GET,successCallback,errorCallback);
};

export const tfaEnable=(data,successCallback,errorCallback)=>{
    twoFactorAuthService(data,POST_ENABLE_TFA,HTTP_POST,successCallback,errorCallback);
};

export const tfaDisable=(data,successCallback,errorCallback)=>{
    twoFactorAuthService(data,POST_DISABLE_TFA,HTTP_POST,successCallback,errorCallback);
};

export const qrCodeService=(data,successCallback,errorCallback)=>{
    twoFactorAuthService(data,GET_QRCODE,HTTP_POST,successCallback,errorCallback)
};

export const regenerateQRCodeService=(data,successCallback,errorCallback)=>{
    twoFactorAuthService(data,GET_REGENERATE_TFA,HTTP_POST,successCallback,errorCallback)
};

const twoFactorAuthService=(data,endPoint,httpMethod,successCallback,errorCallback)=>{
    httputils.fetchData(endPoint,httpMethod,data,(response)=>{
        if (response.status.toLowerCase() === "success") {
            if((endPoint=='v1/qrurl' || endPoint=='v1/validate/code')){
            storageService.setItem('userdata', response.data)
            }
            //successCallback && successCallback(response); 
            successCallback?.(response);
        } else {
            //errorCallback && errorCallback(response);
            errorCallback?.(response);
        }
    });
}

export const getUserDetails = () => {
    return storageService.getItem(KEY_USERDATA);
}
