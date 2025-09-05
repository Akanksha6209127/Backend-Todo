// import { Request, Response, NextFunction } from "express";

// // Custom error handler
// export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error(`Error: ${err.message}`);
  
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
//   res.status(statusCode).json({
//     message: err.message || "Server Error",
//     stack: process.env.NODE_ENV === "production" ? undefined : err.stack
//   });
// };

// // For handling 404 routes
// export const notFound = (req: Request, res: Response, next: NextFunction) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// import { Request, Response, NextFunction } from "express";

// export const notFound = (req: Request, _res: Response, next: NextFunction) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   // @ts-ignore
//   error.statusCode = 404;
//   next(error);
// };

// export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
//   const statusCode = err.statusCode || res.statusCode || 500;
//   res.status(statusCode).json({
//     message: err.message || "Server Error",
//     stack: process.env.NODE_ENV === "production" ? undefined : err.stack
//   });
// };


import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: `Route not found - ${req.originalUrl}` });
};

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({
    message: err?.message || "Server error",
    stack: process.env.NODE_ENV === "production" ? undefined : err?.stack,
  });
};
