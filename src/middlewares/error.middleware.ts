import { Request, Response, NextFunction } from "express";

// Custom error handler
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${err.message}`);
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack
  });
};

// For handling 404 routes
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
