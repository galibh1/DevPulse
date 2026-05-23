import type { Request, Response } from "express";
import { authService } from "./auth.service";


const signup = async (req: Request, res: Response) => {
  //   console.log(req.body);
  //   const { name, email, password, age } = req.body;

  try {
    const result = await authService.signupIntoDB(req.body);
    // console.log(result);

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);

    res.status(200).json({
      success: true,
      message: "Login successfull",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const authController = {
  loginUser,
  signup
};