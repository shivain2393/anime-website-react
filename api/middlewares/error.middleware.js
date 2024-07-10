import { ApiError } from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    }

    // For other types of errors, you can send a generic message or log them
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
};

export default errorMiddleware;