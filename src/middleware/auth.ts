import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const token = req.headers.authorization;

      if (!token) {
        res.status(401).json({
          success: false,
          message: "Unauthorized access! Token not provided",
          error: null,
        });
        return;
      }

      
      const decoded = jwt.verify(
        token as string,
        config.secret as string
      ) as JwtPayload;

      
      const userData = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [decoded.email]
      );

      if (userData.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: "User not found!",
          error: null,
        });
        return;
      }

      const user = userData.rows[0];

      
      if (roles.length > 0 && !roles.includes(user.role)) {
        res.status(403).json({
          success: false,
          message: "Forbidden! This role does not have access",
          error: null,
        });
        return;
      }

      
      req.user = decoded;

      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          success: false,
          message: "Token has expired!",
          error: null,
        });
        return;
      }

      if (error.name === "JsonWebTokenError") {
        res.status(401).json({
          success: false,
          message: "Invalid token!",
          error: null,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: error.message,
        error: error,
      });
    }
  };
};

export default auth;