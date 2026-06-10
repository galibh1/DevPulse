import { Router } from "express";
import { signup, login } from "./auth.controller";

export const authRoute = Router();

authRoute.post("/signup", signup);
authRoute.post("/login", login);