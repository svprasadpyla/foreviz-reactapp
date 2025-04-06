import httputils from "../utils/httputils";

const HTTP_POST = "POST";
const HTTP_PUT = 'PUT';

const GET_CUSTOMERS = "8081/api/customers/list";
const CREATE_CUSTOMER ="8081/api/customers";
const UPDATE_CUSTOMER ="";
const DELETE_CUSTOMER ="";

export const createCustomerService = async (data) => {
    return await httputils.fetchData(CREATE_CUSTOMER, HTTP_POST, data);
};

export const updateCustomerService = async (data) => {
    return await httputils.fetchData(UPDATE_CUSTOMER, HTTP_PUT, data);
};

export const getCustomerService = async (data) => {
    return await httputils.fetchData(GET_CUSTOMERS, HTTP_POST, data);
};

export const deleteCustomerService = async (data) => {
    return await httputils.fetchData(DELETE_CUSTOMER, HTTP_POST, data);
};