import httputils from "../utils/httputils";

const HTTP_POST = "POST";
const HTTP_GET = "GET";
const HTTP_PUT = 'PUT';

const GET_TAGS = "8083/api/tags";
const CREATE_TAG ="8083/api/tags";
const UPDATE_TAG ="";

export const createTagService = async (data) => {
    return await httputils.fetchData(CREATE_TAG, HTTP_POST, data);
};

export const updateTagService = async (data) => {
    return await httputils.fetchData(UPDATE_TAG, HTTP_PUT, data);
};

export const getTagsService = async (data) => {
    return await httputils.fetchData(GET_TAGS, HTTP_GET, data);
};