import type { Request, Response } from "express";
import { authService } from "./auth.service";
import {
  sendSuccess,
  sendError,
  validateEmail,
  validatePassword,
  validateName,
  asyncHandler,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  Logger,
} from "../../utils";


export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  
  const nameError = validateName(name);
  if (nameError) {
    return sendError(res, HTTP_STATUS.BAD_REQUEST, nameError);
  }

  if (!validateEmail(email)) {
    return sendError(
      res,
      HTTP_STATUS.BAD_REQUEST,
      ERROR_MESSAGES.INVALID_EMAIL
    );
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return sendError(res, HTTP_STATUS.BAD_REQUEST, passwordError);
  }

  
  const result = await authService.signupIntoDB({
    name,
    email,
    password,
    role: role || "contributor",
  });

  
  const user = result.rows[0];
  delete user.password;

  Logger.logAuth("signup", user.id, email);
  return sendSuccess(
    res,
    HTTP_STATUS.CREATED,
    SUCCESS_MESSAGES.SIGNUP_SUCCESS,
    user
  );
});


export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

 
  if (!validateEmail(email)) {
    return sendError(
      res,
      HTTP_STATUS.BAD_REQUEST,
      ERROR_MESSAGES.INVALID_EMAIL
    );
  }

  if (!password) {
    return sendError(
      res,
      HTTP_STATUS.BAD_REQUEST,
      "Password is required"
    );
  }

  
  const result = await authService.loginUserIntoDB({ email, password });

  Logger.logAuth("login", result.user.id, email);
  return sendSuccess(
    res,
    HTTP_STATUS.OK,
    SUCCESS_MESSAGES.LOGIN_SUCCESS,
    result
  );
});


export const authController = {
  signup,
  login,
};