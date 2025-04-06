import httputils from "../utils/httputils";

const HTTP_POST = "POST";
const HTTP_DELETE = "DELETE";
const HTTP_PUT = 'PUT';

const GET_INVENTORY_LIST = "8083/api/parts/getAllParts";
const GET_INVENTORY_PURCHASE = "";
const GET_INVENTORY_SALES = "";
const CREATE_INVENTORY ="8083/api/parts/import";
const UPDATE_INVENTORY ="8083/api/parts/{id}";
const DELETE_INVENTORY ="8083/api/parts/";

export const createInventoryService = async (data) => {
    return await httputils.fileUploadData(CREATE_INVENTORY, HTTP_POST, data);
};

export const updateInventoryService = async (data) => {
    return await httputils.fetchData(UPDATE_INVENTORY, HTTP_PUT, data);
};

export const deleteInventoryService = async (data) => {
    return await httputils.fetchData(DELETE_INVENTORY, HTTP_DELETE, data);
};

export const getInventoryListService = async (data) => {
    return await httputils.fetchData(GET_INVENTORY_LIST, HTTP_POST,data);
};

export const getPurchaseHistoryService = async (data) => {
    return await httputils.fetchData(GET_INVENTORY_PURCHASE, HTTP_POST, data);
};

export const getSalesHistoryService = async (data) => {
    return await httputils.fetchData(GET_INVENTORY_SALES, HTTP_POST, data);
};