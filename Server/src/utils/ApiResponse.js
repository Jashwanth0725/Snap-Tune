class ApiResponse {

    constructor(statusCode, data, message = "Success",) {
        this.statusCode = statusCode;          // Set the HTTP status code
        this.data = data;                      // Set the response data
        this.message = message;                // Set the response message
        this.success = statusCode < 400;       // Indicate if the response is successful (status code < 400)
    }
}

export { ApiResponse };