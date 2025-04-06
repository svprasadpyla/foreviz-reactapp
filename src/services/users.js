import httputils from "../utils/httputils";

const HTTP_POST = "POST";
const HTTP_PUT = 'PUT';

const GET_USERS = "8081/api/users/list";
const CREATE_USER ="8081/api/users/create";
const UPDATE_USER ="";
const DELETE_USER ="";

export const createUserService = async (data) => {
    return await httputils.fetchData(CREATE_USER, HTTP_POST, data);
};

export const updateUserService = async (data) => {
    return await httputils.fetchData(UPDATE_USER, HTTP_PUT, data);
};

export const deleteUserService = async (data) => {
    return await httputils.fetchData(DELETE_USER, HTTP_PUT, data);
};

export const getUsersService = async (data) => {
    return await httputils.fetchData(GET_USERS, HTTP_POST, data);
};