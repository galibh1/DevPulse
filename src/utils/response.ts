import type { Response } from "express";

export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
  errors?: any;
}

/**
 * Send success response
 */
export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data: data || null,
    errors: null,
  } as IApiResponse<T>);
};

/**
 * Send error response
 */
export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: any
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    errors: errors || null,
  } as IApiResponse);
};