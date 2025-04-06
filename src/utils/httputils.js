import storageService from '../services/storage';
import i18n from "i18next";
class HttpUtils {

	fetchData(endpoint, method, data) {
		return new Promise((resolve, reject) => {
			const token = this.getToken() || null;
			const host = "http://13.61.19.192:";
			const url = `${host}${endpoint}`
			const xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.setRequestHeader("x-access-token", token || "");

			xhr.onreadystatechange = function () {
				console.log("Request State:", xhr.readyState, "URL:", xhr.responseURL);
				try {
					if (xhr.readyState === 4) {
						if (xhr.status >= 200 && xhr.status < 300) {
							console.log("-------------------", xhr);
							const result = JSON.parse(xhr.responseText);
							resolve(result);
						} else {
							const errorResponse = new Error(
								`HTTP Error: ${xhr.status} - ${xhr.statusText}`
							);
							errorResponse.status = xhr.status;
							errorResponse.statusText = xhr.statusText;
							errorResponse.responseText = xhr.responseText;
							throw errorResponse;
						}
					}
				} catch (error) {
					reject(
						error instanceof Error
							? error
							: new Error("Unknown error occurred")
					);
				}
			};

			xhr.send(JSON.stringify(data));
		});

	}

	fileUploadData(endpoint, method, data) {
		return new Promise((resolve, reject) => {
			const token = this.getToken() || null;
			const host = "http://13.61.19.192:";
			const url = `${host}${endpoint}`;
			const xhr = new XMLHttpRequest();
			
			xhr.open(method, url, true);

			xhr.setRequestHeader("x-access-token", token || "");
	
			xhr.onreadystatechange = function () {
				console.log("Request State:", xhr.readyState, "URL:", xhr.responseURL);
				try {
					if (xhr.readyState === 4) {
						if (xhr.status >= 200 && xhr.status < 300) {
							console.log("-------------------", xhr);
							const result = JSON.parse(xhr.responseText);
							resolve(result);
						} else {
							const errorResponse = new Error(
								`HTTP Error: ${xhr.status} - ${xhr.statusText}`
							);
							errorResponse.status = xhr.status;
							errorResponse.statusText = xhr.statusText;
							errorResponse.responseText = xhr.responseText;
							throw errorResponse;
						}
					}
				} catch (error) {
					reject(
						error instanceof Error
							? error
							: new Error("Unknown error occurred")
					);
				}
			};
	
			// Send the request with the file data
			xhr.send(data);
		});
	}

	getToken() {
		const storedUserData = sessionStorage.getItem("userdata");
        const userToken = storedUserData ? JSON.parse(window.atob(storedUserData)).accessToken : null;
        console.log("Role of loggedin user - ", userToken);
		//const userData = storageService.getItem("userdata");
		return userToken	;
	}

}

export default new HttpUtils();
