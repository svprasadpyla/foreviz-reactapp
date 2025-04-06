import httputils from "../utils/httputils";

const HTTP_POST = "POST";
const HTTP_PUT = 'PUT';

const GET_MODULES = "";
const CREATE_MODULE ="";
const UPDATE_MODULE ="";
const DELETE_MODULE ="";

export const createModuleService = async (data) => {
    return await httputils.fetchData(CREATE_MODULE, HTTP_POST, data);
};

export const updateModuleService = async (data) => {
    return await httputils.fetchData(UPDATE_MODULE, HTTP_PUT, data);
};

export const deleteModuleService = async (data) => {
    return await httputils.fetchData(DELETE_MODULE, HTTP_PUT, data);
};

export const getModulesService = async (data) => {
    return await httputils.fetchData(GET_MODULES, HTTP_POST, data);
};