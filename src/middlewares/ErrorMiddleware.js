import { ApiResponse } from "../response/ApiResponse.js";

export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const response = new ApiResponse(
    null,
    err.message || "Something went wrong",
    false
  );
  res.status(statusCode).json(response);
};

export default { CustomError, errorHandler };
// This code defines a custom error class and an error handling middleware for Express.js applications.
// The `CustomError` class extends the built-in `Error` class, allowing you to create errors with a specific message and status code.
// The `errorHandler` middleware function catches errors thrown in the application, sets the appropriate HTTP status code, and sends a JSON response with the error message.
// If the environment is not production, it also includes the error stack trace in the response for debugging purposes.
