import httputils from "../utils/httputils";

const HTTP_POST = "POST";
const HTTP_PUT = 'PUT';

const GET_ROLES = "";
const CREATE_ROLE ="";
const UPDATE_ROLE ="";
const DELETE_ROLE ="";

export const createRoleService = async (data) => {
    return await httputils.fetchData(CREATE_ROLE, HTTP_POST, data);
};

export const updateRoleService = async (data) => {
    return await httputils.fetchData(UPDATE_ROLE, HTTP_PUT, data);
};

export const deleteRoleService = async (data) => {
    return await httputils.fetchData(DELETE_ROLE, HTTP_PUT, data);
};

export const getRolesService = async (data) => {
    return await httputils.fetchData(GET_ROLES, HTTP_POST, data);
};