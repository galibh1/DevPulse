import bcrypt from "bcryptjs";
import { pool } from "./../../db/index";

import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  // 1. Check if the user exists -> Done
  // 2. Compare the password -> Done
  //3. Generate Token -> Done

  // 1. Check if the user exists
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );
  if (userData.rows.length === 0) {
    throw new Error("Invalid Credentials!");
  }

  // 2. Compare the password -> Done
  const user = userData.rows[0];
  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalid Credentials!");
  }

  //3. Generate Token
  const jwtpayload = {
    id: user.id,
    name: user.name,
    is_active: user.is_active,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtpayload, config.secret as string, {
    expiresIn: "1d",
  });

  return { accessToken };
};

export const authService = {
  loginUserIntoDB,
};