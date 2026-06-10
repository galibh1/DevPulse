import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import {
  sendError,
  HTTP_STATUS,
  ERROR_MESSAGES,
  type IAuthRequest,
  type IAuthUser,
} from "../utility";

export const auth = (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return sendError(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_MESSAGES.UNAUTHORIZED_ACCESS
      );
    }

    const decoded = jwt.verify(token, config.secret as string) as IAuthUser;

    if (!decoded) {
      return sendError(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_MESSAGES.INVALID_TOKEN
      );
    }

    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return sendError(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_MESSAGES.TOKEN_EXPIRED
      );
    }

    return sendError(
      res,
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_MESSAGES.INVALID_TOKEN
    );
  }
};

export default auth;