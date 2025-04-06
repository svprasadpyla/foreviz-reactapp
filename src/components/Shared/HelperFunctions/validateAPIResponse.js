export const validateDataResponse = (response) => {
    let responseCheck = true
    if (!response?.data) {
        responseCheck = false
    }
    return responseCheck
}