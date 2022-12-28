import userRepository, { UserValues } from "../repositories/userRepository";
import { conflictError } from "../errors/errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function createUser(values: UserValues) {
  const user = await userRepository.findUserByEmail(values.email);

  if (user) {
    throw conflictError("Email already exists");
  }

  const password = bcrypt.hashSync(values.password, 12);
  const lastLogin = new Date();

  await userRepository.createUser({ ...values, password, lastLogin });

  return;
}

async function validateSignIn(values: UserValues) {
  const user = await userRepository.findUserByEmail(values.email);

  if (!user) {
    throw conflictError("Invalid email or password");
  }

  const isValidPassword = bcrypt.compareSync(values.password, user.password);

  if (!isValidPassword) {
    throw conflictError("Invalid email or password");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: 86400,
  });

  return { token };
}

export default { createUser, validateSignIn };
