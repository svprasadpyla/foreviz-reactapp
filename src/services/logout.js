import httputils from '../utils/httputils';
const LOGOUT_ENDPOINT = 'v1/logout';
const HTTP_GET = 'GET';



/* Newly added functionality */

const makeApiCall = async (apiEndpoint, method, requestData) => {
    return await httputils.fetchData(apiEndpoint, method, requestData);
};

export const logoutApi = async () => makeApiCall(LOGOUT_ENDPOINT,HTTP_GET);