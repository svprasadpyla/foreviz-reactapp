import httputils from '../utils/httputils';
import storageService from './storage';

const ENDPOINT = '8082/api/auth/signin';
const HTTP_METHOD = 'POST';
const HTTP_GET_METHOD = 'GET';
const KEY_USERDATA = 'userdata';
const POST_MF_LOGIN = 'v1/loginx';
const ENDPOINT_REDIRECT = 'v1/show/page'
const SETTINGS_LOCAL_LAUNCH = "users/settings/localLaunch";

export const signInService = async (data) => {
    return await httputils.fetchData(ENDPOINT, HTTP_METHOD, data);
};

export const loginService = (data, successCallback, errorCallback) => {
        httputils.httpRequest(ENDPOINT, HTTP_METHOD, data, (response) => {
            if (response.status.toLowerCase() === "success") {
                storageService.setItem('userdata', response.data)
                successCallback?.(response); 
            } else {
                errorCallback?.(response);
            }
        })
};

export const multifactorLoginService = (data,successCallback,errorCallback) => {
    httputils.httpRequest(POST_MF_LOGIN, HTTP_METHOD, data, (response) => {
        if (response.status.toLowerCase() === "success") {
            storageService.setItem('userdata', response.data)
            successCallback?.(response);
        } else {
            errorCallback?.(response);
        }
    })
};


export const loginWithCode = (data, successCallback, errorCallback) => {
    storageService.setItem('userdata', JSON.parse(window.atob(data)))
    successCallback?.(JSON.parse(window.atob(data)));
}

export const getUserDetails = () => {
    return storageService.getItem(KEY_USERDATA);
}

/* New Service Calls */

const apiCaller = async (apiEndpoint, method, requestData) => {
    return await httputils.fetchData(apiEndpoint, method, requestData);
};

export const settingsLocalLaunch = async () => apiCaller(SETTINGS_LOCAL_LAUNCH, HTTP_GET_METHOD, null);
export const redirectOnAuthTypeLoginService = async (data) => apiCaller(ENDPOINT_REDIRECT, HTTP_METHOD, data);