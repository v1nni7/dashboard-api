import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "@prisma/client";

dotenv.config();

async function generateToken(user: User) {
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  return token;
}

export { generateToken };
