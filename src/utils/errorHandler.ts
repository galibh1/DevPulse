import type { Request, Response, NextFunction } from "express";
import { sendError } from "./response";
import { Logger } from "./logger";

// Custom error class
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public error?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// Async handler wrapper - catches errors from async functions
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Global error handling middleware
export const errorHandlingMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorDetails = error;

  // Handle custom AppError
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorDetails = error.error;
  }

  // Handle JWT errors
  if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token!";
  }

  if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired!";
  }

  // Handle database errors
  if (error.code === "23505") {
    // Unique constraint violation
    statusCode = 409;
    message = "This record already exists";
  }

  if (error.code === "23503") {
    // Foreign key constraint violation
    statusCode = 400;
    message = "Invalid reference";
  }

  // Handle validation errors
  if (error.name === "ValidationError") {
    statusCode = 400;
    message = error.message;
  }

  // Log error in development with full details
  if (process.env.NODE_ENV === "development") {
    Logger.error("Error Details:", {
      statusCode,
      message,
      errorMessage: error.message,
      errorStack: error.stack,
      errorCode: error.code,
      fullError: error,
    });
  }

  // Send error response
  sendError(res, statusCode, message, errorDetails);
};

// Validation error handler
export const handleValidationError = (
  res: Response,
  errors: Record<string, string>
) => {
  const errorMessages = Object.values(errors).join(", ");
  sendError(res, 400, errorMessages);
};