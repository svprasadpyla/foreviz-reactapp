import httputils from "../utils/httputils";

const HTTP_POST = "POST";
const HTTP_PUT = 'PUT';

const GET_PARTS = "";
const CREATE_PART ="8083/api/parts";
const UPDATE_PART ="8083/api/parts/";
const DELETE_PART ="";

export const createPartService = async (data) => {
    return await httputils.fetchData(CREATE_PART, HTTP_POST, data);
};

export const updatePartService = async (data) => {
    return await httputils.fetchData(UPDATE_PART, HTTP_PUT, data);
};

export const deletePartService = async (data) => {
    return await httputils.fetchData(DELETE_PART, HTTP_PUT, data);
};

export const getPartsService = async (data) => {
    return await httputils.fetchData(GET_PARTS, HTTP_POST, data);
};