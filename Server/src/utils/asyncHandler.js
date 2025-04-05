// This utility function wraps an asynchronous request handler function 
// and catches any errors that occur during its execution.

const asyncHandler = (requestHandler) =>
    (req, res, next) => {
        return (
            Promise.resolve(requestHandler(req, res, next)).catch((error) => {
                console.error(error);
                next(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }));
    }
export default asyncHandler; 