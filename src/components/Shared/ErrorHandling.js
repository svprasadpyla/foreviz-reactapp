import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { closeWindows } from "../../utils/childWindowUtils";

const handleApiError = async (error, props) => {
    const { t } = props;

    if (error instanceof Error && typeof error?.status === "number") {
        const status = error.status;
        //const responseText = await error.text();

        try {
            if (typeof error?.responseText === "string") {
                // Handle string response (JSON text)
                const responseData = JSON.parse(error.responseText);
                handleResponseError(status, responseData, t, props);
            } else if (error?.responseBlob instanceof Blob) {
                // Handle blob response
                const responseText = await error.responseBlob.text();
                const responseData = JSON.parse(responseText);
                handleResponseError(status, responseData, t, props);
            } else {
                throw new Error("Unsupported response type.");
            }
        } catch (jsonError) {
            handleJsonError(t);
        }
    } else {
        handleGenericError(t);
    }
};

const handleResponseError = (status, responseData, t, props) => {
    if (!toast.isActive('apiError')) {
        switch (status) {
            case 401:
                handleUnauthorizedError(t, responseData, props);
                break;
            case 404:
                handleNotFoundError(t);
                break;
            case 429:
                handleTomanyRequests(t, responseData);
                break;
            case 500:
                handleInternalServerError(responseData)
                break;
            case 503:
                handleServiceUnavailableError()
                break;
            default:
                handleDefaultError(responseData, t, props);
                break;
        }
    }
};

const handleUnauthorizedError = (t, responseData, props) => {
    const userData = sessionStorage.getItem("userdata");
    const message = responseData?.message ?? t("errorMessages.unauthorized")
    toast(message, {
        toastId: 'apiError',
        type: 'error',
        theme: 'colored',
        autoClose: 1000,
        position: 'bottom-right',
        transition: Zoom,
        onClose: () => {
            if(userData){
                performLogoutActions(props);
            }
        },
    });
};

const handleNotFoundError = (t) => {
    toast(t("errorMessages.not_found"), { type: 'error', toastId: 'apiError', theme: 'colored', autoClose: 2000, position: 'bottom-right', transition: Zoom });
};

const handleInternalServerError = (responseData) => {
    const errorMessage = responseData.message || responseData.error || responseData.data?.errorMessage;
    toast(errorMessage ?? 'Internal Server Error. Please try again later.', { type: 'error', toastId: 'apiError', theme: 'colored', autoClose: 2000, position: 'bottom-right', transition: Zoom });
};

const handleServiceUnavailableError = () => {
    toast('Service Unavailable. Please try again later.', { type: 'error', toastId: 'apiError', theme: 'colored', autoClose: 2000, position: 'bottom-right', transition: Zoom });
};

const handleDefaultError = (responseData, t, props) => {
    const errorMessage = responseData.message || responseData.error || responseData.data?.errorMessage || t("errorMessages.req_failed");
    toast(errorMessage, {
        toastId: 'apiError',
        type: 'error',
        theme: 'colored',
        autoClose: shouldLogout(responseData) ? 500 : 2000,
        position: 'bottom-right',
        transition: Zoom,
        onClose: () => {
            if (shouldLogout(responseData)) {
                performLogoutActions(props);
            }
        },
    });
}

const shouldLogout = (responseData) => {
    return responseData.code === "1001" || responseData.code === "1002" || responseData?.message?.includes("Session has expired");
};

const performLogoutActions = (props) => {
    const userData = sessionStorage.getItem("userdata");
    let parsedUserData = userData ? JSON.parse(window.atob(userData)) : null;

    if (window?.process?.type) {
        const { ipcRenderer } = window.require('electron');
        ipcRenderer.send('closeallchildwindows');
    } else if (parsedUserData?.userId) {
        closeWindows(parsedUserData.userId);
    }

    sessionStorage.removeItem("userData");
    sessionStorage.clear();
    props.history.push('/login');
};

const handleTomanyRequests = (t,responseData) => {
    toast(t("errorMessages.tomany_reqsts"), {
        type: 'warning',
        toastId: 'apiError',
        theme: 'colored',
        autoClose: 2000,
        position: 'bottom-right',
        transition: Zoom,
    });
};

const handleJsonError = (t) => {
    if (!toast.isActive('apiError')) {
        toast(t("errorMessages.ser_error"), { type: 'error', toastId: 'apiError', theme: 'colored', autoClose: 2000, position: 'bottom-right', transition: Zoom });
    }
};

const handleGenericError = (t) => {
    if (!toast.isActive('apiError')) {
        toast(t("errorMessages.fetch_error"), { type: 'error', toastId: 'apiError', theme: 'colored', autoClose: 2000, position: 'bottom-right', transition: Zoom });
    }
};


export default handleApiError;