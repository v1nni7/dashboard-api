import userRepository, { UserValues } from "../repositories/userRepository";
import { conflictError, unauthorizedError } from "../errors/errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Product } from "@prisma/client";

dotenv.config();

async function createUser(values: UserValues, role: number) {
  const user = await userRepository.findUserByEmail(values.email);

  if (user) {
    throw conflictError("Email already exists");
  }

  const password = bcrypt.hashSync(values.password, 12);
  const lastLogin = new Date();

  if (role < 2 || values.role > role) {
    throw unauthorizedError("You do not have permission");
  }

  await userRepository.createUser({ ...values, password, lastLogin });

  return;
}

async function signIn(values: UserValues) {
  const user = await userRepository.findUserByEmail(values.email);

  if (!user) {
    throw conflictError("Invalid email or password");
  }

  const isValidPassword = bcrypt.compareSync(values.password, user.password);

  if (!isValidPassword) {
    throw conflictError("Invalid email or password");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: 86400,
    }
  );

  return { token };
}

export default { createUser, signIn };
