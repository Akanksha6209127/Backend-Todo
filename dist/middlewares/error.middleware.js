"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
// Custom error handler
const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message || "Server Error",
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack
    });
};
exports.errorHandler = errorHandler;
// For handling 404 routes
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
