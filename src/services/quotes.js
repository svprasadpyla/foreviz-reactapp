import httputils from "../utils/httputils";

const HTTP_POST = "POST";
const HTTP_GET = "GET";
const HTTP_PUT = 'PUT';
const HTTP_DELETE = 'DELETE';

const GET_SELF_QUOTES = "8084/api/quotes";
const GET_TEAM_QUOTES = "";
const CREATE_QUOTE ="8084/api/quotes";
const UPDATE_QUOTE ="";
const DELETE_QUOTE ="8084/api/quotes/";

export const createQuoteService = async (data) => {
    return await httputils.fetchData(CREATE_QUOTE, HTTP_POST, data);
};

export const updateQuoteService = async (data) => {
    return await httputils.fetchData(UPDATE_QUOTE, HTTP_PUT, data);
};

export const deleteQuoteService = async (data) => {
    return await httputils.fetchData(DELETE_QUOTE, HTTP_DELETE, data);
};

export const getSelfQuotesService = async (data) => {
    return await httputils.fetchData(GET_SELF_QUOTES, HTTP_GET, data);
};

export const getTeamQuotesService = async (data) => {
    return await httputils.fetchData(GET_TEAM_QUOTES, HTTP_POST, data);
};