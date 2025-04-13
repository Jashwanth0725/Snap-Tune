class ApiError extends Error {

    // Constructor for the ApiError class, which extends the built-in Error class.
    constructor(statusCode, message = "Something went wrong", error = [], stack = "", data = null) {
        super(message);                             // Call the parent constructor of Error with the message
        this.statusCode = statusCode;               // Set the HTTP status code
        this.data = data;
        this.error = error;                         // Set the error details (if any)
        this.message = message;                     // Set the error message
        this.success = false;                       // Indicate that this is an error response

        if (stack) {
            this.stack = stack;                     // Set the stack trace if provided
        }
        else {
            Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
        }
    }
}

export { ApiError };