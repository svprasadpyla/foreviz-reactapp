import httputils from "../utils/httputils";

const HTTP_GET = 'GET';
const HTTP_POST = 'POST';
const PROFILE_ENDPOINT = 'users/get';
const PROFILE_UPDATE_ENDPOINT = 'users/profile/update';

export const profileService = (successCallback, errorCallback) => {
      profile(null, PROFILE_ENDPOINT, HTTP_GET, successCallback, errorCallback);
};

export const profileUpdateService = (data, successCallback, errorCallback) => {
      profile(data, PROFILE_UPDATE_ENDPOINT, HTTP_POST, successCallback , errorCallback);
};

const profile = (data, endpoint, httpmethod, successCallback, errorCallback) => {
      httputils.httpRequest(endpoint, httpmethod, data, (response) => {
            if (response.status.toLowerCase() === "success") {
                  successCallback?.(response);
            } else {
                  errorCallback?.(response);
            }
      });
}

//////////////////******************Promises*****************//////////////////

export const getProfileData = () => httputils.fetchData(PROFILE_ENDPOINT, HTTP_GET)